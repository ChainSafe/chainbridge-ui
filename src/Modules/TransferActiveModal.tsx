import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import {
  Button,
  NavLink,
  ProgressBar,
  Typography,
} from "@chainsafe/common-components";
import ExclamationCircleSvg from "./../media/Icons/exclamation-mark-icon.png";
import CustomModal from "../Components/Custom/CustomModal";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import { EvmBridgeConfig, SubstrateBridgeConfig } from "../chainbridgeConfig";
import { styles } from "../Constants/constants";

const useStyles = makeStyles(
  ({ animation, constants, palette, typography }: ITheme) =>
    createStyles({
      root: {
        width: "100%",
        font: styles.primaryFont,
      },
      inner: {
        width: "100% !important",
        maxWidth: "unset !important",
        display: "flex",
        flexDirection: "row",
        padding: `${constants.generalUnit * 2}px ${
          constants.generalUnit * 2
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
        fontSize: 20,
        marginLeft: constants.generalUnit * 1.5,
        fontWeight: "bold",
        fontFamily: styles.primaryFont,
      },
      stepIndicator: {
        ...typography.h4,
        height: 40,
        width: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        background:
          "linear-gradient(105.79deg, #A700E1 1.84%, #0024E2 102.94%)",
        "& svg": {
          height: 20,
          width: 20,
          display: "block",
        },
      },
      content: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
      },
      buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        background:
          "linear-gradient(105.79deg, #A700E1 1.84%, #0024E2 102.94%)",
        borderRadius: constants.generalUnit / 2,
        minHeight: constants.generalUnit * 4,
        marginTop: constants.generalUnit * 2,
        "& > *": {
          textDecoration: "none",
          marginRight: constants.generalUnit,
        },
        "& > button[disabled]": {
          background: "none!important",
        },
      },
      button: {
        border: "none",
        color: "white",
        fontWeight: "bold",
        textDecoration: "none",
        "&:hover": {
          background: "none",
          color: "white",
        },
        "&:focus": {
          background: "none",
          color: "white",
        },
      },
      initCopy: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontSize: 14,
        marginLeft: constants.generalUnit * 6.25,
        color: styles.greyColor,
        lineHeight: `${constants.generalUnit * 3}px`,
        fontFamily: styles.secondaryFont,
        marginBottom: constants.generalUnit * 2,
        "& > *:first-child": {
          marginTop: constants.generalUnit * 3,
          marginBottom: constants.generalUnit * 5,
        },
      },
      sendingCopy: {
        color: styles.greyColor,
        lineHeight: `${constants.generalUnit * 3}px`,
        fontFamily: styles.secondaryFont,
        marginLeft: constants.generalUnit * 6.25,
        marginBottom: constants.generalUnit * 2,
        fontSize: 14,
        "& > div:first-child": {
          fontSize: 14,
          marginTop: constants.generalUnit * 3,
        },
      },
      vote: {
        display: "flex",
        flexDirection: "row",
        marginBottom: constants.generalUnit,
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
        color: styles.greyColor,
        lineHeight: `${constants.generalUnit * 3}px`,
        fontFamily: styles.secondaryFont,
        marginTop: constants.generalUnit * 3,
        marginLeft: constants.generalUnit * 6.5,
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
            background: `linear-gradient(105.79deg, #A700E1 1.84%, #0024E2 102.94%) !important`,
          },
        },
      },
      title: {
        display: "flex",
        alignContent: "center",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: constants.generalUnit * 3,
        marginBottom: constants.generalUnit * 2,
      },
      exclamation: {
        height: constants.generalUnit * 3.75,
        width: constants.generalUnit * 3.75,
      },
      footer: {
        color: styles.primaryTextColor,
        fontSize: 12,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: constants.generalUnit * 3,
        fontFamily: styles.secondaryFont,
        fontStyle: "normal",
        fontWeight: "bold",
      },
      footerText: {
        color: styles.primaryTextColor,
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "bold",
      },
      messageBlock: {
        lineHeight: `${constants.generalUnit * 3.5}px`,
      },
    })
);

interface ITransferActiveModalProps {
  open: boolean;
  close: () => void;
}

const TransferActiveModal: React.FC<ITransferActiveModalProps> = ({
  open,
  close,
}: ITransferActiveModalProps) => {
  const classes = useStyles();
  const {
    transactionStatus,
    depositVotes,
    relayerThreshold,
    inTransitMessages,
    homeConfig,
    destinationChainConfig,
    depositAmount,
    homeTransferTxHash,
    transferTxHash,
    selectedToken,
    tokens,
  } = useChainbridge();
  const tokenSymbol = selectedToken && tokens[selectedToken]?.symbol;
  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={open}
    >
      <ProgressBar
        className={classes.progress}
        size="small"
        variant="primary"
        progress={transactionStatus !== "Transfer Completed" ? -1 : 100}
      />
      <div className={classes.content}>
        <div className={classes.title}>
          <div className={classes.stepIndicator}>
            {transactionStatus === "Initializing Transfer" ? (
              "1"
            ) : transactionStatus === "In Transit" ? (
              "2"
            ) : transactionStatus === "Transfer Completed" ? (
              "3"
            ) : (
              <img
                src={ExclamationCircleSvg}
                alt="Exclamation"
                className={classes.exclamation}
              />
            )}
          </div>
          <Typography className={classes.heading} variant="h3" component="h3">
            {transactionStatus === "Initializing Transfer"
              ? "Initializing Transfer"
              : transactionStatus === "In Transit"
              ? `In Transit (${
                  depositVotes < (relayerThreshold || 0)
                    ? `${depositVotes}/${relayerThreshold} signatures needed`
                    : "Executing proposal"
                })`
              : transactionStatus === "Transfer Completed"
              ? "Transfer completed"
              : "Transfer aborted"}
          </Typography>
        </div>
        {transactionStatus === "Initializing Transfer" ? (
          <div className={classes.initCopy}>
            <Typography>Deposit pending...</Typography>
            <div>
              This should take a few minutes. <br />
              <strong> Please do not refresh or leave the page.</strong>
            </div>
          </div>
        ) : transactionStatus === "In Transit" ? (
          <div className={classes.sendingCopy}>
            {inTransitMessages.map((m, i) => {
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
            <div className={classes.messageBlock}>
              This should take a few minutes. <br />
              <strong> Please do not refresh or leave the page.</strong>
            </div>
            <section className={classes.buttons}>
              <Button
                onClick={() =>
                  homeTransferTxHash &&
                  window.open(
                    `${
                      (homeConfig as SubstrateBridgeConfig).blockExplorer
                    }/${homeTransferTxHash}`,
                    "_blank"
                  )
                }
                size="small"
                className={classes.button}
                variant="outline"
                disabled={
                  !homeConfig ||
                  !(homeConfig as SubstrateBridgeConfig).blockExplorer ||
                  !homeTransferTxHash
                }
              >
                View home chain transaction
              </Button>
            </section>
          </div>
        ) : transactionStatus === "Transfer Completed" ? (
          <>
            <Typography className={classes.receipt} component="p">
              Successfully transferred{" "}
              <strong>
                {depositAmount} {tokenSymbol}
                <br /> from {homeConfig?.name} to {destinationChainConfig?.name}
                .
              </strong>
            </Typography>
            <section className={classes.buttons}>
              <Button
                onClick={() =>
                  homeTransferTxHash &&
                  window.open(
                    `${
                      (homeConfig as SubstrateBridgeConfig).blockExplorer
                    }/${homeTransferTxHash}`,
                    "_blank"
                  )
                }
                size="small"
                className={classes.button}
                variant="outline"
                disabled={
                  !homeConfig ||
                  !(homeConfig as SubstrateBridgeConfig).blockExplorer ||
                  !homeTransferTxHash
                }
              >
                View home chain transaction
              </Button>
            </section>
            <section className={classes.buttons}>
              <Button
                onClick={() =>
                  destinationChainConfig &&
                  (destinationChainConfig as EvmBridgeConfig).blockExplorer &&
                  transferTxHash &&
                  window.open(
                    `${
                      (destinationChainConfig as EvmBridgeConfig).blockExplorer
                    }/${transferTxHash}`,
                    "_blank"
                  )
                }
                size="small"
                className={classes.button}
                variant="outline"
                disabled={
                  !destinationChainConfig ||
                  !(destinationChainConfig as EvmBridgeConfig).blockExplorer ||
                  !transferTxHash
                }
              >
                View destination chain transaction
              </Button>
            </section>
            <section className={classes.buttons}>
              <Button
                size="small"
                className={classes.button}
                variant="outline"
                onClick={close}
              >
                Start new transfer
              </Button>
            </section>
          </>
        ) : (
          <>
            <Typography className={classes.receipt} component="p">
              Something went wrong and we could not complete your transfer.
            </Typography>
            <section>
              <div className={classes.buttons}>
                <Button
                  size="small"
                  className={classes.button}
                  variant="outline"
                  onClick={close}
                >
                  Start new transfer
                </Button>
              </div>
              <div className={classes.footer}>
                <NavLink
                  style={{ textDecoration: "none" }}
                  className={classes.footerText}
                  to={{ pathname: process.env.REACT_APP_SUPPORT_URL }}
                  target="_blank"
                >
                  Ask a question on {process.env.REACT_APP_SUPPORT_SERVICE}
                </NavLink>
              </div>
            </section>
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default TransferActiveModal;
