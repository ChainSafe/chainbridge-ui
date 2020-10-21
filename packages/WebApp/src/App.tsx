import React from "react";
import { init, ErrorBoundary, showReportDialog } from "@sentry/react";
import { ThemeSwitcher } from "@imploy/common-themes";
import {
  CssBaseline,
  Router,
  ToasterProvider,
} from "@imploy/common-components";

import Routes from "./Components/Routes";
import { lightTheme } from "./Themes/LightTheme";
import { ChainbridgeProvider } from "./Contexts/ChainbridgeContext";
import AppWrapper from "./Layouts/AppWrapper";
import { UseWalletProvider } from "use-wallet";

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
          <UseWalletProvider chainId={1}>
            <ChainbridgeProvider>
              <Router>
                <AppWrapper>
                  <Routes />
                </AppWrapper>
              </Router>
            </ChainbridgeProvider>
          </UseWalletProvider>
        </ToasterProvider>
      </ThemeSwitcher>
    </ErrorBoundary>
  );
};

export default App;
