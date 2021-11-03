import {
  DepositRecord,
  ExplorerState,
  PageInfo,
} from "../Contexts/Reducers/TransfersReducer";

const {
  __RUNTIME_CONFIG__: { INDEXER_URL },
} = window;

export const fetchTransfers = async (
  setState: React.SetStateAction<any>,
  state: ExplorerState,
  options?: {
    first?: string;
    last?: string;
    before?: string;
    after?: string;
  }
): Promise<any> => {
  try {
    setState({
      ...state,
      isLoading: true,
    });
    // @ts-ignore
    const params = new URLSearchParams(options).toString();

    const response = await fetch(`${INDEXER_URL}/transfers?${params}`);
    const responseParsed = await response.json();
    const transfers: Array<DepositRecord> = responseParsed.transfers;
    const pageInfo: PageInfo = responseParsed.pageInfo;
    setState({
      ...state,
      isLoading: false,
      transfers,
      pageInfo,
    });
  } catch (error) {
    console.log("ERROR", error);
    setState({
      ...state,
      error: true,
      isLoading: false,
    });
  }
};

export const fetchTransaction = async (
  txHash: string,
  setState: React.SetStateAction<any>
) => {
  try {
    const response = await fetch(
      `${INDEXER_URL}/transfers/byTransactionHash/${txHash}`
    );
    const responseParsed = await response.json();
    setState(responseParsed);
  } catch (error) {
    console.error("Error getting one transaction", error);
    return error;
  }
};
