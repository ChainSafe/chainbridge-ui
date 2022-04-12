import React from "react";
import { SelectInput } from "@chainsafe/common-components";
import { Typography, Button } from "@mui/material";

import { WalletType } from "@chainsafe/chainbridge-ui-core";
import { BridgeConfig } from "../../chainbridgeConfig";

import { ConnectionDialog } from "../../modules";

type HomeNetworkConnectViewProps = {
  isReady: boolean | undefined;
  classes: any;
  setWalletType: (walletType: WalletType) => void;
  walletType: string;
  walletConnecting: boolean;
  setChangeNetworkOpen: React.Dispatch<React.SetStateAction<boolean>>;
  homeConfig: BridgeConfig | undefined;
  accounts: Array<any> | undefined;
  selectAccount: any;
  address: string | undefined;
  dispatcher: any;
};

export default function HomeNetworkConnectView({
  isReady,
  accounts,
  address,

  classes,
  walletConnecting,
  walletType,

  homeConfig,

  setWalletType,
  setChangeNetworkOpen,
  selectAccount,
  dispatcher,
}: HomeNetworkConnectViewProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <ConnectionDialog
        dispatcher={dispatcher}
        open={open}
        handleClose={handleClose}
      />
      <div className={classes.walletArea}>
        {!isReady && (
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
            onClick={handleClickOpen}
          >
            Connect
          </Button>
        )}
        {isReady &&
          (walletConnecting ? (
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
          ))}
      </div>
      {isReady &&
        walletType === "Substrate" &&
        accounts &&
        accounts.length > 0 && (
          <div>
            <section className={classes.accountSelector}>
              <SelectInput
                label="Select account"
                className={classes.generalInput}
                options={accounts.map((acc, i) => ({
                  label: acc.address,
                  value: i,
                }))}
                onChange={(value) => selectAccount && selectAccount(value)}
                value={accounts.findIndex((v) => v.address === address)}
                placeholder="Select an account"
              />
            </section>
          </div>
        )}
    </>
  );
}
