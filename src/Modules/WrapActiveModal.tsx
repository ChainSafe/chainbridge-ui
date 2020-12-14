import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import { Button, ProgressBar, Typography } from "@chainsafe/common-components";
import CustomModal from "../Components/Custom/CustomModal";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import { TokenConfig } from "../chainbridgeConfig";

const useStyles = makeStyles(
  ({ animation, constants, palette, typography }: ITheme) =>
    createStyles({
      root: {
        width: "100%",
      },
      inner: {
        width: "100% !important",
        maxWidth: "unset !important",
        display: "flex",
        flexDirection: "row",
        padding: `${constants.generalUnit * 5}px ${
          constants.generalUnit * 3.5
        }px`,
        bottom: 0,
        top: "unset",
        transform: "unset",
        left: 0,
        border: "none",
        borderRadius: 0,
        transitionDuration: `${animation.transform}ms`,
      },
      heading: {
        whiteSpace: "nowrap",
        marginTop: constants.generalUnit / 2,
      },
      stepIndicator: {
        ...typography.h4,
        height: 40,
        width: 40,
        marginRight: constants.generalUnit * 2,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: `1px solid ${palette.additional["transactionModal"][2]}`,
        color: palette.additional["transactionModal"][3],
        "& svg": {
          height: 20,
          width: 20,
          display: "block",
        },
      },
      content: {
        display: "flex",
        flexDirection: "column",
      },
      buttons: {
        display: "flex",
        flexDirection: "row",
        marginTop: constants.generalUnit * 5,
        "& > *": {
          textDecoration: "none",
          marginRight: constants.generalUnit,
        },
      },
      button: {
        borderColor: `${palette.additional["gray"][8]} !important`,
        color: `${palette.additional["gray"][8]} !important`,
        textDecoration: "none",
        "&:hover": {
          borderColor: `${palette.additional["gray"][8]} !important`,
          backgroundColor: `${palette.additional["gray"][8]} !important`,
          color: `${palette.common.white.main} !important`,
          textDecoration: "none",
        },
      },
      initCopy: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "& > *:first-child": {
          marginTop: constants.generalUnit * 3.5,
          marginBottom: constants.generalUnit * 8,
        },
      },
      sendingCopy: {},
      vote: {
        display: "flex",
        flexDirection: "row",
        marginTop: constants.generalUnit,
        "& > *": {
          "&:first-child": {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 240,
          },
          "&:last-child": {
            marginLeft: constants.generalUnit * 3.5,
            fontStyle: "italic",
          },
        },
      },
      warning: {
        marginTop: constants.generalUnit * 3.5,
        display: "block",
        fontWeight: 600,
      },
      receipt: {
        marginTop: constants.generalUnit * 3.5,
        marginBottom: constants.generalUnit * 8,
      },
      weighted: {
        fontWeight: 600,
      },
      progress: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        "& > *": {
          borderRadius: "0 !important",
          "&  >  *": {
            borderRadius: "0 !important",
            background: `${palette.additional["transactionModal"][1]} !important`,
          },
        },
      },
    })
);

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
  const { homeChain } = useChainbridge();

  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={!!txState}
    >
      <ProgressBar
        className={classes.progress}
        size="small"
        variant="primary"
        progress={txState !== "done" ? -1 : 100}
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
              ? `Wrapping ${value} ${homeChain?.nativeTokenSymbol}`
              : `Unwrapping ${value} ${tokenInfo.symbol}`
            : action === "wrap"
            ? "Token wrapped"
            : "Token unwrapped"}
        </Typography>
        {txState !== "inProgress" && (
          <>
            <Typography className={classes.receipt} component="p">
              {action === "wrap"
                ? `Successfully wrapped ${homeChain?.nativeTokenSymbol} to ${tokenInfo.symbol}`
                : `Successfully unwrapped ${tokenInfo.symbol} to ${homeChain?.nativeTokenSymbol}`}
              {homeChain && homeChain.blockExplorer && txHash && (
                <>
                  <br />
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`${homeChain.blockExplorer}/${txHash}`}
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
                variant="outline"
                onClick={() => close()}
              >
                Start a transfer
              </Button>
              <Button
                size="small"
                className={classes.button}
                variant="outline"
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
