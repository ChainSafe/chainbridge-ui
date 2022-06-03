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
import { BridgeData, BridgeEvents, Chainbridge, Directions } from "@chainsafe/chainbridge-sdk-core";

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
    bridgeFee?: number,
    chainbridgeData?: { chain1: BridgeEvents, chain2: BridgeEvents },
    chainbridgeInstance?: Chainbridge,
    bridgeSetup?: BridgeData
  ) =>
  async (
    paramsForDeposit: {amount: number, recipient: string, from: Directions, to: Directions}
  ) => {

    const token = homeChainConfig!.tokens.find(
      (token) => token.address === bridgeSetup![paramsForDeposit.from as keyof BridgeData].erc20Address
    );

    if (!token) {
      console.log("Invalid token selected");
      return;
    }

    const events = chainbridgeData![paramsForDeposit.from as keyof BridgeData]
    const { erc20Address: tokenAddress } = bridgeSetup![paramsForDeposit.from as keyof BridgeData]

    setTransactionStatus("Initializing Transfer");
    setDepositAmount(paramsForDeposit.amount);
    setSelectedToken(tokenAddress);

    try {
      const gasPriceCompatibility = await getPriceCompatibility(
        provider,
        homeChainConfig,
        gasPrice
      );

      const currentAllowance = await chainbridgeInstance?.checkCurrentAllowance(
        paramsForDeposit.from,
        address!
      )

      console.log(
        "🚀  currentAllowance",
        currentAllowance
      );
      // TODO extract token allowance logic to separate function
      if (currentAllowance! < paramsForDeposit.amount) {
        if (currentAllowance! > 0 &&
          token.isDoubleApproval
        ) {
          await chainbridgeInstance!.approve(
            "0",
            paramsForDeposit.from
          )
        }
      }

      events?.bridgeEvents((
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
      })

      await chainbridgeInstance?.deposit(
        paramsForDeposit.amount,
        paramsForDeposit.recipient,
        paramsForDeposit.from,
        paramsForDeposit.to
      )

      return Promise.resolve();
    } catch (error) {
      console.error(error);
      setTransactionStatus("Transfer Aborted");
      setSelectedToken(tokenAddress);
    }
  };

export default makeDeposit;
