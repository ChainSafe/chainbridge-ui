import React, { useEffect, useState } from "react";
import { useHistory } from "@chainsafe/common-components";
import { makeStyles, createStyles } from "@chainsafe/common-theme";
import { useExplorer } from "../../Contexts/ExplorerContext";
import TransferDetailView from "../Custom/TransferDetailView";
import { fetchTransaction } from "../../Services/ExplorerService";
import { computeTransferDetails } from "../../Utils/Helpers";
import {
  DepositRecord,
  TransferDetails,
} from "../../Contexts/Reducers/TransfersReducer";

const useStyles = makeStyles(() =>
  createStyles({
    transferDetailViewContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  })
);

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
