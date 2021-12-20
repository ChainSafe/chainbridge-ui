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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
exports.__esModule = true;
exports.useExplorer = exports.ExplorerProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var ExplorerService_1 = require("../../services/ExplorerService");
var DEFAULT_PAGINATION_OPTIONS = { first: "10" };
var ExplorerContext = react_1["default"].createContext(undefined);
var ExplorerProvider = function (_a) {
    var children = _a.children;
    var chains = window.__RUNTIME_CONFIG__.CHAINBRIDGE.chains;
    var _b = __read((0, react_1.useState)({
        isLoading: false,
        transfers: [],
        error: false,
        chains: chains
    }), 2), state = _b[0], setState = _b[1];
    (0, react_1.useEffect)(function () {
        (0, ExplorerService_1.fetchTransfers)(setState, state, DEFAULT_PAGINATION_OPTIONS);
    }, []);
    var loadMore = function (options) {
        return (0, ExplorerService_1.fetchTransfers)(setState, state, options);
    };
    return ((0, jsx_runtime_1.jsx)(ExplorerContext.Provider, __assign({ value: {
            explorerState: state,
            loadMore: loadMore,
            setExplorerStateContext: setState
        } }, { children: children }), void 0));
};
exports.ExplorerProvider = ExplorerProvider;
var useExplorer = function () {
    var context = (0, react_1.useContext)(ExplorerContext);
    if (context === undefined) {
        throw new Error("useExplorer must be called within a ExplorerProvider");
    }
    return context;
};
exports.useExplorer = useExplorer;
//# sourceMappingURL=ExplorerContext.js.map