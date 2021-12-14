import { ApiPromise } from "@polkadot/api";
import { web3Accounts, web3FromSource } from "@polkadot/extension-dapp";
import {
  BridgeConfig,
  SubstrateBridgeConfig,
} from "../../../chainbridgeConfig";
import { submitDeposit } from "../SubstrateApis/ChainBridgeAPI";

const makeDeposit =
  (
    address: string | undefined,
    api: ApiPromise | undefined,
    setTransactionStatus: (
      message:
        | "Initializing Transfer"
        | "In Transit"
        | "Transfer Completed"
        | "Transfer Aborted"
        | undefined
    ) => void,
    setDepositAmount: (value: React.SetStateAction<number | undefined>) => void,
    homeChainConfig: BridgeConfig | undefined,
    setDepositNonce: (input: string | undefined) => void
  ) =>
  async (
    amount: number,
    recipient: string,
    tokenAddress: string,
    destinationChainId: number
  ) => {
    if (api && address) {
      const allAccounts = await web3Accounts();
      const targetAccount = allAccounts.find(
        (item) => item.address === address
      );
      if (targetAccount) {
        const transferExtrinsic = submitDeposit(
          api,
          amount,
          recipient,
          destinationChainId
        );

        const injector = await web3FromSource(targetAccount.meta.source);
        setTransactionStatus("Initializing Transfer");
        setDepositAmount(amount);
        transferExtrinsic
          .signAndSend(
            address,
            { signer: injector.signer },
            ({ status, events }) => {
              status.isInBlock &&
                console.log(
                  `Completed at block hash #${status.isInBlock.toString()}`
                );

              if (status.isFinalized) {
                events.filter(({ event }) => {
                  return api.events[
                    (homeChainConfig as SubstrateBridgeConfig)
                      .chainbridgePalletName
                  ].FungibleTransfer.is(event);
                });
                api.query[
                  (homeChainConfig as SubstrateBridgeConfig)
                    .chainbridgePalletName
                ]
                  .chainNonces(destinationChainId)
                  .then((response) => {
                    setDepositNonce(`${response.toJSON()}`);
                    setTransactionStatus("In Transit");
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              } else {
                console.log(`Current status: ${status.type}`);
              }
            }
          )
          .catch((error: any) => {
            console.log(":( transaction failed", error);
            setTransactionStatus("Transfer Aborted");
          });
      }
    }
  };

export default makeDeposit;
