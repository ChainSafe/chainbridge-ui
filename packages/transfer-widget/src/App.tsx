import React, {useState, useEffect} from "react";
import { init, ErrorBoundary, showReportDialog } from "@sentry/react";
import { ThemeSwitcher } from "@chainsafe/common-theme";
import CssBaseline from "@mui/material/CssBaseline";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import {
  TransferPage,
} from "./pages";
import { lightTheme } from "./themes/LightTheme";
import {
  ChainbridgeProvider,
  NetworkManagerProvider,
  LocalProvider,
  chainbridgeConfig
} from "@chainsafe/chainbridge-ui-core";
import { utils, ethers } from "ethers";


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

const AppWrapper: React.FC<{ config?: any, useExternalProvider?: any, externalProviderSource?: any }> = (props) => {
  const [isReady, setIsReady] = useState(false);

  const externalProvider = props.externalProviderSource ? new ethers.providers.Web3Provider(props.externalProviderSource, "any") : undefined
  useEffect(() => {
    if (!window.__RUNTIME_CONFIG__) {
      // @ts-ignore
      window.__RUNTIME_CONFIG__ = props.config;
      setIsReady(true);
    }
  }, []);
  return (
    <>
      {isReady ? (
        <App externalProvider={externalProvider} useExternalProvider={props.useExternalProvider} />
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

const App: React.FC<{externalProvider?: any, useExternalProvider?: any}> = ({externalProvider, useExternalProvider}) => {
  const {
    __RUNTIME_CONFIG__: {
      UI: { wrapTokenPage = false } = {},
      CHAINBRIDGE: { chains },
    },
  } = window;

  const tokens = chainbridgeConfig().chains
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
        <LocalProvider
          useExternalProvider={useExternalProvider}
          externalProvider={externalProvider}
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
          <NetworkManagerProvider predefinedWalletType={externalProvider ? 'Ethereum' : undefined}>
            <ChainbridgeProvider chains={chains}>
              <TransferPage />
            </ChainbridgeProvider>
          </NetworkManagerProvider>
        </LocalProvider>
      </ThemeSwitcher>
    </ErrorBoundary>
  );
};


export default AppWrapper;
