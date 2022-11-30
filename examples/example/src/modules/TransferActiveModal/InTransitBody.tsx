import React from "react";

import { TransitState } from "@chainsafe/chainbridge-ui-core";
import { BridgeConfig, EvmBridgeConfig } from "../../chainbridgeConfig";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function InTransitBody({
  classes,
  inTransitMessages,
  homeConfig,
  homeTransferTxHash,
}: {
  classes: any;
  inTransitMessages?: TransitState;
  homeConfig?: BridgeConfig;
  homeTransferTxHash?: string;
}) {
  return (
    <>
      <Box sx={{ my: 2 }}>
        {inTransitMessages &&
          inTransitMessages.transitMessage.map((m, i) => {
            if (typeof m === "string") {
              return (
                <Typography className={classes.vote} component="p" key={i}>
                  {m}
                </Typography>
              );
            } else if (typeof m === "object" && m.message !== undefined) {
              return (
                <Typography className={classes.vote} component="p" key={i}>
                  {m.message}
                </Typography>
              );
            } else {
              return (
                <Typography className={classes.vote} component="p" key={i}>
                  <span>Vote casted by {m.address}</span>
                  <span>{m.signed}</span>
                </Typography>
              );
            }
          })}
        <Typography className={classes.warning} sx={{ mt: 3, mb: 4 }}>
          This should take a few minutes. <br />
          Please do not refresh or leave the page.
        </Typography>
      </Box>
      <section className={classes.buttons}>
        {homeConfig &&
          (homeConfig as EvmBridgeConfig).blockExplorer &&
          homeTransferTxHash && (
            <Button
              href={`/explorer/transaction/${homeTransferTxHash}`}
              size="small"
              className={classes.button}
              variant="outlined"
            >
              View transaction
            </Button>
          )}
      </section>
    </>
  );
}
