export type EvmHomeReducerState = {
  depositAmount: number | undefined;
  selectedToken: string;
  networkId: number;
  homeTransferTxHash: string;
};
export type EvmHomeReducerAction =
  | { type: "setDepositAmount"; depositAmount?: number }
  | { type: "setSelectedToken"; selectedToken: string }
  | { type: "setNetworkId"; networkId: number }
  | { type: "setHomeTransferTxHash"; homeTransferTxHash: string };

export function evmHomeReducer(
  state: EvmHomeReducerState,
  action: EvmHomeReducerAction
): EvmHomeReducerState {
  switch (action.type) {
    case "setDepositAmount":
      return { ...state, depositAmount: action.depositAmount };
    case "setSelectedToken":
      return { ...state, selectedToken: action.selectedToken };
    case "setNetworkId":
      return { ...state, networkId: action.networkId };
    case "setHomeTransferTxHash":
      return { ...state, homeTransferTxHash: action.homeTransferTxHash };
    default:
      return state;
  }
}
