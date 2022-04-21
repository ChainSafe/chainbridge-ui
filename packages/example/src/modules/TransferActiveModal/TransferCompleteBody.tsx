import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { BridgeConfig, EvmBridgeConfig } from "../../chainbridgeConfig";
import { Actions } from "@chainsafe/chainbridge-ui-core/dist/src/types";
import { API as OnboardAPI } from "bnc-onboard/dist/src/interfaces";

export default function TransferCompleteBody({
  classes,
  close,
  homeConfig,
  homeTransferTxHash,
  depositAmount,
  tokenSymbol,
  destinationChainConfig,
  savedWallet,
  resetOnboard,
  dispatcher,
  onboard,
}: {
  classes: any;
  close: () => void;
  homeConfig?: BridgeConfig;
  homeTransferTxHash?: string;
  depositAmount?: number;
  tokenSymbol?: string;
  destinationChainConfig?: BridgeConfig;
  savedWallet: string;
  resetOnboard: (
    dispatcher: (action: Actions) => void,
    onboard: OnboardAPI
  ) => void;
  dispatcher: (action: Actions) => void;
  onboard: OnboardAPI;
}) {
  const [reload, setReload] = useState(false);

  const execTimeout = () => {
    return setTimeout(() => {
      setReload(true);
    }, 5000);
  };

  useEffect(() => {
    if (reload) {
      resetOnboard(dispatcher, onboard);
    }
  }, [reload]);

  useEffect(() => {
    if (savedWallet === "WalletConnect") {
      console.log("saved wallet =>", savedWallet);
      execTimeout();
    }
  }, []);

  return (
    <>
      <Typography sx={{ mt: 3, mb: 4 }} component="p">
        Successfully transferred{" "}
        <strong>
          {depositAmount} {tokenSymbol}
          <br /> from {homeConfig?.name} to {destinationChainConfig?.name}.
        </strong>
      </Typography>
      <section className={classes.buttons}>
        <Stack direction="row" spacing={2}>
          {homeConfig &&
            (homeConfig as EvmBridgeConfig).blockExplorer &&
            homeTransferTxHash && (
              <Button
                href={`/explorer/transaction/${homeTransferTxHash}`}
                size="small"
                className={classes.button}
                variant="outlined"
              >
                View transfer
              </Button>
            )}
          {savedWallet !== "WalletConnect" ? (
            <Button
              size="small"
              className={classes.button}
              variant="outlined"
              onClick={close}
            >
              Start new transfer
            </Button>
          ) : (
            <Typography sx={{ mt: 3, mb: 4 }} component="p">
              Disconnecting from Wallet connect. Page will be reloaded
            </Typography>
          )}
        </Stack>
      </section>
    </>
  );
}
