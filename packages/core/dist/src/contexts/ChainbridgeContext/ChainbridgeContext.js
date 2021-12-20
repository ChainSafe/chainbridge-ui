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
exports.__esModule = true;
exports.useChainbridge = exports.ChainbridgeProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var chainbridgeConfig_1 = require("../../chainbridgeConfig");
var NetworkManagerContext_1 = require("../NetworkManagerContext/NetworkManagerContext");
var HomeBridgeContext_1 = require("../HomeBridgeContext");
var DestinationBridgeContext_1 = require("../DestinationBridgeContext");
var ChainbridgeContext = react_1["default"].createContext(undefined);
var ChainbridgeProvider = function (_a) {
    var children = _a.children, chains = _a.chains;
    var _b = (0, NetworkManagerContext_1.useNetworkManager)(), handleSetHomeChain = _b.handleSetHomeChain, destinationChainConfig = _b.destinationChainConfig, setTransactionStatus = _b.setTransactionStatus, setDestinationChain = _b.setDestinationChain, setDepositNonce = _b.setDepositNonce, transactionStatus = _b.transactionStatus, depositNonce = _b.depositNonce, homeChainConfig = _b.homeChainConfig, destinationChains = _b.destinationChains, domainId = _b.domainId;
    var _c = (0, HomeBridgeContext_1.useHomeBridge)(), connect = _c.connect, setDepositAmount = _c.setDepositAmount, setSelectedToken = _c.setSelectedToken, chainConfig = _c.chainConfig, deposit = _c.deposit, relayerThreshold = _c.relayerThreshold, nativeTokenBalance = _c.nativeTokenBalance, address = _c.address, selectedToken = _c.selectedToken, bridgeFee = _c.bridgeFee, depositAmount = _c.depositAmount, isReady = _c.isReady, wrapTokenConfig = _c.wrapTokenConfig, tokens = _c.tokens, wrapToken = _c.wrapToken, unwrapToken = _c.unwrapToken, handleCheckSupplies = _c.handleCheckSupplies;
    var _d = (0, DestinationBridgeContext_1.useDestinationBridge)(), setDepositVotes = _d.setDepositVotes, tokensDispatch = _d.tokensDispatch;
    var resetDeposit = function () {
        chainbridgeConfig_1.chainbridgeConfig.chains.length > 2 && setDestinationChain(undefined);
        setTransactionStatus(undefined);
        setDepositNonce(undefined);
        setDepositVotes(0);
        setDepositAmount(undefined);
        tokensDispatch({
            type: "resetMessages"
        });
        setSelectedToken("");
    };
    var handleDeposit = (0, react_1.useCallback)(function (amount, recipient, tokenAddress) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(chainConfig && destinationChainConfig)) return [3 /*break*/, 2];
                    return [4 /*yield*/, deposit(amount, recipient, tokenAddress, destinationChainConfig.domainId)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/];
            }
        });
    }); }, [deposit, destinationChainConfig, chainConfig]);
    var checkSupplies = function (amount, tokenAddress, destinationChainId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(handleCheckSupplies && chainConfig && destinationChainConfig)) return [3 /*break*/, 2];
                    return [4 /*yield*/, handleCheckSupplies(amount, tokenAddress, destinationChainId)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsx)(ChainbridgeContext.Provider, __assign({ value: {
            homeConfig: homeChainConfig,
            connect: connect,
            destinationChains: destinationChains,
            handleSetHomeChain: handleSetHomeChain,
            setDestinationChain: setDestinationChain,
            resetDeposit: resetDeposit,
            deposit: handleDeposit,
            destinationChainConfig: destinationChainConfig,
            relayerThreshold: relayerThreshold,
            depositNonce: depositNonce,
            bridgeFee: bridgeFee,
            transactionStatus: transactionStatus,
            depositAmount: depositAmount,
            selectedToken: selectedToken,
            // TODO: Confirm if EVM specific
            wrapToken: wrapToken,
            wrapTokenConfig: wrapTokenConfig,
            unwrapToken: unwrapToken,
            isReady: isReady,
            nativeTokenBalance: nativeTokenBalance,
            tokens: tokens,
            address: address,
            domainId: domainId,
            checkSupplies: checkSupplies,
            chains: chains
        } }, { children: children }), void 0));
};
exports.ChainbridgeProvider = ChainbridgeProvider;
var useChainbridge = function () {
    var context = (0, react_1.useContext)(ChainbridgeContext);
    if (context === undefined) {
        throw new Error("useChainbridge must be called within a ChainbridgeProvider");
    }
    return context;
};
exports.useChainbridge = useChainbridge;
//# sourceMappingURL=ChainbridgeContext.js.map