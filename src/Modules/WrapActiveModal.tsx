import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import { Button, Typography } from "@chainsafe/common-components";
import CustomModal from "../Components/Custom/CustomModal";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import { forwardTo } from "../Utils/History";
import { ROUTE_LINKS } from "../Components/Routes";
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
        borderTop: `6px solid ${palette.additional["transactionModal"][1]}`,
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
    })
);

interface IWrapActiveModalProps {
  txState?: "wrapping" | "done";
  value: number;
  tokenInfo: TokenConfig;
  txHash?: string;
  close: () => void;
}

const WrapActiveModal: React.FC<IWrapActiveModalProps> = ({
  txState,
  value,
  tokenInfo,
  txHash,
  close,
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
      <section>
        <div className={classes.stepIndicator}>
          {txState === "wrapping" ? 1 : 2}
        </div>
      </section>
      <section className={classes.content}>
        <Typography className={classes.heading} variant="h3" component="h3">
          {txState === "wrapping"
            ? `Wrapping ${value} ${tokenInfo.nativeTokenSymbol}`
            : "Token wrapped"}
        </Typography>
        {txState !== "wrapping" && (
          <>
            <Typography className={classes.receipt} component="p">
              Successfully transferred converted {tokenInfo.nativeTokenSymbol}{" "}
              to {tokenInfo.symbol}
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
