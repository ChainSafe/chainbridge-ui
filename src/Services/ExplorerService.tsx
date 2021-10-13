import {
  DepositRecord,
  ExplorerState,
} from "../Contexts/Reducers/TransfersReducer";

export const fetchTransfers = async (
  setState: React.SetStateAction<any>,
  state: ExplorerState
): Promise<any> => {
  const {
    __RUNTIME_CONFIG__: { INDEXER_URL },
  } = window;
  try {
    const response = await fetch(`${INDEXER_URL}/transfers`);
    const transfers: Array<DepositRecord> = await response.json();
    setState({
      ...state,
      transfers,
    });
  } catch (error) {
    console.log("ERROR", error);
    setState({
      ...state,
      error: true,
    });
  }
};
