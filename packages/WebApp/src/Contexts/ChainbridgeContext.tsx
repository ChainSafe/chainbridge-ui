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
  name: string;
  bridgeAddress: string;
  erc20HandlerAddress: string;
  rpcUrl: string;
  type: "Ethereum" | "Substrate";
};

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
};

const ChainbridgeContext = React.createContext<ChainbridgeContext | undefined>(
  undefined
);

const ERC20ResourceId =
  "0x00000000000000000000000021605f71845f372A9ed84253d2D024B7B10999f4";

const chains: Chain[] = [
  {
    chainId: 5,
    name: "EthA",
    bridgeAddress: "0x62877dDCd49aD22f5eDfc6ac108e9a4b5D2bD88B",
    erc20HandlerAddress: "0x3167776db165d8ea0f51790ca2bbf44db5105adf",
    rpcUrl: "http://localhost:8545",
    type: "Ethereum",
  },
  {
    chainId: 2,
    name: "EthB",
    bridgeAddress: "0x62877dDCd49aD22f5eDfc6ac108e9a4b5D2bD88B",
    erc20HandlerAddress: "0x3167776db165d8ea0f51790ca2bbf44db5105adf",
    rpcUrl: "http://localhost:8546",
    type: "Ethereum",
  },
];

const ChainbridgeProvider = ({ children }: IChainbridgeContextProps) => {
  const { isReady, network, provider, tokens } = useWeb3();
  const [homeChain, setHomeChain] = useState<Chain | undefined>();
  const [destinationChain, setDestinationChain] = useState<Chain | undefined>();
  const [destinationChains, setDestinationChains] = useState<Chain[]>([]);
  const [homeBridge, setHomeBridge] = useState<Bridge | undefined>(undefined);
  const [destinationBridge, setDestinationBridge] = useState<
    Bridge | undefined
  >(undefined);

  useEffect(() => {
    if (network && isReady) {
      const home = chains.find((c) => c.chainId === network);
      if (!home) {
        console.log("Invalid network selected");
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
      setDestinationChains(chains.filter((c) => c.chainId !== network));
    } else {
      setHomeChain(undefined);
    }
  }, [isReady, network]);

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
      const approval = await (
        await erc20.approve(
          homeChain.erc20HandlerAddress,
          BigNumber.from(utils.parseUnits(amount.toString(), 18))
        )
      ).wait(1);
      const tx = await homeBridge.deposit(
        destinationChain.chainId,
        ERC20ResourceId,
        data
      );
      const proposalEventFilter = homeBridge.filters.ProposalEvent(
        homeChain.chainId,
        null,
        null,
        null,
        null
      );

      homeBridge.on(proposalEventFilter, () =>
        console.log("Proposal created on dest chain")
      );

      const proposalVoteFilter = homeBridge.filters.ProposalVote(
        homeChain.chainId,
        null,
        null,
        null
      );
      destinationBridge.on(proposalVoteFilter, () =>
        console.log("Proposal vote passed")
      );
      await tx.wait(5);

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
