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
exports.useNetworkManager = exports.NetworkManagerProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var chainbridgeConfig_1 = require("../../chainbridgeConfig");
var EVMAdaptors_1 = require("../Adaptors/EVMAdaptors");
var SubstrateAdaptors_1 = require("../Adaptors/SubstrateAdaptors");
var __1 = require("..");
var TransitMessageReducer_1 = require("../../reducers/TransitMessageReducer");
var NetworkManagerContext = react_1["default"].createContext(undefined);
function selectProvider(type, direction, props) {
    var _this = this;
    var noWalletHasChosenStates = [undefined, "unset", "select"];
    var typeKey = noWalletHasChosenStates.includes(type)
        ? "unset"
        : String(type).toLocaleLowerCase();
    var providers = {
        ethereum: {
            home: (0, jsx_runtime_1.jsx)(EVMAdaptors_1.EVMHomeAdaptorProvider, { children: props.children }, void 0),
            destination: ((0, jsx_runtime_1.jsx)(EVMAdaptors_1.EVMDestinationAdaptorProvider, { children: props.children }, void 0))
        },
        substrate: {
            home: ((0, jsx_runtime_1.jsx)(SubstrateAdaptors_1.SubstrateHomeAdaptorProvider, { children: props.children }, void 0)),
            destination: ((0, jsx_runtime_1.jsx)(SubstrateAdaptors_1.SubstrateDestinationAdaptorProvider, { children: props.children }, void 0))
        },
        unset: {
            home: ((0, jsx_runtime_1.jsx)(__1.HomeBridgeContext.Provider, __assign({ value: {
                    connect: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, undefined];
                    }); }); },
                    disconnect: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); }); },
                    getNetworkName: function (id) { return ""; },
                    isReady: false,
                    selectedToken: "",
                    deposit: function (amount, recipient, tokenAddress, destinationChainId) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, undefined];
                    }); }); },
                    setDepositAmount: function () { return undefined; },
                    tokens: {},
                    setSelectedToken: function (input) { return undefined; },
                    address: undefined,
                    bridgeFee: undefined,
                    chainConfig: undefined,
                    depositAmount: undefined,
                    nativeTokenBalance: undefined,
                    relayerThreshold: undefined,
                    wrapTokenConfig: undefined,
                    wrapper: undefined,
                    wrapToken: function (value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, ""];
                    }); }); },
                    unwrapToken: function (value) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, ""];
                    }); }); }
                } }, { children: props.children }), void 0)),
            destination: ((0, jsx_runtime_1.jsx)(__1.DestinationBridgeContext.Provider, __assign({ value: {
                    tokensDispatch: function () { return ""; },
                    depositVotes: 0,
                    setDepositVotes: function (input) { return ""; },
                    disconnect: function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); }); }
                } }, { children: props.children }), void 0))
        }
    };
    return providers[typeKey][direction];
}
var NetworkManagerProvider = function (_a) {
    var children = _a.children;
    var _b = __read((0, react_1.useState)("unset"), 2), walletType = _b[0], setWalletType = _b[1];
    console.log("🚀 ~ file: NetworkManagerContext.tsx ~ line 170 ~ walletType", walletType);
    var _c = __read((0, react_1.useState)(), 2), homeChainConfig = _c[0], setHomeChainConfig = _c[1];
    var _d = __read((0, react_1.useState)([]), 2), homeChains = _d[0], setHomeChains = _d[1];
    var _e = __read((0, react_1.useState)(), 2), destinationChainConfig = _e[0], setDestinationChain = _e[1];
    var _f = __read((0, react_1.useState)([]), 2), destinationChains = _f[0], setDestinationChains = _f[1];
    var _g = __read((0, react_1.useState)(undefined), 2), transactionStatus = _g[0], setTransactionStatus = _g[1];
    var _h = __read((0, react_1.useState)(undefined), 2), depositNonce = _h[0], setDepositNonce = _h[1];
    var _j = __read((0, react_1.useState)(0), 2), depositVotes = _j[0], setDepositVotes = _j[1];
    var _k = __read((0, react_1.useReducer)(TransitMessageReducer_1.transitMessageReducer, { txIsDone: false, transitMessage: [] }), 2), inTransitMessages = _k[0], tokensDispatch = _k[1];
    var handleSetHomeChain = (0, react_1.useCallback)(function (domainId) {
        if (!domainId && domainId !== 0) {
            setHomeChainConfig(undefined);
            return;
        }
        var chain = homeChains.find(function (c) { return c.domainId === domainId; });
        if (chain) {
            setHomeChainConfig(chain);
            setDestinationChains(chainbridgeConfig_1.chainbridgeConfig.chains.filter(function (bridgeConfig) {
                return bridgeConfig.domainId !== chain.domainId;
            }));
            if (chainbridgeConfig_1.chainbridgeConfig.chains.length === 2) {
                setDestinationChain(chainbridgeConfig_1.chainbridgeConfig.chains.find(function (bridgeConfig) {
                    return bridgeConfig.domainId !== chain.domainId;
                }));
            }
        }
    }, [homeChains, setHomeChainConfig]);
    (0, react_1.useEffect)(function () {
        if (walletType !== "unset") {
            if (walletType === "select") {
                console.log('setHomeChains', chainbridgeConfig_1.chainbridgeConfig.chains);
                setHomeChains(chainbridgeConfig_1.chainbridgeConfig.chains);
            }
            else {
                setHomeChains(chainbridgeConfig_1.chainbridgeConfig.chains.filter(function (bridgeConfig) { return bridgeConfig.type === walletType; }));
            }
        }
        else {
            setHomeChains([]);
        }
    }, [walletType]);
    var handleSetDestination = (0, react_1.useCallback)(function (domainId) {
        if (domainId === undefined) {
            setDestinationChain(undefined);
        }
        else if (homeChainConfig && !depositNonce) {
            var chain = destinationChains.find(function (c) { return c.domainId === domainId; });
            if (!chain) {
                throw new Error("Invalid destination chain selected");
            }
            setDestinationChain(chain);
        }
        else {
            throw new Error("Home chain not selected");
        }
    }, [depositNonce, destinationChains, homeChainConfig]);
    var HomeProvider = (0, react_1.useCallback)(function (props) {
        return selectProvider(walletType, "home", props);
    }, [walletType]);
    var DestinationProvider = (0, react_1.useCallback)(function (props) {
        return selectProvider(destinationChainConfig === null || destinationChainConfig === void 0 ? void 0 : destinationChainConfig.type, "destination", props);
    }, [destinationChainConfig === null || destinationChainConfig === void 0 ? void 0 : destinationChainConfig.type]);
    return ((0, jsx_runtime_1.jsx)(NetworkManagerContext.Provider, __assign({ value: {
            domainId: homeChainConfig === null || homeChainConfig === void 0 ? void 0 : homeChainConfig.domainId,
            homeChainConfig: homeChainConfig,
            setWalletType: setWalletType,
            walletType: walletType,
            homeChains: homeChains,
            destinationChains: destinationChains,
            handleSetHomeChain: handleSetHomeChain,
            setDestinationChain: handleSetDestination,
            destinationChainConfig: destinationChainConfig,
            transactionStatus: transactionStatus,
            setTransactionStatus: setTransactionStatus,
            depositNonce: depositNonce,
            setDepositNonce: setDepositNonce
        } }, { children: (0, jsx_runtime_1.jsx)(HomeProvider, { children: (0, jsx_runtime_1.jsx)(DestinationProvider, { children: children }, void 0) }, void 0) }), void 0));
};
exports.NetworkManagerProvider = NetworkManagerProvider;
var useNetworkManager = function () {
    var context = (0, react_1.useContext)(NetworkManagerContext);
    if (context === undefined) {
        throw new Error("useNetworkManager must be called within a HomeNetworkProvider");
    }
    return context;
};
exports.useNetworkManager = useNetworkManager;
//# sourceMappingURL=NetworkManagerContext.js.map