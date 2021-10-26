import React, { useEffect, useState } from "react";
import { useHistory } from "@chainsafe/common-components";
import { useExplorer } from "../../Contexts/ExplorerContext";
import TransferDetailView from "../Custom/TransferDetailView";
import { fetchTransaction } from "../../Services/ExplorerService";
import { computeTransferDetails } from "../../Utils/Helpers";

const TransactionPage = () => {
  const { redirect } = useHistory();
  const [transaction, setTransaction] = useState({});
  useEffect(() => {
    if (!Object.keys(transaction).length) {
      console.log("window", window.location);
      const urlSplited = window.location.pathname.split("/");
      const txHash = urlSplited[urlSplited.length - 1];
      fetchTransaction(txHash, setTransaction);
    }

  }, [transaction]);


  return (
    <div>
      <TransferDetailView transferDetails={transaction!} />
    </div>
  );
};

export default TransactionPage;
