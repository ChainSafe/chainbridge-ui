import React from "react";
import { BridgeConfig, EvmBridgeConfig } from "@chainsafe/chainbridge-ui-core";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function ErrorTransferBody({
  classes,
  close,
  homeConfig,
  homeTransferTxHash,
  transferTxHash,
}: {
  classes: any;
  close: () => void;
  homeConfig?: BridgeConfig;
  homeTransferTxHash?: string;
  transferTxHash?: string;
}) {
  return (
    <>
      <Typography sx={{ mt: 3, mb: 4 }} component="p">
        Something went wrong and we could not complete your transfer.
      </Typography>
      {homeConfig &&
        (homeConfig as EvmBridgeConfig).blockExplorer &&
        homeTransferTxHash && (
          <Button
            onClick={() =>
              window.open(
                `${
                  (homeConfig as EvmBridgeConfig).blockExplorer
                }/${transferTxHash}`,
                "_blank"
              )
            }
            size="small"
            className={classes.button}
            variant="outlined"
            disabled
          >
            View transaction
          </Button>
        )}
      <section className={classes.buttons}>
        <Stack direction="row" spacing={2}>
          <Button
            size="small"
            className={classes.button}
            variant="outlined"
            onClick={close}
          >
            Start new transfer
          </Button>

          <Button
            size="small"
            href={process.env.REACT_APP_SUPPORT_URL}
            variant="outlined"
          >
            Ask a question on {process.env.REACT_APP_SUPPORT_SERVICE}
          </Button>
        </Stack>
      </section>
    </>
  );
}
