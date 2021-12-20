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
exports.evmDestinationReducer = void 0;
function evmDestinationReducer(state, action) {
    switch (action.type) {
        case "setTransferTxHash":
            return __assign(__assign({}, state), { transferTxHash: action.transferTxHash });
        case "setDepositVotes":
            return __assign(__assign({}, state), { depositVotes: action.depositVotes });
        default:
            return state;
    }
}
exports.evmDestinationReducer = evmDestinationReducer;
//# sourceMappingURL=EvmDestinationReducer.js.map