import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { providers, BigNumber, utils, Event } from "ethers";
import { decodeAddress } from "@polkadot/util-crypto";
import { Erc20DetailedFactory } from "../../../Contracts/Erc20DetailedFactory";
import { TransactionStatus } from "../../NetworkManagerContext";

import {
  chainbridgeConfig,
  EvmBridgeConfig,
  BridgeConfig,
} from "../../../chainbridgeConfig";

import { getPriceCompatibility } from "./helpers";

const makeDeposit =
  (
    setTransactionStatus: (message: TransactionStatus | undefined) => void,
    setDepositNonce: (input: string | undefined) => void,
    setHomeTransferTxHash: (input: string) => void,
    setDepositAmount: (input: number | undefined) => void,
    setSelectedToken: (tokenAddress: string) => void,
    gasPrice: number,

    homeChainConfig?: BridgeConfig,
    homeBridge?: Bridge,
    provider?: providers.Web3Provider,
    address?: string,
    bridgeFee?: number
  ) =>
  async (
    amount: number,
    recipient: string,
    tokenAddress: string,
    destinationChainId: number
  ) => {
    if (!homeChainConfig || !homeBridge) {
      console.error("Home bridge contract is not instantiated");
      return;
    }
    const signer = provider?.getSigner();
    if (!address || !signer) {
      console.log("No signer");
      return;
    }

    const destinationChain = chainbridgeConfig().chains.find(
      (c) => c.domainId === destinationChainId
    );
    // TODO: create separate version for substrate
    if (destinationChain?.type === "Substrate") {
      recipient = `0x${Buffer.from(decodeAddress(recipient)).toString("hex")}`;
    }
    const token = homeChainConfig.tokens.find(
      (token) => token.address === tokenAddress
    );

    if (!token) {
      console.log("Invalid token selected");
      return;
    }

    setTransactionStatus("Initializing Transfer");
    setDepositAmount(amount);
    setSelectedToken(tokenAddress);
    const erc20 = Erc20DetailedFactory.connect(tokenAddress, signer);
    const erc20Decimals = token.decimals ?? homeChainConfig.decimals;

    const data =
      "0x" +
      utils
        .hexZeroPad(
          // TODO Wire up dynamic token decimals
          BigNumber.from(
            utils.parseUnits(amount.toString(), erc20Decimals)
          ).toHexString(),
          32
        )
        .substr(2) + // Deposit Amount (32 bytes)
      utils
        .hexZeroPad(utils.hexlify((recipient.length - 2) / 2), 32)
        .substr(2) + // len(recipientAddress) (32 bytes)
      recipient.substr(2); // recipientAddress (?? bytes)

    try {
      const gasPriceCompatibility = await getPriceCompatibility(
        provider,
        homeChainConfig,
        gasPrice
      );

      const currentAllowance = await erc20.allowance(
        address,
        (homeChainConfig as EvmBridgeConfig).erc20HandlerAddress
      );
      console.log(
        "🚀  currentAllowance",
        utils.formatUnits(currentAllowance, erc20Decimals)
      );
      // TODO extract token allowance logic to separate function
      if (Number(utils.formatUnits(currentAllowance, erc20Decimals)) < amount) {
        if (
          Number(utils.formatUnits(currentAllowance, erc20Decimals)) > 0 &&
          token.isDoubleApproval
        ) {
          //We need to reset the user's allowance to 0 before we give them a new allowance
          //TODO Should we alert the user this is happening here?
          await (
            await erc20.approve(
              (homeChainConfig as EvmBridgeConfig).erc20HandlerAddress,
              BigNumber.from(utils.parseUnits("0", erc20Decimals)),
              {
                gasPrice: gasPriceCompatibility,
              }
            )
          ).wait(1);
        }
        await (
          await erc20.approve(
            (homeChainConfig as EvmBridgeConfig).erc20HandlerAddress,
            BigNumber.from(utils.parseUnits(amount.toString(), erc20Decimals)),
            {
              gasPrice: gasPriceCompatibility,
            }
          )
        ).wait(1);
      }

      // TODO do we really need once() here?
      homeBridge.once(
        homeBridge.filters.Deposit(null, null, null, address, null, null),
        (
          destinationDomainId: number,
          resourceId: string,
          depositNonce: number,
          user: string,
          data: string,
          handlerResponse: string,
          tx: Event
        ) => {
          setDepositNonce(`${depositNonce.toString()}`);
          setTransactionStatus("In Transit");
          setHomeTransferTxHash(tx.transactionHash);
        }
      );

      await (
        await homeBridge.deposit(destinationChainId, token.resourceId, data, {
          gasPrice: gasPriceCompatibility,
          value: utils.parseUnits((bridgeFee || 0).toString(), 18),
        })
      ).wait();

      return Promise.resolve();
    } catch (error) {
      console.error(error);
      setTransactionStatus("Transfer Aborted");
      setSelectedToken(tokenAddress);
    }
  };

export default makeDeposit;
