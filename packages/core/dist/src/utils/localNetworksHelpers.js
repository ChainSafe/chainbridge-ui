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
exports.signMessage = exports.getTokenData = exports.checkBalanceAndAllowance = exports.resetOnboard = exports.checkIsReady = exports.refreshGasPrice = void 0;
var Erc20DetailedFactory_1 = require("../Contracts/Erc20DetailedFactory");
var bignumber_js_1 = require("bignumber.js");
var ethers_1 = require("ethers");
var refreshGasPrice = function (dispatcher, ethGasStationApiKey, gasPriceSetting) { return __awaiter(void 0, void 0, void 0, function () {
    var gasPrice, ethGasStationResponse, etherchainResponse, newGasPrice, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                gasPrice = void 0;
                if (!ethGasStationApiKey) return [3 /*break*/, 3];
                return [4 /*yield*/, fetch("https://ethgasstation.info/api/ethgasAPI.json?api-key=".concat(ethGasStationApiKey))];
            case 1: return [4 /*yield*/, (_a.sent()).json()];
            case 2:
                ethGasStationResponse = _a.sent();
                gasPrice = ethGasStationResponse[gasPriceSetting] / 10;
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, fetch("https://www.etherchain.org/api/gasPriceOracle")];
            case 4: return [4 /*yield*/, (_a.sent()).json()];
            case 5:
                etherchainResponse = _a.sent();
                gasPrice = Number(etherchainResponse[gasPriceSetting]);
                _a.label = 6;
            case 6:
                newGasPrice = !isNaN(Number(gasPrice)) ? Number(gasPrice) : 65;
                //@ts-ignore
                dispatcher({ type: "setGasPrice", payload: newGasPrice });
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                console.log(error_1);
                console.log("Using 65 gwei as default");
                //@ts-ignore
                dispatcher({ type: "setGasPrice", payload: 65 });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.refreshGasPrice = refreshGasPrice;
var checkIsReady = function (onboard, dispatcher) { return __awaiter(void 0, void 0, void 0, function () {
    var isReady;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (onboard === null || onboard === void 0 ? void 0 : onboard.walletCheck())];
            case 1:
                isReady = _a.sent();
                dispatcher({
                    type: "setIsReady",
                    payload: !!isReady
                });
                if (!isReady) {
                    dispatcher({
                        type: "setBalance",
                        payload: 0
                    });
                }
                return [2 /*return*/, !!isReady];
        }
    });
}); };
exports.checkIsReady = checkIsReady;
var resetOnboard = function (dispatcher, onboard) {
    localStorage.setItem("onboard.selectedWallet", "");
    dispatcher({
        type: "setIsReady",
        payload: false
    });
    onboard === null || onboard === void 0 ? void 0 : onboard.walletReset();
};
exports.resetOnboard = resetOnboard;
var checkBalanceAndAllowance = function (token, decimals, dispatcher, address, spenderAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var bal, balance, balanceBN, spenderAllowance, _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                if (!address) return [3 /*break*/, 4];
                return [4 /*yield*/, token.balanceOf(address)];
            case 1:
                bal = _f.sent();
                balance = Number(ethers_1.utils.formatUnits(bal, decimals));
                balanceBN = new bignumber_js_1.BigNumber(bal.toString()).shiftedBy(-decimals);
                spenderAllowance = 0;
                if (!spenderAddress) return [3 /*break*/, 3];
                _a = Number;
                _c = (_b = ethers_1.utils).formatUnits;
                _e = (_d = ethers_1.BigNumber).from;
                return [4 /*yield*/, token.balanceOf(address)];
            case 2:
                spenderAllowance = _a.apply(void 0, [_c.apply(_b, [_e.apply(_d, [_f.sent()]),
                        decimals])]);
                _f.label = 3;
            case 3:
                dispatcher({
                    type: "updateTokenBalanceAllowance",
                    payload: {
                        id: token.address,
                        spenderAllowance: spenderAllowance,
                        balance: balance,
                        balanceBN: balanceBN
                    }
                });
                _f.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.checkBalanceAndAllowance = checkBalanceAndAllowance;
var getTokenData = function (networkTokens, dispatcher, state, spenderAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var tokenContracts;
    return __generator(this, function (_a) {
        tokenContracts = [];
        networkTokens.forEach(function (token) { return __awaiter(void 0, void 0, void 0, function () {
            var signer, tokenContract, newTokenInfo, tokenName, error_2, tokenSymbol, error_3, tokenDecimals, error_4, filterTokenApproval, filterTokenTransferFrom, filterTokenTransferTo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, state.provider.getSigner()];
                    case 1:
                        signer = _a.sent();
                        tokenContract = Erc20DetailedFactory_1.Erc20DetailedFactory.connect(token.address, signer);
                        newTokenInfo = {
                            decimals: 0,
                            balance: 0,
                            balanceBN: new bignumber_js_1.BigNumber(0),
                            imageUri: token.imageUri,
                            name: token.name,
                            symbol: token.symbol,
                            spenderAllowance: 0,
                            allowance: tokenContract.allowance,
                            approve: tokenContract.approve,
                            transfer: tokenContract.transfer
                        };
                        if (!!token.name) return [3 /*break*/, 5];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, tokenContract.name()];
                    case 3:
                        tokenName = _a.sent();
                        newTokenInfo.name = tokenName;
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.log("There was an error getting the token name. Does this contract implement ERC20Detailed?");
                        return [3 /*break*/, 5];
                    case 5:
                        if (!!token.symbol) return [3 /*break*/, 9];
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        return [4 /*yield*/, tokenContract.symbol()];
                    case 7:
                        tokenSymbol = _a.sent();
                        newTokenInfo.symbol = tokenSymbol;
                        return [3 /*break*/, 9];
                    case 8:
                        error_3 = _a.sent();
                        console.error("There was an error getting the token symbol. Does this contract implement ERC20Detailed?");
                        return [3 /*break*/, 9];
                    case 9:
                        _a.trys.push([9, 11, , 12]);
                        return [4 /*yield*/, tokenContract.decimals()];
                    case 10:
                        tokenDecimals = _a.sent();
                        newTokenInfo.decimals = tokenDecimals;
                        return [3 /*break*/, 12];
                    case 11:
                        error_4 = _a.sent();
                        console.error("There was an error getting the token decimals. Does this contract implement ERC20Detailed?");
                        return [3 /*break*/, 12];
                    case 12:
                        dispatcher({
                            type: "addToken",
                            payload: { id: token.address, token: newTokenInfo }
                        });
                        (0, exports.checkBalanceAndAllowance)(tokenContract, newTokenInfo.decimals, dispatcher, state.address, spenderAddress);
                        filterTokenApproval = tokenContract.filters.Approval(state.address, null, null);
                        filterTokenTransferFrom = tokenContract.filters.Transfer(state.address, null, null);
                        filterTokenTransferTo = tokenContract.filters.Transfer(null, state.address, null);
                        tokenContract.on(filterTokenApproval, function () {
                            return (0, exports.checkBalanceAndAllowance)(tokenContract, newTokenInfo.decimals, dispatcher, state.address, spenderAddress);
                        });
                        tokenContract.on(filterTokenTransferFrom, function () {
                            return (0, exports.checkBalanceAndAllowance)(tokenContract, newTokenInfo.decimals, dispatcher, state.address, spenderAddress);
                        });
                        tokenContract.on(filterTokenTransferTo, function () {
                            return (0, exports.checkBalanceAndAllowance)(tokenContract, newTokenInfo.decimals, dispatcher, state.address, spenderAddress);
                        });
                        tokenContracts.push(tokenContract);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.getTokenData = getTokenData;
var signMessage = function (message, provider) { return __awaiter(void 0, void 0, void 0, function () {
    var data, signer, addr, sig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!provider)
                    return [2 /*return*/, Promise.reject("The provider is not yet initialized")];
                data = ethers_1.ethers.utils.toUtf8Bytes(message);
                return [4 /*yield*/, provider.getSigner()];
            case 1:
                signer = _a.sent();
                return [4 /*yield*/, signer.getAddress()];
            case 2:
                addr = _a.sent();
                return [4 /*yield*/, provider.send("personal_sign", [
                        ethers_1.ethers.utils.hexlify(data),
                        addr.toLowerCase(),
                    ])];
            case 3:
                sig = _a.sent();
                return [2 /*return*/, sig];
        }
    });
}); };
exports.signMessage = signMessage;
//# sourceMappingURL=localNetworksHelpers.js.map