import React from "react";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";

import ErrorIcon from "@mui/icons-material/Error";
import { CustomModal } from "../../components";
import {
  useDestinationBridge,
  useHomeBridge,
  useChainbridge,
  TransactionStatus,
} from "@chainsafe/chainbridge-ui-core";

import InitTransferBody from "./InitTransferBody";
import InTransitBody from "./InTransitBody";
import TransferCompleteBody from "./TransferCompleteBody";
import ErrorTransferBody from "./ErrorTransferBody";

import { useStyles } from "./styles";

interface ITransferActiveModalProps {
  open: boolean;
  close: () => void;
}

const getTransactionStateIndicator = (status?: TransactionStatus) => {
  const tranactionStatuses: { [key: string]: string | React.ReactNode } = {
    "Initializing Transfer": "1",
    "In Transit": "2",
    "Transfer Completed": "3",
    default: <ErrorIcon />,
  };
  if (!status) return tranactionStatuses["default"];

  return tranactionStatuses[status] || tranactionStatuses["default"];
};

const getTransactionStateHeader = (
  status?: TransactionStatus,
  depositVotes?: number,
  relayerThreshold?: number
) => {
  const tranactionStatuses: { [key: string]: string } = {
    "Initializing Transfer": "Initializing Transfer",
    "In Transit": `In Transit (${
      Number(depositVotes) < (relayerThreshold || 0)
        ? `${depositVotes}/${relayerThreshold} signatures needed`
        : "Executing proposal"
    })`,
    "Transfer Completed": "Transfer Completed",
    default: "Transfer aborted",
  };
  if (!status) return tranactionStatuses["default"];

  return tranactionStatuses[status] || tranactionStatuses["default"];
};

const TransferActiveModal: React.FC<ITransferActiveModalProps> = ({
  open,
  close,
}: ITransferActiveModalProps) => {
  const classes = useStyles();
  const {
    transactionStatus,
    relayerThreshold,
    homeConfig,
    destinationChainConfig,
    depositAmount,
    selectedToken,
    tokens,
  } = useChainbridge();
  const { homeTransferTxHash } = useHomeBridge();
  const { transferTxHash, depositVotes, inTransitMessages } =
    useDestinationBridge();
  const tokenSymbol = selectedToken && tokens[selectedToken]?.symbol;

  const getTransactionStateBody = (status?: TransactionStatus) => {
    const tranactionStatuses: { [key: string]: React.ReactNode } = {
      "Initializing Transfer": <InitTransferBody classes={classes} />,
      "In Transit": (
        <InTransitBody
          classes={classes}
          inTransitMessages={inTransitMessages}
          homeConfig={homeConfig}
          homeTransferTxHash={homeTransferTxHash}
        />
      ),
      "Transfer Completed": (
        <TransferCompleteBody
          classes={classes}
          close={close}
          homeConfig={homeConfig}
          homeTransferTxHash={homeTransferTxHash}
          depositAmount={depositAmount}
          tokenSymbol={tokenSymbol}
          destinationChainConfig={destinationChainConfig}
        />
      ),
      default: (
        <ErrorTransferBody
          classes={classes}
          close={close}
          homeConfig={homeConfig}
          homeTransferTxHash={homeTransferTxHash}
          transferTxHash={transferTxHash}
        />
      ),
    };
    if (!status) return tranactionStatuses["default"];

    return tranactionStatuses[status] || tranactionStatuses["default"];
  };

  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={open}
      closePosition="none"
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
        value={transactionStatus !== "Transfer Completed" ? -1 : 100}
      />
      <section>
        <div className={classes.stepIndicator}>
          {getTransactionStateIndicator(transactionStatus)}
        </div>
      </section>
      <section className={classes.content}>
        <Typography className={classes.heading} variant="h5" component="h5">
          {getTransactionStateHeader(
            transactionStatus,
            depositVotes,
            relayerThreshold
          )}
        </Typography>
        {getTransactionStateBody(transactionStatus)}
      </section>
    </CustomModal>
  );
};

export default React.memo(TransferActiveModal);
