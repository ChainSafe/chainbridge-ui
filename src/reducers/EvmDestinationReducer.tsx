export type EvmDestinationReducerState = {
  transferTxHash: string;
  depositVotes: number;
};
export type EvmDestinationReducerAction =
  | { type: "setTransferTxHash"; transferTxHash: string }
  | { type: "setDepositVotes"; depositVotes: number };

export function evmDestinationReducer(
  state: EvmDestinationReducerState,
  action: EvmDestinationReducerAction
): EvmDestinationReducerState {
  switch (action.type) {
    case "setTransferTxHash":
      return { ...state, transferTxHash: action.transferTxHash };
    case "setDepositVotes":
      return { ...state, depositVotes: action.depositVotes };
    default:
      return state;
  }
}
