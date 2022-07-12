import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import { Button, NavLink, Typography } from "@chainsafe/common-components";
import CustomModal from "../Components/Custom/CustomModal";
import Step from "./../Components/Custom/Step";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import { EvmBridgeConfig, SubstrateBridgeConfig } from "../chainbridgeConfig";
import { styles } from "../Constants/constants";

const useStyles = makeStyles(({ animation, constants }: ITheme) =>
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
      padding: `${constants.generalUnit * 2}px ${constants.generalUnit * 2}px`,
      bottom: 0,
      top: "unset",
      transform: "unset",
      left: 0,
      border: "none",
      borderRadius: 0,
      transitionDuration: `${animation.transform}ms`,
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
      background: "linear-gradient(105.79deg, #A700E1 1.84%, #0024E2 102.94%)",
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
      },
    },
    receipt: {
      color: styles.greyColor,
      lineHeight: `${constants.generalUnit * 3}px`,
      fontFamily: styles.secondaryFont,
      marginTop: constants.generalUnit * 3,
      marginLeft: constants.generalUnit * 6.5,
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
      textDecoration: "none",
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
      <div className={classes.content}>
        {transactionStatus && transactionStatus !== "Transfer Aborted" ? (
          <>
            <Step
              title="Initializing Transfer"
              stepNumber={1}
              status={
                transactionStatus === "Initializing Transfer"
                  ? "progress"
                  : "done"
              }
            ></Step>
            <Step
              title="Transfer from source chain"
              stepNumber={2}
              status={
                transactionStatus === "Initializing Transfer"
                  ? "none"
                  : transactionStatus === "Transfer from Source"
                  ? "progress"
                  : "done"
              }
              stepLink={
                homeTransferTxHash
                  ? {
                      url: `${
                        (homeConfig as SubstrateBridgeConfig).blockExplorer
                      }/${homeTransferTxHash}`,
                      text: "Transaction Link",
                    }
                  : undefined
              }
            ></Step>
            <Step
              title="Transfer to destination chain"
              stepNumber={3}
              status={
                transactionStatus === "Initializing Transfer" ||
                transactionStatus === "Transfer from Source"
                  ? "none"
                  : transactionStatus === "Transfer to Destination "
                  ? "progress"
                  : "done"
              }
              stepLink={
                transferTxHash
                  ? {
                      url: `${
                        (destinationChainConfig as EvmBridgeConfig)
                          .blockExplorer
                      }/${transferTxHash}`,
                      text: "Transaction Link",
                    }
                  : undefined
              }
            ></Step>
          </>
        ) : (
          <Step title="Transfer Aborted" status="aborted"></Step>
        )}
        {transactionStatus === "Initializing Transfer" ||
        transactionStatus === "Transfer from Source" ||
        transactionStatus === "Transfer to Destination " ? (
          <div className={classes.initCopy}>
            <div>
              This should take a few minutes. <br />
              <strong> Please do not refresh or leave the page.</strong>
            </div>
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
