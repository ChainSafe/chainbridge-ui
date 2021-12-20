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
var ethers_1 = require("ethers");
var util_crypto_1 = require("@polkadot/util-crypto");
var Erc20DetailedFactory_1 = require("../../../Contracts/Erc20DetailedFactory");
var chainbridgeConfig_1 = require("../../../chainbridgeConfig");
var helpers_1 = require("./helpers");
var makeDeposit = function (setTransactionStatus, setDepositNonce, setHomeTransferTxHash, setDepositAmount, setSelectedToken, gasPrice, homeChainConfig, homeBridge, provider, address, bridgeFee) {
    return function (amount, recipient, tokenAddress, destinationChainId) { return __awaiter(void 0, void 0, void 0, function () {
        var signer, destinationChain, token, erc20, erc20Decimals, data, gasPriceCompatibility, currentAllowance, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!homeChainConfig || !homeBridge) {
                        console.error("Home bridge contract is not instantiated");
                        return [2 /*return*/];
                    }
                    signer = provider === null || provider === void 0 ? void 0 : provider.getSigner();
                    if (!address || !signer) {
                        console.log("No signer");
                        return [2 /*return*/];
                    }
                    destinationChain = chainbridgeConfig_1.chainbridgeConfig.chains.find(function (c) { return c.domainId === destinationChainId; });
                    // TODO: create separate version for substrate
                    if ((destinationChain === null || destinationChain === void 0 ? void 0 : destinationChain.type) === "Substrate") {
                        recipient = "0x".concat(Buffer.from((0, util_crypto_1.decodeAddress)(recipient)).toString("hex"));
                    }
                    token = homeChainConfig.tokens.find(function (token) { return token.address === tokenAddress; });
                    if (!token) {
                        console.log("Invalid token selected");
                        return [2 /*return*/];
                    }
                    setTransactionStatus("Initializing Transfer");
                    setDepositAmount(amount);
                    setSelectedToken(tokenAddress);
                    erc20 = Erc20DetailedFactory_1.Erc20DetailedFactory.connect(tokenAddress, signer);
                    erc20Decimals = (_a = token.decimals) !== null && _a !== void 0 ? _a : homeChainConfig.decimals;
                    data = "0x" +
                        ethers_1.utils
                            .hexZeroPad(
                        // TODO Wire up dynamic token decimals
                        ethers_1.BigNumber.from(ethers_1.utils.parseUnits(amount.toString(), erc20Decimals)).toHexString(), 32)
                            .substr(2) + // Deposit Amount (32 bytes)
                        ethers_1.utils
                            .hexZeroPad(ethers_1.utils.hexlify((recipient.length - 2) / 2), 32)
                            .substr(2) + // len(recipientAddress) (32 bytes)
                        recipient.substr(2);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 12, , 13]);
                    return [4 /*yield*/, (0, helpers_1.getPriceCompatibility)(provider, homeChainConfig, gasPrice)];
                case 2:
                    gasPriceCompatibility = _b.sent();
                    return [4 /*yield*/, erc20.allowance(address, homeChainConfig.erc20HandlerAddress)];
                case 3:
                    currentAllowance = _b.sent();
                    console.log("🚀  currentAllowance", ethers_1.utils.formatUnits(currentAllowance, erc20Decimals));
                    if (!(Number(ethers_1.utils.formatUnits(currentAllowance, erc20Decimals)) < amount)) return [3 /*break*/, 9];
                    if (!(Number(ethers_1.utils.formatUnits(currentAllowance, erc20Decimals)) > 0 &&
                        token.isDoubleApproval)) return [3 /*break*/, 6];
                    return [4 /*yield*/, erc20.approve(homeChainConfig.erc20HandlerAddress, ethers_1.BigNumber.from(ethers_1.utils.parseUnits("0", erc20Decimals)), {
                            gasPrice: gasPriceCompatibility
                        })];
                case 4: 
                //We need to reset the user's allowance to 0 before we give them a new allowance
                //TODO Should we alert the user this is happening here?
                return [4 /*yield*/, (_b.sent()).wait(1)];
                case 5:
                    //We need to reset the user's allowance to 0 before we give them a new allowance
                    //TODO Should we alert the user this is happening here?
                    _b.sent();
                    _b.label = 6;
                case 6: return [4 /*yield*/, erc20.approve(homeChainConfig.erc20HandlerAddress, ethers_1.BigNumber.from(ethers_1.utils.parseUnits(amount.toString(), erc20Decimals)), {
                        gasPrice: gasPriceCompatibility
                    })];
                case 7: return [4 /*yield*/, (_b.sent()).wait(1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9:
                    // TODO do we really need once() here?
                    homeBridge.once(homeBridge.filters.Deposit(null, null, null, address, null, null), function (destinationDomainId, resourceId, depositNonce, user, data, handlerResponse, tx) {
                        setDepositNonce("".concat(depositNonce.toString()));
                        setTransactionStatus("In Transit");
                        setHomeTransferTxHash(tx.transactionHash);
                    });
                    return [4 /*yield*/, homeBridge.deposit(destinationChainId, token.resourceId, data, {
                            gasPrice: gasPriceCompatibility,
                            value: ethers_1.utils.parseUnits((bridgeFee || 0).toString(), 18)
                        })];
                case 10: return [4 /*yield*/, (_b.sent()).wait()];
                case 11:
                    _b.sent();
                    return [2 /*return*/, Promise.resolve()];
                case 12:
                    error_1 = _b.sent();
                    console.error(error_1);
                    setTransactionStatus("Transfer Aborted");
                    setSelectedToken(tokenAddress);
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    }); };
};
exports["default"] = makeDeposit;
//# sourceMappingURL=makeDeposit.js.map