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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.SubstrateHomeAdaptorProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var HomeBridgeContext_1 = require("../../HomeBridgeContext");
var NetworkManagerContext_1 = require("../../NetworkManagerContext");
var ChainBridgeAPI_1 = require("../SubstrateApis/ChainBridgeAPI");
var types_1 = require("@polkadot/types");
var _1 = require("./");
var SubstrateHomeAdaptorProvider = function (_a) {
    var children = _a.children;
    var registry = new types_1.TypeRegistry();
    var _b = __read((0, react_1.useState)(), 2), api = _b[0], setApi = _b[1];
    var _c = __read((0, react_1.useState)(false), 2), isReady = _c[0], setIsReady = _c[1];
    var _d = __read((0, react_1.useState)([]), 2), accounts = _d[0], setAccounts = _d[1];
    var _e = __read((0, react_1.useState)(undefined), 2), address = _e[0], setAddress = _e[1];
    var _f = (0, NetworkManagerContext_1.useNetworkManager)(), homeChainConfig = _f.homeChainConfig, setTransactionStatus = _f.setTransactionStatus, setDepositNonce = _f.setDepositNonce, handleSetHomeChain = _f.handleSetHomeChain, homeChains = _f.homeChains;
    var _g = __read((0, react_1.useState)(undefined), 2), relayerThreshold = _g[0], setRelayerThreshold = _g[1];
    var _h = __read((0, react_1.useState)(0), 1), bridgeFee = _h[0];
    var _j = __read((0, react_1.useState)(), 2), depositAmount = _j[0], setDepositAmount = _j[1];
    var _k = __read((0, react_1.useState)("CSS"), 2), selectedToken = _k[0], setSelectedToken = _k[1];
    var _l = __read((0, react_1.useState)({}), 2), tokens = _l[0], setTokens = _l[1];
    (0, react_1.useEffect)(function () {
        // Attempt connect on load
        handleConnect();
    });
    var _m = __read((0, react_1.useState)(false), 2), initiaising = _m[0], setInitialising = _m[1];
    (0, react_1.useEffect)(function () {
        // Once the chain ID has been set in the network context, the homechain configuration will be automatically set thus triggering this
        if (!homeChainConfig || initiaising || api)
            return;
        setInitialising(true);
        (0, ChainBridgeAPI_1.createApi)(homeChainConfig.rpcUrl)
            .then(function (api) {
            setApi(api);
            setInitialising(false);
        })["catch"](console.error);
    }, [homeChainConfig, registry, api, initiaising]);
    var getRelayerThreshold = (0, react_1.useCallback)((0, _1.getRelayerThresholdFunc)(api, homeChainConfig, setRelayerThreshold), [api, homeChainConfig]);
    var confirmChainID = (0, react_1.useCallback)((0, _1.confirmChainIdFunc)(api, homeChainConfig, homeChains, handleSetHomeChain), [api, handleSetHomeChain, homeChainConfig, homeChains]);
    (0, react_1.useEffect)(function () {
        // For all constants & essential values like:
        // Relayer Threshold, resources IDs & Bridge Fees
        // It is recommended to collect state at this point
        if (api) {
            if (api.isConnected && homeChainConfig) {
                getRelayerThreshold();
                confirmChainID();
            }
        }
    }, [api, getRelayerThreshold, confirmChainID, homeChainConfig]);
    (0, react_1.useEffect)(function () {
        // Comment for the moment
        // if (!homeChainConfig || !address) return;
        var unsubscribe;
        if (api) {
            unsubscribe = (0, _1.queryData)(api, homeChainConfig, unsubscribe, setTokens, address);
        }
        return function () {
            unsubscribe && unsubscribe();
        };
    }, [api, address, homeChainConfig]);
    var selectAccount = (0, react_1.useCallback)(function (index) {
        setAddress(accounts[index].address);
    }, [accounts]);
    var handleConnect = (0, react_1.useCallback)((0, _1.handleConnectFunc)(isReady, setAccounts, selectAccount, handleSetHomeChain, homeChains), [isReady, handleSetHomeChain, homeChains]);
    (0, react_1.useEffect)(function () {
        // This is a simple check
        // The reason for having a isReady is that the UI can lazy load data from this point
        api === null || api === void 0 ? void 0 : api.isReady.then(function () { return setIsReady(true); });
    }, [api, setIsReady]);
    var deposit = (0, react_1.useCallback)((0, _1.makeDeposit)(address, api, setTransactionStatus, setDepositAmount, homeChainConfig, setDepositNonce), [api, setDepositNonce, setTransactionStatus, address, homeChainConfig]);
    // Required for adaptor however not needed for substrate
    var wrapToken = function (value) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, "Not implemented"];
        });
    }); };
    // Required for adaptor however not needed for substrate
    var unwrapToken = function (value) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, "Not implemented"];
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(HomeBridgeContext_1.HomeBridgeContext.Provider, __assign({ value: {
            connect: handleConnect,
            disconnect: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (api === null || api === void 0 ? void 0 : api.disconnect())];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            getNetworkName: function () { return (homeChainConfig === null || homeChainConfig === void 0 ? void 0 : homeChainConfig.name) || "undefined"; },
            bridgeFee: bridgeFee,
            deposit: deposit,
            depositAmount: depositAmount,
            selectedToken: selectedToken,
            setDepositAmount: setDepositAmount,
            setSelectedToken: setSelectedToken,
            tokens: tokens,
            relayerThreshold: relayerThreshold,
            wrapTokenConfig: undefined,
            wrapper: undefined,
            wrapToken: wrapToken,
            unwrapToken: unwrapToken,
            isReady: isReady,
            chainConfig: homeChainConfig,
            address: address,
            nativeTokenBalance: 0,
            accounts: accounts,
            selectAccount: selectAccount
        } }, { children: children }), void 0));
};
exports.SubstrateHomeAdaptorProvider = SubstrateHomeAdaptorProvider;
exports["default"] = exports.SubstrateHomeAdaptorProvider;
//# sourceMappingURL=SubstrateHomeAdaptorProvider.js.map