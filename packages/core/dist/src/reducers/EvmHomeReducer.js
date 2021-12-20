"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.evmHomeReducer = void 0;
function evmHomeReducer(state, action) {
    switch (action.type) {
        case "setDepositAmount":
            return __assign(__assign({}, state), { depositAmount: action.depositAmount });
        case "setSelectedToken":
            return __assign(__assign({}, state), { selectedToken: action.selectedToken });
        case "setNetworkId":
            return __assign(__assign({}, state), { networkId: action.networkId });
        case "setHomeTransferTxHash":
            return __assign(__assign({}, state), { homeTransferTxHash: action.homeTransferTxHash });
        default:
            return state;
    }
}
exports.evmHomeReducer = evmHomeReducer;
//# sourceMappingURL=EvmHomeReducer.js.map