import React, { useEffect, useState } from "react";
import {
  ChainbridgeProvider,
  LocalProvider,
  NetworkManagerProvider,
  useChainbridge,
  useWeb3
} from "@chainsafe/chainbridge-ui-core";

import { utils } from "ethers";

const BasicApp = (props: any) => {
  const { setWalletType } = useWeb3();

  const handleSetWallet = () => setWalletType("Ethereum")

  const { address, destinationChains, homeConfig, tokens } = useChainbridge();

  const [tokenInfo, setTokenInfo] = useState({} as any);

  useEffect(() => {
    if (Object.keys(tokens).length) {
      const token = Object.keys(tokens).reduce(
        (acc: any, key: string) => acc[key],
        tokens
      );
      setTokenInfo({
        ...token,
      });
    }
  }, [address, destinationChains, homeConfig, tokens]);

  return (
    <div>
      <h1>Basic Example</h1>
      <button onClick={handleSetWallet}>Set wallet</button>
      {address &&
        destinationChains.length &&
        homeConfig !== undefined &&
        Object.keys(tokens).length && (
          <div>
            <h2>Wallet address: {address}</h2>

            <div>
              <h2>Homechain configuration</h2>
              <div>
                <p>Network name: {homeConfig.name}</p>
                <p>Network id: {homeConfig.networkId}</p>
              </div>
            </div>

            <div>
              <h2>Destination chains</h2>
              <div>
                {destinationChains.map((d) => (
                  <div key={d.domainId}>
                    <p>Network name: {d.name}</p>
                    <p>Network Id: {d.domainId}</p>
                    <br />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2>Token information</h2>
              <div>
                <p>Token name: {tokenInfo.name}</p>
                <p>Token balance: {tokenInfo.balance}</p>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

const App: React.FC<{}> = () => {
  const {
    __RUNTIME_CONFIG__: {
      CHAINBRIDGE: { chains },
    },
  } = window;

  const tokens = chains
    .filter((c) => c.type === "Ethereum")
    .reduce((tca, bc: any) => {
      if (bc.networkId) {
        return {
          ...tca,
          [bc.networkId]: bc.tokens,
        };
      } else {
        return tca;
      }
    }, {});

  return (
    <LocalProvider
      networkIds={[5]}
      checkNetwork={false}
      tokensToWatch={tokens}
      onboardConfig={{
        walletSelect: {
          wallets: [{ walletName: "metamask", preferred: true }],
        },
        subscriptions: {
          network: (network: any) =>
            network && console.log("domainId: ", network),
          balance: (amount: any) =>
            amount && console.log("balance: ", utils.formatEther(amount)),
        },
      }}
    >
      <NetworkManagerProvider>
        <ChainbridgeProvider chains={chains}>
          <BasicApp />
        </ChainbridgeProvider>
      </NetworkManagerProvider>
    </LocalProvider>
  );
};

export default App;
