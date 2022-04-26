import React from "react";
import { init, ErrorBoundary, showReportDialog } from "@sentry/react";
import { ThemeSwitcher } from "@chainsafe/common-theme";
import CssBaseline from "@mui/material/CssBaseline";

import { BrowserRouter as Router } from "react-router-dom";

import { ChainbridgeRoutes } from "./routes";
import { lightTheme } from "./themes/LightTheme";
import {
  ChainbridgeProvider,
  NetworkManagerProvider,
  LocalProvider,
  chainbridgeConfig,
} from "@chainsafe/chainbridge-ui-core";
import { AppWrapper } from "./layouts";
import { utils } from "ethers";
import "@chainsafe/common-theme/dist/font-faces.css";

if (
  process.env.NODE_ENV === "production" &&
  process.env.REACT_APP_SENTRY_DSN_URL &&
  process.env.REACT_APP_SENTRY_RELEASE
) {
  init({
    dsn: process.env.REACT_APP_SENTRY_DSN_URL,
    release: process.env.REACT_APP_SENTRY_RELEASE,
  });
}

const App: React.FC<{}> = () => {
  const {
    __RUNTIME_CONFIG__: {
      UI: { wrapTokenPage = false } = {},
      CHAINBRIDGE: { chains },
    },
  } = window;

  const tokens = chainbridgeConfig()
    .chains.filter((c) => c.type === "Ethereum")
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

  return (
    <ErrorBoundary
      fallback={({ error, componentStack, eventId, resetError }) => (
        <div>
          <p>
            An error occurred and has been logged. If you would like to provide
            additional info to help us debug and resolve the issue, click the
            "Provide Additional Details" button
          </p>
          <p>{error?.message.toString()}</p>
          <p>{componentStack}</p>
          <p>{eventId}</p>
          <button onClick={() => showReportDialog({ eventId: eventId || "" })}>
            Provide Additional Details
          </button>
          <button onClick={resetError}>Reset error</button>
        </div>
      )}
      onReset={() => window.location.reload()}
    >
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
            <Router>
              <AppWrapper wrapTokenPage={wrapTokenPage}>
                <ChainbridgeRoutes wrapTokenPage={wrapTokenPage} />
              </AppWrapper>
            </Router>
          </ChainbridgeProvider>
        </LocalProvider>
      </ThemeSwitcher>
    </ErrorBoundary>
  );
};

export default App;
