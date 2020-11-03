import { useWeb3 } from "@chainsafe/web3-context";
import React, { useContext, useEffect, useState } from "react";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { BigNumber, ethers, utils } from "ethers";
import { Erc20DetailedFactory } from "../Contracts/Erc20DetailedFactory";
import { BridgeConfig, chainbridgeConfig } from "../chainbridgeConfig";

interface IChainbridgeContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type Chain = {
  chainId: number;
  networkId: number;
  name: string;
  bridgeAddress: string;
  erc20HandlerAddress: string;
  rpcUrl: string;
  type: "Ethereum" | "Substrate";
  tokenAddresses: string[];
};

type ChainbridgeContext = {
  homeChain?: BridgeConfig;
  destinationChain?: BridgeConfig;
  destinationChains: Array<{ chainId: number; name: string }>;
  setDestinationChain(chainId: number): void;
  deposit(
    amount: number,
    recipient: string,
    tokenAddress: string
  ): Promise<void>;
  resetDeposit(): void;
  transactionStatus?: TransactionStatus;
  depositVotes: number;
  relayerThreshold?: number;
  depositNonce?: string;
  inTransitMessages: string[];
  depositAmount?: number;
};

type TransactionStatus =
  | "Initializing Transfer"
  | "In Transit"
  | "Transfer Completed"
  | "Transfer Aborted";

const ChainbridgeContext = React.createContext<ChainbridgeContext | undefined>(
  undefined
);

const ERC20ResourceId =
  "0x000000000000000000000014dD060dB55c0E7cc072BD3ab4709d55583119c001";

const ChainbridgeProvider = ({ children }: IChainbridgeContextProps) => {
  const { isReady, network, provider } = useWeb3();
  const [homeChain, setHomeChain] = useState<BridgeConfig | undefined>();
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );
  const [destinationChain, setDestinationChain] = useState<
    BridgeConfig | undefined
  >();
  const [destinationChains, setDestinationChains] = useState<BridgeConfig[]>(
    []
  );
  const [homeBridge, setHomeBridge] = useState<Bridge | undefined>(undefined);
  const [destinationBridge, setDestinationBridge] = useState<
    Bridge | undefined
  >(undefined);
  const [transactionStatus, setTransactionStatus] = useState<
    TransactionStatus | undefined
  >(undefined);
  const [depositNonce, setDepositNonce] = useState<string | undefined>(
    undefined
  );
  const [depositVotes, setDepositVotes] = useState<number>(0);
  const [inTransitMessages, setInTransitMessages] = useState<string[]>([]);
  const [depositAmount, setDepositAmount] = useState<number | undefined>();

  const resetDeposit = () => {
    chainbridgeConfig.length > 2 && setDestinationChain(undefined);
    setTransactionStatus(undefined);
    setDepositNonce(undefined);
    setDepositVotes(0);
    setDepositAmount(undefined);
    setInTransitMessages([]);
  };

  const handleSetDestination = (chainId: number) => {
    const chain = destinationChains.find((c) => c.chainId === chainId);
    if (!chain) {
      throw new Error("Invalid destination chain selected");
    }
    setDestinationChain(chain);
  };

  useEffect(() => {
    if (destinationChain) {
      const provider = new ethers.providers.JsonRpcProvider(
        destinationChain?.rpcUrl
      );
      const bridge = BridgeFactory.connect(
        destinationChain?.bridgeAddress,
        provider
      );
      setDestinationBridge(bridge);
    }
  }, [destinationChain]);

  useEffect(() => {
    if (network && isReady) {
      const home = chainbridgeConfig.find((c) => c.networkId === network);
      if (!home) {
        return;
      }
      setHomeChain(home);

      const signer = provider?.getSigner();
      if (!signer) {
        console.log("No signer");
        return;
      }

      const bridge = BridgeFactory.connect(home.bridgeAddress, signer);
      setHomeBridge(bridge);
      setDestinationChains(
        chainbridgeConfig.filter((c) => c.networkId !== network)
      );
      if (chainbridgeConfig.length === 2) {
        const destChain = chainbridgeConfig.find(
          (c) => c.networkId !== network
        );

        destChain && setDestinationChain(destChain);
      }
    } else {
      setHomeChain(undefined);
    }
  }, [isReady, network, provider]);

  useEffect(() => {
    const getRelayerThreshold = async () => {
      if (homeBridge) {
        const threshold = BigNumber.from(
          await homeBridge?._relayerThreshold()
        ).toNumber();
        setRelayerThreshold(threshold);
      }
    };
    getRelayerThreshold();
  }, [homeBridge]);

  useEffect(() => {
    if (homeChain && destinationBridge && depositNonce) {
      destinationBridge.on(
        destinationBridge.filters.ProposalEvent(
          homeChain.chainId,
          BigNumber.from(depositNonce),
          null,
          null,
          null
        ),
        (originChainId, depositNonce, status) => {
          switch (BigNumber.from(status).toNumber()) {
            case 1:
              setInTransitMessages(
                inTransitMessages.concat(
                  `Proposal created on ${destinationChain?.name}`
                )
              );
              break;
            case 2:
              setInTransitMessages(
                inTransitMessages.concat(`Proposal has passed. Executing...`)
              );
              break;
            case 3:
              setTransactionStatus("Transfer Completed");
              break;
            case 4:
              setTransactionStatus("Transfer Aborted");
              break;
          }
        }
      );

      destinationBridge.on(
        destinationBridge.filters.ProposalVote(
          homeChain.chainId,
          BigNumber.from(depositNonce),
          null,
          null
        ),
        (originChainId, depositNonce, status, resourceId, tx) => {
          // TODO: Ensure that no event is emitted for NO votes.
          setDepositVotes(depositVotes + 1);
          // TODO: Improve these messages including the TX Hash
          console.log(tx);
          setInTransitMessages(inTransitMessages.concat(`Vote cast`));
        }
      );
    }
    return () => {
      //@ts-ignore
      destinationBridge?.removeAllListeners();
    };
  }, [
    depositNonce,
    homeChain,
    destinationBridge,
    depositVotes,
    destinationChain,
    inTransitMessages,
  ]);

  const deposit = async (
    amount: number,
    recipient: string,
    tokenAddress: string
  ) => {
    if (!homeBridge || !homeChain) {
      console.log("Home bridge contract is not instantiated");
      return;
    }

    if (!destinationChain || !destinationBridge) {
      console.log("Destination bridge contract is not instantiated");
      return;
    }

    const signer = provider?.getSigner();
    if (!signer) {
      console.log("No signer");
      return;
    }

    setTransactionStatus("Initializing Transfer");
    setDepositAmount(amount);

    const erc20 = Erc20DetailedFactory.connect(tokenAddress, signer);

    const data =
      "0x" +
      utils
        .hexZeroPad(
          // TODO Wire up dynamic token decimals
          BigNumber.from(utils.parseUnits(amount.toString(), 18)).toHexString(),
          32
        )
        .substr(2) + // Deposit Amount (32 bytes)
      utils
        .hexZeroPad(utils.hexlify((recipient.length - 2) / 2), 32)
        .substr(2) + // len(recipientAddress) (32 bytes)
      recipient.substr(2); // recipientAddress (?? bytes)

    try {
      await (
        await erc20.approve(
          homeChain.erc20HandlerAddress,
          BigNumber.from(utils.parseUnits(amount.toString(), 18))
        )
      ).wait(1);

      homeBridge.once(
        homeBridge.filters.Deposit(
          destinationChain.chainId,
          ERC20ResourceId,
          null
        ),
        (destChainId, resourceId, depositNonce) => {
          setDepositNonce(`${depositNonce.toString()}`);
          setTransactionStatus("In Transit");
        }
      );

      await (
        await homeBridge.deposit(
          destinationChain.chainId,
          ERC20ResourceId,
          data
        )
      ).wait();
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      setTransactionStatus("Transfer Aborted");
      return Promise.reject();
    }
  };

  return (
    <ChainbridgeContext.Provider
      value={{
        homeChain: homeChain,
        destinationChain: destinationChain,
        destinationChains: destinationChains.map((c) => ({
          chainId: c.chainId,
          name: c.name,
        })),
        setDestinationChain: handleSetDestination,
        deposit,
        resetDeposit,
        depositVotes,
        relayerThreshold: relayerThreshold,
        depositNonce,
        transactionStatus,
        inTransitMessages,
        depositAmount,
      }}
    >
      {children}
    </ChainbridgeContext.Provider>
  );
};

const useChainbridge = () => {
  const context = useContext(ChainbridgeContext);
  if (context === undefined) {
    throw new Error("useChainbridge must be called within a DriveProvider");
  }
  return context;
};

export { ChainbridgeProvider, useChainbridge };
