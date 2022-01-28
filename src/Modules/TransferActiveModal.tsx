import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import {
  Button,
  ExclamationCircleSvg,
  ProgressBar,
  Typography,
} from "@chainsafe/common-components";
import CustomModal from "../Components/Custom/CustomModal";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import { EvmBridgeConfig } from "../chainbridgeConfig";
import styles from "../Constants/constants";
import { TransactionStatus } from "../Contexts/NetworkManagerContext";

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
        marginTop: constants.generalUnit * 5,
        "& > *": {
          textDecoration: "none",
          marginRight: constants.generalUnit,
        },
      },
      button: {
        border: "none",
        color: "white",
        textDecoration: "none",
        "&:hover": {},
      },
      initCopy: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        "& > *:first-child": {
          marginTop: constants.generalUnit * 3,
          marginBottom: constants.generalUnit * 5,
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
              <ExclamationCircleSvg />
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
            <Typography className={classes.weighted}>
              This should take a few minutes.
              <br />
              Please do not refresh or leave the page.
            </Typography>
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
            <Typography className={classes.warning}>
              This should take a few minutes. <br />
              Please do not refresh or leave the page.
            </Typography>
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
              {/* <Button
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
                // disabled={
                //   !destinationChain ||
                //   !destinationChain.blockExplorer ||
                //   !transferTxHash
                // }
              >
                View transaction
              </Button> */}
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
            {/* {homeConfig &&
              (homeConfig as EvmBridgeConfig).blockExplorer &&
              transferTxHash && (
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
                  variant="outline"
                  disabled
                >
                  View transaction
                </Button>
              )} */}
            <section className={classes.buttons}>
              <Button
                size="small"
                className={classes.button}
                variant="outline"
                onClick={close}
              >
                Start new transfer
              </Button>
              <a
                rel="noopener noreferrer"
                href={process.env.REACT_APP_SUPPORT_URL}
                target="_blank"
              >
                <Button variant="outline">
                  Ask a question on {process.env.REACT_APP_SUPPORT_SERVICE}
                </Button>
              </a>
            </section>
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default TransferActiveModal;
