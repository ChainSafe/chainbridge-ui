import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { providers, BigNumber, utils, Event } from "ethers";
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
    provider?: providers.Web3Provider,
    address?: string,
    // chainbridgeData?: { chain1: BridgeEvents; chain2: BridgeEvents },
    chainbridgeInstance?: Chainbridge,
    bridgeSetup?: BridgeData
  ) =>
  async (paramsForDeposit: {
    amount: string;
    recipient: string;
    from: Directions;
    to: Directions;
    feeData: string;
  }) => {
    const token = homeChainConfig!.tokens.find(
      (token) =>
        token.address ===
        bridgeSetup![paramsForDeposit.from as keyof BridgeData].erc20Address
    );

    if (!token) {
      console.log("Invalid token selected");
      return;
    }

    // const events = chainbridgeData![paramsForDeposit.from as keyof BridgeData]

    const { erc20Address: tokenAddress } = bridgeSetup![paramsForDeposit.from as keyof BridgeData]

    setTransactionStatus("Initializing Transfer");
    setDepositAmount(Number(paramsForDeposit.amount));
    setSelectedToken(tokenAddress);

    try {
      const gasPriceCompatibility = await getPriceCompatibility(
        provider,
        homeChainConfig,
        gasPrice
      );

      const currentAllowance = await chainbridgeInstance?.checkCurrentAllowance(
        address!
      );

      // TODO extract token allowance logic to separate function
      if (currentAllowance! < Number(paramsForDeposit.amount)) {
        if (currentAllowance! > 0 &&
          token.isDoubleApproval
        ) {
          await chainbridgeInstance!.approve({
            amounForApproval: "0",
          })
        }
        await chainbridgeInstance!.approve({
          amounForApproval: paramsForDeposit.amount,
        })

      }

      // chainbridgeInstance?.homeChainDepositEventListener(
      //   (
      //     destinationDomainId: any,
      //     resourceId: any,
      //     depositNonce: any,
      //     user: any,
      //     data: any,
      //     handleResponse: any,
      //     tx: Event
      //   ) => {
      //     setDepositNonce(`${depositNonce.toString()}`);
      //     setTransactionStatus("In Transit");
      //     setHomeTransferTxHash(tx.transactionHash);
      //   }
      // )
      // events?.bridgeEvents(
      //   (
      //     destinationDomainId: number,
      //     resourceId: string,
      //     depositNonce: number,
      //     user: string,
      //     data: string,
      //     handlerResponse: string,
      //     tx: Event
      //   ) => {
      //     setDepositNonce(`${depositNonce.toString()}`);
      //     setTransactionStatus("In Transit");
      //     setHomeTransferTxHash(tx.transactionHash);
      //   }
      // );
      const depositTx = await chainbridgeInstance?.deposit({
        amount: paramsForDeposit.amount,
        recipientAddress: paramsForDeposit.recipient,
        feeData: paramsForDeposit.feeData
      });
      if (depositTx?.status === 1) {
        setDepositNonce('1')
        setTransactionStatus("In Transit");
        setHomeTransferTxHash(depositTx.transactionHash);
      }

      return Promise.resolve();
    } catch (error) {
      console.error(error);
      setTransactionStatus("Transfer Aborted");
      setSelectedToken(tokenAddress);
    }
  };

export default makeDeposit;
