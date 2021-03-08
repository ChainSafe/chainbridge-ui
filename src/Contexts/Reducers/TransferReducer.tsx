export function transferReducer(
  transfers: {
    [depositNonce: number]: {
      fromChainId: number;
      fromNetworkName: string;
      toChainId: number;
      toNetworkName: string;
      timestamp: number;
      depositTransactionHash: string;
      depositBlockNumber: number;
    };
  },
  action: {
    type: "addTransfer";
    payload: {
      depositNonce: number;
      fromChainId: number;
      fromNetworkName: string;
      toChainId: number;
      toNetworkName: string;
      timestamp: number;
      depositTransactionHash: string;
      depositBlockNumber: number;
      resourceId: string;
    };
  }
) {
  switch (action.type) {
    case "addTransfer":
      return {
        ...transfers,
        [action.payload.depositNonce]: {
          ...action.payload,
        },
      };
    default:
      return transfers;
  }
}
