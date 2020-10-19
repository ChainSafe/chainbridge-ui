import { useWeb3 } from "@chainsafe/web3-context";
import React, { useContext, useEffect, useState } from "react";

interface IChainbridgeContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type Chain = {
  chainId: number;
  name: string;
  bridgeAddress: string;
  rpcUrl: string;
  type: "Ethereum" | "Substrate";
};

type ChainbridgeContext = {
  homeChain?: Chain;
  destinationChain?: Chain;
  destinationChains: Array<{ chainId: number; name: string }>;
  setDestinationChain(chainId: number): void;
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
    rpcUrl: "http://localhost:8545",
    type: "Ethereum",
  },
  {
    chainId: 2,
    name: "EthB",
    bridgeAddress: "0x62877dDCd49aD22f5eDfc6ac108e9a4b5D2bD88B",
    rpcUrl: "http://localhost:8546",
    type: "Ethereum",
  },
];

const ChainbridgeProvider = ({ children }: IChainbridgeContextProps) => {
  const { isReady, network } = useWeb3();
  const [homeChain, setHomeChain] = useState<Chain | undefined>();
  const [destinationChain, setDestinationChain] = useState<Chain | undefined>();
  const [destinationChains, setDestinationChains] = useState<Chain[]>([]);

  useEffect(() => {
    if (network && isReady) {
      console.log(network);

      const home = chains.find((c) => c.chainId === network);
      console.log(home);
      setHomeChain(home);
      setDestinationChains(chains.filter((c) => c.chainId !== network));
    } else {
      setHomeChain(undefined);
    }
  }, [isReady, network]);

  const handleSetDestination = (chainId: number) => {
    const chain = destinationChains.find((c) => c.chainId === chainId);
    setDestinationChain(chain);
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
