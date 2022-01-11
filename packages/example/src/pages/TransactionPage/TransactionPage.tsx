import React, { useEffect, useState } from "react";
import useInterval from "@use-it/interval";
import { useExplorer } from "@chainsafe/chainbridge-ui-core";
import { TransferDetailView } from "../../components";
import { fetchTransaction } from "@chainsafe/chainbridge-ui-core";
import { computeTransferDetails } from "../../utils/Helpers";
import {
  DepositRecord,
  TransferDetails,
} from "@chainsafe/chainbridge-ui-core";
import { useStyles } from "./styles";

const TransactionPage = () => {
  const {
    __RUNTIME_CONFIG__: {
      UI: { transactionAutoUpdateInterval },
    },
  } = window;
  const classes = useStyles();
  const explorerContext = useExplorer();
  const {
    explorerState: { chains },
  } = explorerContext;
  const [transaction, setTransaction] = useState<DepositRecord | undefined>();
  const [delay, setDelay] = useState<null | number>(
    transactionAutoUpdateInterval ?? 5000
  );
  const [
    transferDetailed,
    setTransferDetailed,
  ] = useState<TransferDetails | null>(null);
  const urlSplited = window.location.pathname.split("/");
  const txHash = urlSplited[urlSplited.length - 1];
  useEffect(() => {
    fetchTransaction(txHash, setTransaction);
  }, []);

  useInterval(() => {
    fetchTransaction(txHash, setTransaction);
    console.log("This will run every", transactionAutoUpdateInterval);
    console.log(transaction);
    if (transaction && (transaction.status === 3 || transaction.status === 4)) {
      console.log("transaction status", transaction.status);
      console.log("stopping requests");
      setDelay(null);
    }
  }, delay);

  useEffect(() => {
    if (transaction && Object.keys(transaction).length) {
      const txDetail = computeTransferDetails(
        transaction as DepositRecord,
        chains
      );
      setTransferDetailed(txDetail);
    }
  }, [transaction]);

  return (
    <div className={classes.transferDetailViewContainer}>
      {transferDetailed && (
        <TransferDetailView transferDetails={transferDetailed!} />
      )}
    </div>
  );
};

export default TransactionPage;
