import React from "react";

import { makeStyles, createStyles, ITheme } from "@imploy/common-themes";
import {
  Button,
  ExclamationCircleIcon,
  Typography,
} from "@imploy/common-components";
import CustomModal from "../Components/Custom/CustomModal";
import { useChainbridge } from "../Contexts/ChainbridgeContext";

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
        marginBottom: constants.generalUnit,
        whiteSpace: "nowrap",
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
          marginRight: constants.generalUnit,
        },
      },
      button: {
        borderColor: palette.additional["gray"][8],
        color: palette.additional["gray"][8],
        "&:hover": {
          borderColor: palette.additional["gray"][8],
          backgroundColor: palette.additional["gray"][8],
          color: palette.common.white.main,
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
      },
      receipt: {
        marginTop: constants.generalUnit * 3.5,
        marginBottom: constants.generalUnit * 8,
      },
    })
);

interface ITransactionActiveModalProps {
  open: boolean;
  close: () => void;
}

const TransactionActiveModal: React.FC<ITransactionActiveModalProps> = ({
  open,
  close,
}: ITransactionActiveModalProps) => {
  const classes = useStyles();
  const {
    transactionStatus,
    depositVotes,
    relayerThreshold,
    inTransitMessages,
    homeChain,
    destinationChain,
    depositAmount,
  } = useChainbridge();
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
          {transactionStatus === "Initializing Transfer" ? (
            "1"
          ) : transactionStatus === "In Transit" ? (
            "2"
          ) : transactionStatus === "Transfer Completed" ? (
            "3"
          ) : (
            <ExclamationCircleIcon />
          )}
        </div>
      </section>
      <section className={classes.content}>
        <Typography className={classes.heading} variant="h3" component="h3">
          {transactionStatus === "Initializing Transfer"
            ? "Initializing Transfer"
            : transactionStatus === "In Transit"
            ? `In Transit (${depositVotes}/${relayerThreshold} signatures needed)`
            : transactionStatus === "Transfer Completed"
            ? "Transfer completed"
            : "Transfer aborted"}
        </Typography>
        {transactionStatus === "Initializing Transfer" ? (
          <div className={classes.initCopy}>
            <Typography>Deposit pending...</Typography>
            <Typography>
              This should take a few minutes.
              <br />
              Please do not refresh or leave the page.
            </Typography>
          </div>
        ) : transactionStatus === "In Transit" ? (
          <div className={classes.sendingCopy}>
            {inTransitMessages.map((m, i) => (
              <Typography className={classes.vote} component="p" key={i}>
                {m}
              </Typography>
            ))}
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
                {depositAmount} <br /> from {homeChain?.name} to{" "}
                {destinationChain?.name}.
              </strong>
            </Typography>
            <section className={classes.buttons}>
              <Button
                onClick={close}
                size="small"
                className={classes.button}
                variant="outline"
                disabled
              >
                View transaction
              </Button>
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
            <section className={classes.buttons}>
              <Button
                size="small"
                className={classes.button}
                variant="outline"
                onClick={close}
              >
                Start new transfer
              </Button>
              <Button
                size="small"
                className={classes.button}
                variant="outline"
                onClick={() =>
                  window.open("https://discord.com/invite/n2U6x9c", "_blank")
                }
              >
                Ask question on Discord
              </Button>
            </section>
          </>
        )}
      </section>
    </CustomModal>
  );
};

export default TransactionActiveModal;
