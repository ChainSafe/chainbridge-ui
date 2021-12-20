"use strict";
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
exports.getPriceCompatibility = exports.detectEIP1559MaxFeePerGas = exports.hasTokenSupplies = exports.getProvider = exports.isCelo = void 0;
var celo_ethers_wrapper_1 = require("@celo-tools/celo-ethers-wrapper");
var ethers_1 = require("ethers");
var chainbridge_contracts_1 = require("@chainsafe/chainbridge-contracts");
var Erc20DetailedFactory_1 = require("../../../Contracts/Erc20DetailedFactory");
var isCelo = function (networkId) {
    return [42220, 44787, 62320].includes(networkId !== null && networkId !== void 0 ? networkId : 0);
};
exports.isCelo = isCelo;
var getRpcProviderFromHttpUrl = function (url) {
    var urlInstance = new URL(url);
    if (urlInstance.username && urlInstance.password) {
        var urlInfo = {
            url: urlInstance.origin,
            user: urlInstance.username,
            password: urlInstance.password
        };
        return new ethers_1.ethers.providers.JsonRpcProvider(urlInfo);
    }
    return new ethers_1.ethers.providers.JsonRpcProvider(url);
};
function getProvider(destinationChainConfig) {
    var provider;
    if ((0, exports.isCelo)(destinationChainConfig === null || destinationChainConfig === void 0 ? void 0 : destinationChainConfig.networkId)) {
        provider = new celo_ethers_wrapper_1.CeloProvider(destinationChainConfig === null || destinationChainConfig === void 0 ? void 0 : destinationChainConfig.rpcUrl);
    }
    else if (destinationChainConfig === null || destinationChainConfig === void 0 ? void 0 : destinationChainConfig.rpcUrl.startsWith("wss")) {
        if (destinationChainConfig.rpcUrl.includes("infura")) {
            var parts = destinationChainConfig.rpcUrl.split("/");
            provider = new ethers_1.ethers.providers.InfuraWebSocketProvider(destinationChainConfig.networkId, parts[parts.length - 1]);
        }
        if (destinationChainConfig.rpcUrl.includes("alchemyapi")) {
            var parts = destinationChainConfig.rpcUrl.split("/");
            provider = new ethers_1.ethers.providers.AlchemyWebSocketProvider(destinationChainConfig.networkId, parts[parts.length - 1]);
        }
    }
    else {
        provider = getRpcProviderFromHttpUrl(destinationChainConfig === null || destinationChainConfig === void 0 ? void 0 : destinationChainConfig.rpcUrl);
    }
    return provider;
}
exports.getProvider = getProvider;
function hasTokenSupplies(destinationChain, token, amount) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var destinationToken, provider, erc20destinationToken, destinationErc20Handler, destinationErc20DHandlerInstance, isMintable, balanceTokens, erc20Decimals;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    destinationToken = destinationChain === null || destinationChain === void 0 ? void 0 : destinationChain.tokens.find(function (_token) { return _token.resourceId === token.resourceId; });
                    if (!(destinationToken &&
                        destinationChain !== undefined &&
                        destinationChain.type === "Ethereum")) return [3 /*break*/, 4];
                    provider = getProvider(destinationChain);
                    return [4 /*yield*/, provider.ready];
                case 1:
                    _b.sent();
                    erc20destinationToken = Erc20DetailedFactory_1.Erc20DetailedFactory.connect(destinationToken.address, provider);
                    destinationErc20Handler = destinationChain
                        .erc20HandlerAddress;
                    destinationErc20DHandlerInstance = chainbridge_contracts_1.Erc20HandlerFactory.connect(destinationErc20Handler, provider);
                    return [4 /*yield*/, destinationErc20DHandlerInstance._burnList(destinationToken.address)];
                case 2:
                    isMintable = _b.sent();
                    if (isMintable) {
                        console.log("token mintable on destination chain");
                        return [2 /*return*/, true];
                    }
                    return [4 /*yield*/, erc20destinationToken.balanceOf(destinationErc20Handler)];
                case 3:
                    balanceTokens = _b.sent();
                    erc20Decimals = (_a = destinationToken.decimals) !== null && _a !== void 0 ? _a : destinationChain.decimals;
                    if (Number(ethers_1.utils.formatUnits(balanceTokens, erc20Decimals)) < amount) {
                        console.log("Not enough token balance on destination chain!");
                        return [2 /*return*/, false];
                    }
                    return [2 /*return*/, true];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.hasTokenSupplies = hasTokenSupplies;
function detectEIP1559MaxFeePerGas(provider) {
    return __awaiter(this, void 0, void 0, function () {
        var feeData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, provider.getFeeData()];
                case 1:
                    feeData = _a.sent();
                    if (typeof feeData.maxFeePerGas !== "undefined") {
                        return [2 /*return*/, true];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.warn(error_1);
                    console.warn("Can't access fee data for EIP-1559, fallback to legacy transaction");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, false];
            }
        });
    });
}
exports.detectEIP1559MaxFeePerGas = detectEIP1559MaxFeePerGas;
function getPriceCompatibility(provider, homeChainConfig, gasPrice) {
    return __awaiter(this, void 0, void 0, function () {
        var gasPriceCompatibility, hasMaxPrice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    gasPriceCompatibility = undefined;
                    if (!provider) return [3 /*break*/, 2];
                    return [4 /*yield*/, detectEIP1559MaxFeePerGas(provider)];
                case 1:
                    hasMaxPrice = _a.sent();
                    if (!hasMaxPrice) {
                        gasPriceCompatibility = ethers_1.BigNumber.from(ethers_1.utils.parseUnits((homeChainConfig.defaultGasPrice || gasPrice).toString(), 9)).toString();
                    }
                    _a.label = 2;
                case 2: return [2 /*return*/, gasPriceCompatibility];
            }
        });
    });
}
exports.getPriceCompatibility = getPriceCompatibility;
//# sourceMappingURL=helpers.js.map