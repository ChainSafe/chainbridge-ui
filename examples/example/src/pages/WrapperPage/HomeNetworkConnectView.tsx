import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { WalletType } from "@chainsafe/chainbridge-ui-core";
import { BridgeConfig } from "../../chainbridgeConfig";

type HomeNetworkConnectViewProps = {
  isReady: boolean | undefined;
  classes: any;
  setWalletType: (walletType: WalletType) => void;
  walletConnecting: boolean;
  setChangeNetworkOpen: React.Dispatch<React.SetStateAction<boolean>>;
  homeConfig: BridgeConfig | undefined;
};

export default function HomeNetworkConnectView({
  isReady,

  classes,
  walletConnecting,

  homeConfig,

  setWalletType,
  setChangeNetworkOpen,
}: HomeNetworkConnectViewProps) {
  return (
    <div className={classes.walletArea}>
      {!isReady ? (
        <>
          <Typography sx={{ mb: 2 }} component="p" variant="body1">
            To convert a token that needs to be wrapped, please connect to the
            network that the token exists natively for. For example, to convert
            ETH into wrapped ETH (WETH), your wallet must be connected to an
            Ethereum network.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#262626",
              color: "#ffffff",
              ":hover": {
                backgroundColor: "#262626",
                opacity: 0.9,
              },
            }}
            onClick={() => {
              setWalletType("select");
            }}
          >
            Connect
          </Button>
        </>
      ) : walletConnecting ? (
        <section className={classes.connecting}>
          <Typography component="p" variant="h5">
            This app requires access to your wallet, <br />
            please login and authorize access to continue.
          </Typography>
        </section>
      ) : (
        <section className={classes.connected}>
          <div>
            <Typography variant="body1">Home network</Typography>
            <Typography
              className={classes.changeButton}
              variant="body1"
              onClick={() => setChangeNetworkOpen(true)}
            >
              Change
            </Typography>
          </div>
          <Typography
            component="h5"
            variant="h5"
            className={classes.networkName}
          >
            {homeConfig?.name}
          </Typography>
        </section>
      )}
    </div>
  );
}
