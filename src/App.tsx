import React from "react";
import { init, ErrorBoundary, showReportDialog } from "@sentry/react";
import { ThemeSwitcher } from "@chainsafe/common-theme";
import { CssBaseline, ToasterProvider } from "@chainsafe/common-components";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import TransferPage from "./Components/Pages/TransferPage";
import WrapperPage from "./Components/Pages/WrapperPage";
import { lightTheme } from "./Themes/LightTheme";
import { ChainbridgeProvider } from "./Contexts/ChainbridgeContext";
import AppWrapper from "./Layouts/AppWrapper";
import { Web3Provider } from "@chainsafe/web3-context";
import { chainbridgeConfig } from "./chainbridgeConfig";
import { utils } from "ethers";
import Tutorials from "./Components/Pages/Tutorials";
import FAQ from "./Components/Pages/FAQ";

export const ROUTE_LINKS = {
  Transfer: "/transfer",
  Wrap: "/wrap",
};

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
            tokensToWatch={tokens}
            onboardConfig={{
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
            <ChainbridgeProvider>
              <HashRouter>
                <Switch>
                  <Route
                    exact
                    path={ROUTE_LINKS.Transfer}
                    render={() => {
                      return (
                        <AppWrapper>
                          <TransferPage></TransferPage>
                        </AppWrapper>
                      );
                    }}
                  />
                  <Route
                    exact
                    path={ROUTE_LINKS.Wrap}
                    render={() => {
                      return (
                        <AppWrapper>
                          <WrapperPage></WrapperPage>
                        </AppWrapper>
                      );
                    }}
                  />
                </Switch>
                <Route exact path={"/tutorials"} component={Tutorials} />
                <Route exact path={"/faq"} component={FAQ} />
                <Route
                  exact
                  path="/"
                  render={() => {
                    return <Redirect to={ROUTE_LINKS.Transfer} />;
                  }}
                ></Route>
              </HashRouter>
            </ChainbridgeProvider>
          </Web3Provider>
        </ToasterProvider>
      </ThemeSwitcher>
    </ErrorBoundary>
  );
};

export default App;
