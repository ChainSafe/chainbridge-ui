import React from "react";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

import Typography from "@mui/material/Typography";
import { CustomModal } from "../../components";
import { useChainbridge, EvmBridgeConfig, TokenConfig } from "@chainsafe/chainbridge-ui-core";
import { useStyles } from "./styles";

interface IWrapActiveModalProps {
  txState?: "inProgress" | "done";
  value: number;
  tokenInfo: TokenConfig;
  txHash?: string;
  close: () => void;
  action: "wrap" | "unwrap";
}

const WrapActiveModal: React.FC<IWrapActiveModalProps> = ({
  txState,
  value,
  tokenInfo,
  txHash,
  close,
  action,
}: IWrapActiveModalProps) => {
  const classes = useStyles();
  const { homeConfig } = useChainbridge();

  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={!!txState}
    >
      <LinearProgress
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          "& > *": {
            borderRadius: "0 !important",
            "&  >  *": {
              borderRadius: "0 !important",
            },
          },
        }}
        value={txState !== "done" ? -1 : 100}
      />
      <section>
        <div className={classes.stepIndicator}>
          {txState === "inProgress" ? 1 : 2}
        </div>
      </section>
      <section className={classes.content}>
        <Typography className={classes.heading} variant="h3" component="h3">
          {txState === "inProgress"
            ? action === "wrap"
              ? `Wrapping ${value} ${homeConfig?.nativeTokenSymbol}`
              : `Unwrapping ${value} ${tokenInfo.symbol}`
            : action === "wrap"
            ? "Token wrapped"
            : "Token unwrapped"}
        </Typography>
        {txState !== "inProgress" && (
          <>
            <Typography className={classes.receipt} component="p">
              {action === "wrap"
                ? `Successfully wrapped ${homeConfig?.nativeTokenSymbol} to ${tokenInfo.symbol}`
                : `Successfully unwrapped ${tokenInfo.symbol} to ${homeConfig?.nativeTokenSymbol}`}
              {homeConfig &&
                (homeConfig as EvmBridgeConfig).blockExplorer &&
                txHash && (
                  <>
                    <br />
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`${
                        (homeConfig as EvmBridgeConfig).blockExplorer
                      }/${txHash}`}
                    >
                      View Transaction
                    </a>
                  </>
                )}
            </Typography>
            <section className={classes.buttons}>
              <Button
                size="small"
                className={classes.button}
                variant="outlined"
                onClick={() => close()}
              >
                Start a transfer
              </Button>
              <Button
                size="small"
                className={classes.button}
                variant="outlined"
                onClick={() => {
                  close();
                }}
              >
                Close Window
              </Button>
            </section>
          </>
        )}
      </section>
    </CustomModal>
  );
};

export default WrapActiveModal;
