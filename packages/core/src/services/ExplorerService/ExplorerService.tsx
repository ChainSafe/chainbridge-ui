import {
  DepositRecord,
  ExplorerState,
  PageInfo,
} from "../../reducers/TransfersReducer";

export const fetchTransfers = async (
  setState: React.SetStateAction<any>,
  state: ExplorerState,
  options?: {
    first?: string;
    last?: string;
    before?: string;
    after?: string;
  },
  filters?: {
    fromDomainId?: number;
    toDomainId?: number;
    depositTransactionHash?: string;
    fromAddress?: string;
    toAddress?: string;
  }
): Promise<any> => {
  const {
    __RUNTIME_CONFIG__: { INDEXER_URL },
  } = window;
  try {
    setState({
      ...state,
      isLoading: true,
    });
    const clearedParams = Object.entries({ ...options, ...filters }).filter(
      ([k, v]) => v !== undefined && v !== ""
    );
    // @ts-ignore
    const params = new URLSearchParams(clearedParams).toString();

    const response = await fetch(`${INDEXER_URL}/transfers/filters?${params}`);
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
  const {
    __RUNTIME_CONFIG__: { INDEXER_URL },
  } = window;
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
