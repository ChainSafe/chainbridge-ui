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
exports.localWeb3ContextReducer = void 0;
var localWeb3ContextReducer = function (state, action) {
    var _a, _b;
    switch (action.type) {
        case "addToken":
            return __assign(__assign({}, state), { tokens: __assign(__assign({}, state.tokens), (_a = {}, _a[action.payload.id] = __assign({}, action.payload.token), _a)) });
        case "updateTokenBalanceAllowance":
            return __assign(__assign({}, state), { tokens: __assign(__assign({}, state.tokens), (_b = {}, _b[action.payload.id] = __assign(__assign({}, state.tokens[action.payload.id]), { balance: action.payload.balance, balanceBN: action.payload.balanceBN, spenderAllowance: action.payload.spenderAllowance }), _b)) });
        case "resetTokens":
            return __assign(__assign({}, state), { tokens: {} });
        case "setAddress":
            return __assign(__assign({}, state), { address: action.payload });
        case "setBalance":
            return __assign(__assign({}, state), { ethBalance: action.payload });
        case "setIsReady":
            return __assign(__assign({}, state), { isReady: action.payload });
        case "setWallet":
            return __assign(__assign({}, state), { wallet: action.payload });
        case "setProvider":
            return __assign(__assign({}, state), { provider: action.payload });
        case "setNetwork":
            return __assign(__assign({}, state), { network: action.payload });
        case "setOnBoard":
            return __assign(__assign({}, state), { onboard: action.payload });
        default:
            return state;
    }
};
exports.localWeb3ContextReducer = localWeb3ContextReducer;
//# sourceMappingURL=localWeb3Reducer.js.map