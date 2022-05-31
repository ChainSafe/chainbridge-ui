import React from "react";
import { ThemeSwitcher } from "@chainsafe/common-theme";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme } from "./themes/LightTheme";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import {
  ExplorerProvider,
  chainbridgeConfig,
  ChainbridgeProvider,
  LocalProvider,
} from "@chainsafe/chainbridge-ui-core";
import { ExplorerPage } from "./pages";
import { utils } from "ethers";
import { Header } from "./components";

export const ROUTE_LINKS = {
  Explorer: "/",
  ExplorerDetailed: "/transaction/detail-view/:txId",
  TransactionPage: "/transaction/:txHash",
};

function App() {
  const { chains } = chainbridgeConfig();

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

  const rpcUrls = chains.reduce(
    (acc, { networkId, rpcUrl }) => ({ ...acc, [networkId!]: rpcUrl }),
    {}
  );
  console.log("explorer UI", chains);
  return (
    <ThemeSwitcher themes={{ light: lightTheme }}>
      <CssBaseline />
      <LocalProvider
        networkIds={[5]}
        checkNetwork={false}
        tokensToWatch={tokens}
        onboardConfig={{
          walletSelect: {
            wallets: [
              { walletName: "metamask" },
              {
                walletName: "walletConnect",
                rpc: { ...rpcUrls },
                bridge: "https://bridge.walletconnect.org",
              },
            ],
          },
          subscriptions: {
            network: (network: any) =>
              network && console.log("domainId: ", network),
            balance: (amount: any) =>
              amount && console.log("balance: ", utils.formatEther(amount)),
          },
        }}
      >
        <ChainbridgeProvider chains={chains}>
          <Header />
          <Router>
            <Switch>
              <Route exact path={ROUTE_LINKS.Explorer}>
                <ExplorerProvider>
                  <ExplorerPage />
                </ExplorerProvider>
              </Route>
              <Route exact path={ROUTE_LINKS.ExplorerDetailed}>
                <ExplorerProvider>
                  <ExplorerPage />
                </ExplorerProvider>
              </Route>
            </Switch>
          </Router>
        </ChainbridgeProvider>
      </LocalProvider>
    </ThemeSwitcher>
  );
}

export default App;
