import React from "react";
import { init, ErrorBoundary, showReportDialog } from "@sentry/react";
import { ThemeSwitcher } from "@chainsafe/common-theme";
import {
  CssBaseline,
  Router,
  ToasterProvider,
} from "@chainsafe/common-components";

import Routes from "./Components/Routes";
import { lightTheme } from "./Themes/LightTheme";
import { ChainbridgeProvider } from "./Contexts/ChainbridgeContext";
import AppWrapper from "./Layouts/AppWrapper";
import { Web3Provider } from "@chainsafe/web3-context";
import { chainbridgeConfig } from "./chainbridgeConfig";
import { utils } from "ethers";

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
  const networks = chainbridgeConfig.chains.map((bc) => bc.networkId);

  const tokens = chainbridgeConfig.chains.reduce((tca, bc) => {
    return {
      ...tca,
      [bc.networkId]: bc.tokens,
    };
  }, {});
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
        <ToasterProvider autoDismiss>
          <Web3Provider
            networkIds={networks}
            tokensToWatch={tokens}
            onboardConfig={{
              walletSelect: {
                wallets: [
                  { walletName: "metamask", preferred: true },
                  {
                    walletName: "walletConnect",
                    infuraKey: "a7e16429d2254d488d396710084e2cd3",
                  },
                  { walletName: "opera" },
                  { walletName: "operaTouch" },
                  { walletName: "torus" },
                  { walletName: "status" },
                  { walletName: "unilogin" },
                  { walletName: "meetone" },
                  { walletName: "hyperpay" },
                ],
              },
            }}
            checkNetwork={false}
            cacheWalletSelection={false}
          >
            <ChainbridgeProvider>
              <Router>
                <AppWrapper>
                  <Routes />
                </AppWrapper>
              </Router>
            </ChainbridgeProvider>
          </Web3Provider>
        </ToasterProvider>
      </ThemeSwitcher>
    </ErrorBoundary>
  );
};

export default App;
