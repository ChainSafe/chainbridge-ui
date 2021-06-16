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
import { NetworkManagerProvider } from "./Contexts/NetworkManagerContext";
import { chainbridgeConfig } from "./chainbridgeConfig";
import { Web3Provider } from "@chainsafe/web3-context";
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
  const tokens = chainbridgeConfig.chains
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
            tokensToWatch={tokens}
            networkIds={[5]}
            onboardConfig={{
              dappId: process.env.REACT_APP_BLOCKNATIVE_DAPP_ID,
              walletSelect: {
                wallets: [{ walletName: "metamask", preferred: true }],
              },
              subscriptions: {
                network: (network) =>
                  network && console.log("chainId: ", network),
                balance: (amount) =>
                  amount && console.log("balance: ", utils.formatEther(amount)),
              },
            }}
            checkNetwork={false}
            gasPricePollingInterval={120}
            gasPriceSetting="fast"
          >
            <NetworkManagerProvider>
              <ChainbridgeProvider>
                <Router>
                  <AppWrapper>
                    <Routes />
                  </AppWrapper>
                </Router>
              </ChainbridgeProvider>
            </NetworkManagerProvider>
          </Web3Provider>
        </ToasterProvider>
      </ThemeSwitcher>
    </ErrorBoundary>
  );
};

export default App;
