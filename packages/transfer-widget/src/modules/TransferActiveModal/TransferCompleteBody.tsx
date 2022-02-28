import React from "react";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { BridgeConfig, EvmBridgeConfig } from "@chainsafe/chainbridge-ui-core";

export default function TransferCompleteBody({
  classes,
  close,
  homeConfig,
  homeTransferTxHash,
  depositAmount,
  tokenSymbol,
  destinationChainConfig,
}: {
  classes: any;
  close: () => void;
  homeConfig?: BridgeConfig;
  homeTransferTxHash?: string;
  depositAmount?: number;
  tokenSymbol?: string;
  destinationChainConfig?: BridgeConfig;
}) {
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
          <Button
            size="small"
            className={classes.button}
            variant="outlined"
            onClick={close}
          >
            Start new transfer
          </Button>
        </Stack>
      </section>
    </>
  );
}
