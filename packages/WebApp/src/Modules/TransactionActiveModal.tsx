import React, { useState } from "react";

import { makeStyles, createStyles, ITheme } from "@imploy/common-themes";
import { Button, Typography } from "@imploy/common-components";
import CustomModal from "../Components/Custom/CustomModal";

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
        borderTop: `6px solid ${palette.additional["geekblue"][5]}`,
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
        color: palette.additional["geekblue"][6],
        border: `1px solid ${palette.additional["geekblue"][4]}`,
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

enum TRANSACTION_STATE {
  init = "init",
  inTransit = "inTransit",
  done = "done",
}

interface ISignature {
  address: string;
  signed: "pending" | "confirmed" | "rejected";
}

interface ITransactionActiveModalProps {
  open: boolean;
  close: () => void;
}

const TransactionActiveModal: React.FC<ITransactionActiveModalProps> = ({
  open,
  close,
}: ITransactionActiveModalProps) => {
  const classes = useStyles();

  const Quorum: number = 6;

  const [state, setState] = useState<TRANSACTION_STATE>(TRANSACTION_STATE.done);
  const [signatures, setSignatures] = useState<ISignature[]>([
    {
      address: "consmosasdasdasdasdasdasdasd3ex12",
      signed: "rejected",
    },
    {
      address: "c11111onsmosasdasdasdasdasdasdasd3ex12",
      signed: "pending",
    },
    {
      address: "consmoas22sasdasdasdasdasdasdasd3ex12",
      signed: "pending",
    },
    {
      address: "cons123123mosasdasdasdasdasdasdasd3ex12",
      signed: "rejected",
    },
    {
      address: "co11111nsmosasdasdasdasdasdasdasd3ex12",
      signed: "confirmed",
    },
    {
      address: "mmmconsmosasdasdasdasdasdasdasd3ex12",
      signed: "confirmed",
    },
  ]);

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
          {state === TRANSACTION_STATE.init
            ? "1"
            : state === TRANSACTION_STATE.inTransit
            ? "2"
            : "3  "}
        </div>
      </section>
      <section className={classes.content}>
        <Typography className={classes.heading} variant="h3" component="h3">
          {state === TRANSACTION_STATE.init
            ? "Initializing Transfer"
            : state === TRANSACTION_STATE.inTransit
            ? `In Transit (${
                signatures.filter((sig) => sig.signed === "confirmed").length
              }/${Quorum} signatures needed)`
            : "Transfer completed"}
        </Typography>
        {state === TRANSACTION_STATE.init ? (
          <div className={classes.initCopy}>
            <Typography>Deposit pending...</Typography>
            <Typography>
              This should take a few minutes.
              <br />
              Please do not refresh or leave the page.
            </Typography>
          </div>
        ) : state === TRANSACTION_STATE.inTransit ? (
          <div className={classes.sendingCopy}>
            <Typography>Proposal created on network name</Typography>
            {signatures.map((sig, index) => (
              <Typography className={classes.vote} component="p" key={index}>
                <span>Vote casted by {sig.address}</span>
                <span>
                  {sig.signed === "confirmed"
                    ? "Confirmed"
                    : sig.signed === "rejected"
                    ? "Rejected"
                    : null}
                </span>
              </Typography>
            ))}
            <Typography className={classes.warning}>
              This should take a few minutes. <br />
              Please do not refresh or leave the page.
            </Typography>
          </div>
        ) : (
          <>
            <Typography className={classes.receipt} component="p">
              Successfully transferred{" "}
              <strong>
                0.25 ETH <br /> from Home Network to DestinationName.
              </strong>
            </Typography>
            <section className={classes.buttons}>
              <Button
                onClick={close}
                size="small"
                className={classes.button}
                variant="outline"
              >
                View transaction
              </Button>
              <Button size="small" className={classes.button} variant="outline">
                Start new transfer
              </Button>
            </section>
          </>
        )}
      </section>
    </CustomModal>
  );
};

export default TransactionActiveModal;
