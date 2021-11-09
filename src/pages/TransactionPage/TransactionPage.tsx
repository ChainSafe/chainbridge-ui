import React, { useEffect, useState } from "react";
import { useHistory } from "@chainsafe/common-components";
import { useExplorer } from "../../contexts";
import { TransferDetailView } from "../../components";
import { fetchTransaction } from "../../services/ExplorerService";
import { computeTransferDetails } from "../../utils/Helpers";
import {
  DepositRecord,
  TransferDetails,
} from "../../reducers/TransfersReducer";
import { useStyles } from "./styles";

const TransactionPage = () => {
  const { redirect } = useHistory();
  const classes = useStyles();
  const explorerContext = useExplorer();
  const {
    explorerState: { chains },
  } = explorerContext;
  const [transaction, setTransaction] = useState({});
  const [
    transferDetailed,
    setTransferDetailed,
  ] = useState<TransferDetails | null>(null);

  useEffect(() => {
    const urlSplited = window.location.pathname.split("/");
    const txHash = urlSplited[urlSplited.length - 1];
    fetchTransaction(txHash, setTransaction);
  }, []);

  useEffect(() => {
    if (Object.keys(transaction).length) {
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
