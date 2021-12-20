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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useWeb3 = exports.LocalProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var bnc_onboard_1 = __importDefault(require("bnc-onboard"));
var ethers_1 = require("ethers");
var localNetworksHelpers_1 = require("../../utils/localNetworksHelpers");
var localWeb3Reducer_1 = require("./localWeb3Reducer");
var LocalProviderContext = react_1["default"].createContext(undefined);
var LocalProvider = function (_a) {
    var children = _a.children, tokensToWatch = _a.tokensToWatch, onboardConfig = _a.onboardConfig, _b = _a.cacheWalletSelection, cacheWalletSelection = _b === void 0 ? true : _b, networkIds = _a.networkIds, _c = _a.checkNetwork, checkNetwork = _c === void 0 ? (networkIds && networkIds.length > 0) || false : _c, spenderAddress = _a.spenderAddress;
    var _d = __read((0, react_1.useReducer)(localWeb3Reducer_1.localWeb3ContextReducer, {}), 2), state = _d[0], dispatcher = _d[1];
    (0, react_1.useEffect)(function () {
        var initializeOnboard = function (savedWallet) { return __awaiter(void 0, void 0, void 0, function () {
            var checks, provider, chainId, onboard_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        checks = [{ checkName: "accounts" }, { checkName: "connect" }];
                        if (networkIds && checkNetwork) {
                            checks.push({ checkName: "network" });
                        }
                        provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
                        return [4 /*yield*/, provider.getNetwork()];
                    case 1:
                        chainId = (_a.sent()).chainId;
                        try {
                            onboard_1 = (0, bnc_onboard_1["default"])(__assign(__assign({}, onboardConfig), { 
                                // networkId: networkIds ? networkIds[0] : 1, //Default to mainnet
                                networkId: chainId, walletCheck: checks, subscriptions: {
                                    address: function (address) {
                                        var _a, _b;
                                        dispatcher({
                                            type: "setAddress",
                                            payload: address
                                        });
                                        (0, localNetworksHelpers_1.checkIsReady)(onboard_1, dispatcher);
                                        return (((_a = onboardConfig === null || onboardConfig === void 0 ? void 0 : onboardConfig.subscriptions) === null || _a === void 0 ? void 0 : _a.address) &&
                                            ((_b = onboardConfig === null || onboardConfig === void 0 ? void 0 : onboardConfig.subscriptions) === null || _b === void 0 ? void 0 : _b.address(address)));
                                    },
                                    wallet: function (wallet) {
                                        var _a;
                                        if (wallet.provider) {
                                            wallet.name &&
                                                cacheWalletSelection &&
                                                localStorage.setItem("onboard.selectedWallet", wallet.name);
                                            dispatcher({
                                                type: "setWallet",
                                                payload: wallet
                                            });
                                            dispatcher({
                                                type: "setProvider",
                                                payload: new ethers_1.ethers.providers.Web3Provider(wallet.provider, "any")
                                            });
                                        }
                                        else {
                                            dispatcher({
                                                type: "setWallet",
                                                payload: undefined
                                            });
                                        }
                                        return (((_a = onboardConfig === null || onboardConfig === void 0 ? void 0 : onboardConfig.subscriptions) === null || _a === void 0 ? void 0 : _a.wallet) &&
                                            onboardConfig.subscriptions.wallet(wallet));
                                    },
                                    network: function (network) {
                                        var _a;
                                        if (!networkIds || networkIds.includes(network)) {
                                            onboard_1.config({ networkId: network });
                                        }
                                        wallet &&
                                            wallet.provider &&
                                            dispatcher({
                                                type: "setProvider",
                                                payload: new ethers_1.ethers.providers.Web3Provider(wallet.provider, "any")
                                            });
                                        dispatcher({
                                            type: "setNetwork",
                                            payload: network
                                        });
                                        // setNetwork(network);
                                        (0, localNetworksHelpers_1.checkIsReady)(onboard_1, dispatcher);
                                        return (((_a = onboardConfig === null || onboardConfig === void 0 ? void 0 : onboardConfig.subscriptions) === null || _a === void 0 ? void 0 : _a.network) &&
                                            onboardConfig.subscriptions.network(network));
                                    },
                                    balance: function (balance) {
                                        var _a;
                                        try {
                                            var bal = Number(ethers_1.utils.formatEther(balance));
                                            !isNaN(bal)
                                                ? dispatcher({ type: "setBalance", payload: bal })
                                                : dispatcher({ type: "setBalance", payload: 0 });
                                        }
                                        catch (error) {
                                            dispatcher({ type: "setBalance", payload: 0 });
                                        }
                                        return (((_a = onboardConfig === null || onboardConfig === void 0 ? void 0 : onboardConfig.subscriptions) === null || _a === void 0 ? void 0 : _a.balance) &&
                                            onboardConfig.subscriptions.balance(balance));
                                    }
                                } }));
                            cacheWalletSelection &&
                                savedWallet &&
                                onboard_1.walletSelect(savedWallet);
                            dispatcher({
                                type: "setOnBoard",
                                payload: onboard_1
                            });
                        }
                        catch (error) {
                            console.log("Error initializing onboard");
                            console.log(error);
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        var savedWallet = localStorage.getItem("onboard.selectedWallet");
        if (!savedWallet) {
            initializeOnboard("MetaMask");
        }
        else {
            initializeOnboard(savedWallet);
        }
    }, []);
    (0, react_1.useEffect)(function () {
        var networkTokens = (tokensToWatch && state.network && tokensToWatch[network]) || [];
        var tokenContracts = [];
        if (state.provider && state.address && networkTokens.length > 0) {
            (0, localNetworksHelpers_1.getTokenData)(networkTokens, dispatcher, state, spenderAddress);
        }
        return function () {
            if (tokenContracts.length > 0) {
                tokenContracts.forEach(function (tc) {
                    tc.removeAllListeners();
                });
                tokenContracts = [];
                dispatcher({ type: "resetTokens" });
            }
        };
    }, [state.network, state.provider, state.address]);
    var address = state.address, provider = state.provider, network = state.network, wallet = state.wallet, onboard = state.onboard, ethBalance = state.ethBalance, tokens = state.tokens, isReady = state.isReady, gasPrice = state.gasPrice;
    var onboardState;
    if (onboard !== undefined && "getState" in onboard) {
        onboardState = onboard === null || onboard === void 0 ? void 0 : onboard.getState();
    }
    return ((0, jsx_runtime_1.jsx)(LocalProviderContext.Provider, __assign({ value: {
            address: address,
            provider: provider,
            network: network,
            wallet: wallet,
            onboard: onboard,
            ethBalance: ethBalance,
            tokens: tokens,
            resetOnboard: localNetworksHelpers_1.resetOnboard,
            isReady: isReady,
            checkIsReady: localNetworksHelpers_1.checkIsReady,
            gasPrice: gasPrice,
            isMobile: !!(onboardState === null || onboardState === void 0 ? void 0 : onboardState.mobileDevice),
            signMessage: localNetworksHelpers_1.signMessage,
            refreshGasPrice: localNetworksHelpers_1.refreshGasPrice,
            dispatcher: dispatcher
        } }, { children: children }), void 0));
};
exports.LocalProvider = LocalProvider;
var useWeb3 = function () {
    var context = react_1["default"].useContext(LocalProviderContext);
    if (context === undefined) {
        throw new Error("useOnboard must be used within a OnboardProvider");
    }
    return context;
};
exports.useWeb3 = useWeb3;
//# sourceMappingURL=localWeb3Context.js.map