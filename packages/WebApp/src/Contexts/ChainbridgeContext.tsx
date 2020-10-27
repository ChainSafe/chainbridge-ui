import { useWeb3 } from "@chainsafe/web3-context";
import React, { useContext, useEffect, useState } from "react";
import { Bridge, BridgeFactory } from "@chainsafe/chainbridge-contracts";
import { BigNumber, ethers, utils } from "ethers";
import { Erc20DetailedFactory } from "../Contracts/Erc20DetailedFactory";

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
};

const chains: Chain[] = [
  {
    chainId: 1,
    networkId: 5,
    name: "Goerli",
    bridgeAddress: "0x2524d71D163f60747630c4EBeB077a9832329646",
    erc20HandlerAddress: "0xDc26320258ADfd806d125223Fb0F94e54D13FA51",
    rpcUrl: "https://goerli.prylabs.net",
    type: "Ethereum",
  },
  {
    chainId: 2,
    networkId: 6,
    name: "Kotti",
    bridgeAddress: "0x2524d71D163f60747630c4EBeB077a9832329646",
    erc20HandlerAddress: "0xDc26320258ADfd806d125223Fb0F94e54D13FA51",
    rpcUrl: "https://www.ethercluster.com/kotti",
    type: "Ethereum",
  },
];

type ChainbridgeContext = {
  homeChain?: Chain;
  destinationChain?: Chain;
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
  const { isReady, network, provider, tokens } = useWeb3();
  const [homeChain, setHomeChain] = useState<Chain | undefined>();
  const [relayerThreshold, setRelayerThreshold] = useState<number | undefined>(
    undefined
  );
  const [destinationChain, setDestinationChain] = useState<Chain | undefined>();
  const [destinationChains, setDestinationChains] = useState<Chain[]>([]);
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

  const resetDeposit = () => {
    setDestinationChain(undefined);
    setTransactionStatus(undefined);
    setDepositNonce(undefined);
    setDepositVotes(0);
    setInTransitMessages([]);
  };

  useEffect(() => {
    if (network && isReady) {
      const home = chains.find((c) => c.networkId === network);
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
      setDestinationChains(chains.filter((c) => c.networkId !== network));
    } else {
      setHomeChain(undefined);
    }
  }, [isReady, network]);

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
                  `Prosposal created on ${destinationChain?.name}`
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
        (originChainId, deposinNonce, status) => {
          // TODO: Ensure that no event is emitted for NO votes.
          setDepositVotes(depositVotes + 1);
          setInTransitMessages(inTransitMessages.concat("Vote cast"));
        }
      );
    }
    return () => {
      //@ts-ignore
      destinationBridge?.removeAllListeners();
    };
  }, [depositNonce, homeChain, destinationBridge]);

  const handleSetDestination = (chainId: number) => {
    const chain = destinationChains.find((c) => c.chainId === chainId);
    if (!chain) {
      throw new Error("Invalid destination chain selected");
    }
    setDestinationChain(chain);
    const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
    const bridge = BridgeFactory.connect(chain.bridgeAddress, provider);
    setDestinationBridge(bridge);
  };

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
