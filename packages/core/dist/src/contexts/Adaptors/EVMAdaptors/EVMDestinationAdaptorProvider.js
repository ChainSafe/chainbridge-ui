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
exports.EVMDestinationAdaptorProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var NetworkManagerContext_1 = require("../../NetworkManagerContext/NetworkManagerContext");
var DestinationBridgeContext_1 = require("../../DestinationBridgeContext");
var TransitMessageReducer_1 = require("../../../reducers/TransitMessageReducer");
var EvmDestinationReducer_1 = require("../../../reducers/EvmDestinationReducer");
var useDestinationBridgeHook_1 = require("./useDestinationBridgeHook");
var handleProposalEvent_1 = __importDefault(require("./handleProposalEvent"));
var handleProposalVote_1 = __importDefault(require("./handleProposalVote"));
var EVMDestinationAdaptorProvider = function (_a) {
    var children = _a.children;
    var _b = (0, NetworkManagerContext_1.useNetworkManager)(), depositNonce = _b.depositNonce, destinationChainConfig = _b.destinationChainConfig, homeChainConfig = _b.homeChainConfig, setTransactionStatus = _b.setTransactionStatus, transactionStatus = _b.transactionStatus;
    var _c = __read((0, react_1.useReducer)(EvmDestinationReducer_1.evmDestinationReducer, {
        transferTxHash: "",
        depositVotes: 0
    }), 2), state = _c[0], dispatch = _c[1];
    var transferTxHash = state.transferTxHash, depositVotes = state.depositVotes;
    var setTransferTxHash = function (transferTxHash) {
        return dispatch({ type: "setTransferTxHash", transferTxHash: transferTxHash });
    };
    var setDepositVotes = function (depositVotes) {
        return dispatch({ type: "setDepositVotes", depositVotes: depositVotes });
    };
    var _d = __read((0, react_1.useReducer)(TransitMessageReducer_1.transitMessageReducer, { txIsDone: false, transitMessage: [] }), 2), inTransitMessages = _d[0], tokensDispatch = _d[1];
    var destinationBridge = (0, useDestinationBridgeHook_1.useDestinationBridgeHook)(destinationChainConfig);
    (0, react_1.useEffect)(function () {
        if (destinationChainConfig &&
            (homeChainConfig === null || homeChainConfig === void 0 ? void 0 : homeChainConfig.domainId) !== null &&
            (homeChainConfig === null || homeChainConfig === void 0 ? void 0 : homeChainConfig.domainId) !== undefined &&
            destinationBridge &&
            depositNonce &&
            !inTransitMessages.txIsDone) {
            (0, handleProposalEvent_1["default"])(destinationBridge, homeChainConfig, depositNonce, destinationChainConfig, setTransactionStatus, setTransferTxHash, tokensDispatch);
            (0, handleProposalVote_1["default"])(destinationBridge, homeChainConfig, depositNonce, depositVotes, tokensDispatch, setDepositVotes, transactionStatus);
        }
        return function () {
            //@ts-ignore
            destinationBridge === null || destinationBridge === void 0 ? void 0 : destinationBridge.removeAllListeners();
        };
    }, [
        depositNonce,
        homeChainConfig,
        destinationBridge,
        depositVotes,
        destinationChainConfig,
        setDepositVotes,
        setTransactionStatus,
        setTransferTxHash,
        tokensDispatch,
    ]);
    return ((0, jsx_runtime_1.jsx)(DestinationBridgeContext_1.DestinationBridgeContext.Provider, __assign({ value: {
            transferTxHash: transferTxHash,
            depositVotes: depositVotes,
            setDepositVotes: setDepositVotes,
            inTransitMessages: inTransitMessages,
            tokensDispatch: tokensDispatch,
            disconnect: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); }); }
        } }, { children: children }), void 0));
};
exports.EVMDestinationAdaptorProvider = EVMDestinationAdaptorProvider;
//# sourceMappingURL=EVMDestinationAdaptorProvider.js.map