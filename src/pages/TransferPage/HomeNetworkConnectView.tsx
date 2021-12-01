import React from "react";
import { Button, Typography, SelectInput } from "@chainsafe/common-components";
import { WalletType } from "../../contexts/NetworkManagerContext/NetworkManagerContext";
import { BridgeConfig } from "../../chainbridgeConfig";

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
}: HomeNetworkConnectViewProps) {
  return (
    <>
      <div className={classes.walletArea}>
        {!isReady && (
          <Button
            className={classes.connectButton}
            fullsize
            onClick={() => {
              setWalletType("select");
            }}
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
                component="h2"
                variant="h2"
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
