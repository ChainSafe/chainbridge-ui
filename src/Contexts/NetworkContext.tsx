import { Web3Provider } from "@chainsafe/web3-context";
import React, { useContext, useState } from "react";
import { utils } from "ethers";
import { chainbridgeConfig } from "../chainbridgeConfig";

interface INetworkContextProps {
  children: React.ReactNode | React.ReactNode[];
}

type NetworkOption = "unset" | "evm" | "substrate";

type NetworkContext = {
  currentNetwork: NetworkOption;
  setCurrentNetwork: (nextNetwork: NetworkOption) => void;
};

const NetworkContext = React.createContext<NetworkContext | undefined>(
  undefined
);

const NetworkProvider = ({ children }: INetworkContextProps) => {
  const [currentNetwork, setCurrentNetwork] = useState<NetworkOption>("unset");
  const tokens = chainbridgeConfig.chains.reduce((tca, bc) => {
    return {
      ...tca,
      [bc.networkId]: bc.tokens,
    };
  }, {});

  return (
    <NetworkContext.Provider
      value={{
        currentNetwork,
        setCurrentNetwork,
      }}
    >
      {currentNetwork === "substrate" ? (
        { children }
      ) : currentNetwork === "evm" ? (
        <Web3Provider
          tokensToWatch={tokens}
          onboardConfig={{
            dappId: process.env.REACT_APP_BLOCKNATIVE_DAPP_ID,
            walletSelect: {
              wallets: [{ walletName: "metamask", preferred: true }],
            },
            subscriptions: {
              network: (network) => console.log("chainId: ", network),
              balance: (amount) =>
                console.log("balance: ", utils.formatEther(amount)),
            },
          }}
          checkNetwork={false}
          gasPricePollingInterval={120}
          gasPriceSetting="fast"
        >
          {children}
        </Web3Provider>
      ) : (
        { children }
      )}
      {children}
    </NetworkContext.Provider>
  );
};

const useNetworkContext = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error(
      "useNetworkContext must be called within a NetworkProvider"
    );
  }
  return context;
};

export { NetworkProvider, useNetworkContext };
