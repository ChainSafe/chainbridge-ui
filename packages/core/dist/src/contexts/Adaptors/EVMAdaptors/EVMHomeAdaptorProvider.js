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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.EVMHomeAdaptorProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var NetworkManagerContext_1 = require("../../NetworkManagerContext");
var HomeBridgeContext_1 = require("../../HomeBridgeContext");
var Helpers_1 = require("../../../utils/Helpers");
var index_1 = require("../../index");
var EvmHomeReducer_1 = require("../../../reducers/EvmHomeReducer");
var makeDeposit_1 = __importDefault(require("./makeDeposit"));
var makeWrappedToken_1 = __importDefault(require("./makeWrappedToken"));
var makeUnwrappedToken_1 = __importDefault(require("./makeUnwrappedToken"));
var makeHandleCheckSupplies_1 = __importDefault(require("./makeHandleCheckSupplies"));
var useSetBridgeSettingsHook_1 = require("./useSetBridgeSettingsHook");
var useConnectWallet_1 = require("./useConnectWallet");
var EVMHomeAdaptorProvider = function (_a) {
    var children = _a.children;
    var _b = (0, index_1.useWeb3)(), isReady = _b.isReady, network = _b.network, provider = _b.provider, gasPrice = _b.gasPrice, address = _b.address, tokens = _b.tokens, wallet = _b.wallet, checkIsReady = _b.checkIsReady, ethBalance = _b.ethBalance, onboard = _b.onboard, resetOnboard = _b.resetOnboard, dispatcher = _b.dispatcher;
    var _c = (0, NetworkManagerContext_1.useNetworkManager)(), homeChainConfig = _c.homeChainConfig, setTransactionStatus = _c.setTransactionStatus, setDepositNonce = _c.setDepositNonce, handleSetHomeChain = _c.handleSetHomeChain, homeChains = _c.homeChains;
    var _d = __read((0, react_1.useReducer)(EvmHomeReducer_1.evmHomeReducer, {
        depositAmount: undefined,
        selectedToken: "",
        networkId: 0,
        homeTransferTxHash: ""
    }), 2), evmHomeState = _d[0], dispatch = _d[1];
    var depositAmount = evmHomeState.depositAmount, networkId = evmHomeState.networkId, selectedToken = evmHomeState.selectedToken, homeTransferTxHash = evmHomeState.homeTransferTxHash;
    var setDepositAmount = function (depositAmount) {
        return dispatch({ type: "setDepositAmount", depositAmount: depositAmount });
    };
    var setSelectedToken = function (selectedToken) {
        return dispatch({ type: "setSelectedToken", selectedToken: selectedToken });
    };
    var setNetworkId = function (networkId) {
        return dispatch({ type: "setNetworkId", networkId: networkId });
    };
    var setHomeTransferTxHash = function (homeTransferTxHash) {
        return dispatch({ type: "setHomeTransferTxHash", homeTransferTxHash: homeTransferTxHash });
    };
    (0, react_1.useEffect)(function () {
        if (network) {
            var chain = homeChains.find(function (chain) { return chain.networkId === network; });
            setNetworkId(network);
            if (chain) {
                handleSetHomeChain(chain.domainId);
            }
        }
    }, [handleSetHomeChain, homeChains, network]);
    var _e = (0, useConnectWallet_1.useConnectWallet)(isReady, checkIsReady, dispatcher, onboard, homeChainConfig, provider, network), homeBridge = _e.homeBridge, wrapper = _e.wrapper, wrapTokenConfig = _e.wrapTokenConfig;
    var _f = __read((0, useSetBridgeSettingsHook_1.useSetBridgeSettingsHook)(homeBridge), 2), bridgeFee = _f[0], relayerThreshold = _f[1];
    var handleConnect = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(wallet && wallet.connect && network)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (onboard === null || onboard === void 0 ? void 0 : onboard.walletSelect("metamask"))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, wallet.connect()];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); }, [wallet, network, onboard]);
    var handleCheckSupplies = (0, makeHandleCheckSupplies_1["default"])(homeChainConfig);
    var deposit = (0, makeDeposit_1["default"])(setTransactionStatus, setDepositNonce, setHomeTransferTxHash, setDepositAmount, setSelectedToken, gasPrice, homeChainConfig, homeBridge, provider, address, bridgeFee);
    var wrapToken = (0, makeWrappedToken_1["default"])(gasPrice, homeChainConfig, wrapTokenConfig, wrapper, provider);
    var unwrapToken = (0, makeUnwrappedToken_1["default"])(gasPrice, homeChainConfig, wrapTokenConfig, wrapper, provider);
    return ((0, jsx_runtime_1.jsx)(HomeBridgeContext_1.HomeBridgeContext.Provider, __assign({ value: {
            connect: handleConnect,
            disconnect: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, resetOnboard(dispatcher, onboard)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); },
            getNetworkName: Helpers_1.getNetworkName,
            networkId: networkId,
            homeTransferTxHash: homeTransferTxHash,
            bridgeFee: bridgeFee,
            deposit: deposit,
            depositAmount: depositAmount,
            selectedToken: selectedToken,
            setDepositAmount: setDepositAmount,
            setSelectedToken: setSelectedToken,
            tokens: tokens,
            relayerThreshold: relayerThreshold,
            wrapTokenConfig: wrapTokenConfig,
            wrapper: wrapper,
            wrapToken: wrapToken,
            unwrapToken: unwrapToken,
            isReady: isReady,
            chainConfig: homeChainConfig,
            address: address,
            nativeTokenBalance: ethBalance,
            handleCheckSupplies: handleCheckSupplies
        } }, { children: children }), void 0));
};
exports.EVMHomeAdaptorProvider = EVMHomeAdaptorProvider;
//# sourceMappingURL=EVMHomeAdaptorProvider.js.map