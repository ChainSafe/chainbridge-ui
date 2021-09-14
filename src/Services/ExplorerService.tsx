import { Action, DepositRecord } from "../Contexts/Reducers/TransfersReducer";

const {
  __RUNTIME_CONFIG__: { INDEXER_URL },
} = window;

export const fetchTransfers = async (
  transferDistpach: React.Dispatch<Action>
): Promise<any> => {
  try {
    const response = await fetch(`${INDEXER_URL}/transfers`);
    const transfers: Array<DepositRecord> = await response.json();
    return transferDistpach({
      type: "fetchTransfers",
      payload: transfers,
    });
  } catch (error) {
    console.log("ERROR", error);
    return transferDistpach({
      type: "error",
    });
  }
};
