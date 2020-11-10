import React, { useState } from "react";

import { makeStyles, createStyles, ITheme } from "@imploy/common-themes";
import { Button, Typography } from "@imploy/common-components";
import CustomModal from "../Components/Custom/CustomModal";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import { forwardTo } from "../Utils/History";
import { ROUTE_LINKS } from "../Components/Routes";

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
  open: boolean;
  close: () => void;
}

const WrapActiveModal: React.FC<IWrapActiveModalProps> = ({
  open,
  close,
}: IWrapActiveModalProps) => {
  const classes = useStyles();
  const { homeChain } = useChainbridge();

  // TODO
  const [STATE, setState] = useState<"wrapping" | "done">("wrapping");
  const VALUE = "3";
  const SYMBOL = "ETH";
  const WRAPPED_SYMBOL = "WETH";
  const WRAPPED_TX_HASH = "asda";
  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={open}
    >
      <section>
        <div className={classes.stepIndicator}>
          {STATE === "wrapping" ? 1 : 2}
        </div>
      </section>
      <section className={classes.content}>
        <Typography className={classes.heading} variant="h3" component="h3">
          {STATE === "wrapping"
            ? `Wrapping ${VALUE} ${SYMBOL}`
            : "Token wrapped"}
        </Typography>
        {STATE !== "wrapping" && (
          <>
            <Typography className={classes.receipt} component="p">
              Successfully transferred converted {SYMBOL} to {WRAPPED_SYMBOL}
              {homeChain && homeChain.blockExplorer && WRAPPED_TX_HASH && (
                <>
                  <br />
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`${homeChain.blockExplorer}/${WRAPPED_TX_HASH}`}
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
                onClick={() => {
                  close();
                  forwardTo(ROUTE_LINKS.Transfer);
                }}
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
