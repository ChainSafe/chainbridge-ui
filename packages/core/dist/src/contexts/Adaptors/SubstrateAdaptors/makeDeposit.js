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
var extension_dapp_1 = require("@polkadot/extension-dapp");
var ChainBridgeAPI_1 = require("../SubstrateApis/ChainBridgeAPI");
var makeDeposit = function (address, api, setTransactionStatus, setDepositAmount, homeChainConfig, setDepositNonce) {
    return function (amount, recipient, tokenAddress, destinationChainId) { return __awaiter(void 0, void 0, void 0, function () {
        var allAccounts, targetAccount, transferExtrinsic, injector;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(api && address)) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, extension_dapp_1.web3Accounts)()];
                case 1:
                    allAccounts = _a.sent();
                    targetAccount = allAccounts.find(function (item) { return item.address === address; });
                    if (!targetAccount) return [3 /*break*/, 3];
                    transferExtrinsic = (0, ChainBridgeAPI_1.submitDeposit)(api, amount, recipient, destinationChainId);
                    return [4 /*yield*/, (0, extension_dapp_1.web3FromSource)(targetAccount.meta.source)];
                case 2:
                    injector = _a.sent();
                    setTransactionStatus("Initializing Transfer");
                    setDepositAmount(amount);
                    transferExtrinsic
                        .signAndSend(address, { signer: injector.signer }, function (_a) {
                        var status = _a.status, events = _a.events;
                        status.isInBlock &&
                            console.log("Completed at block hash #".concat(status.isInBlock.toString()));
                        if (status.isFinalized) {
                            events.filter(function (_a) {
                                var event = _a.event;
                                return api.events[homeChainConfig
                                    .chainbridgePalletName].FungibleTransfer.is(event);
                            });
                            api.query[homeChainConfig
                                .chainbridgePalletName]
                                .chainNonces(destinationChainId)
                                .then(function (response) {
                                setDepositNonce("".concat(response.toJSON()));
                                setTransactionStatus("In Transit");
                            })["catch"](function (error) {
                                console.error(error);
                            });
                        }
                        else {
                            console.log("Current status: ".concat(status.type));
                        }
                    })["catch"](function (error) {
                        console.log(":( transaction failed", error);
                        setTransactionStatus("Transfer Aborted");
                    });
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
exports["default"] = makeDeposit;
//# sourceMappingURL=makeDeposit.js.map