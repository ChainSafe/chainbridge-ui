"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.computeTransferDetails = exports.selectChains = exports.computeAndFormatAmount = exports.getColorSchemaTransferStatus = exports.getProposalStatus = exports.getRandomSeed = exports.formatAmount = exports.formatTransferDate = exports.selectToken = exports.getNetworkName = exports.isValidSubstrateAddress = exports.shortenAddress = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var ethers_1 = require("ethers");
var _a = require("@polkadot/keyring"), decodeAddress = _a.decodeAddress, encodeAddress = _a.encodeAddress;
var _b = require("@polkadot/util"), hexToU8a = _b.hexToU8a, isHex = _b.isHex;
var shortenAddress = function (address) {
    return "".concat(address.substr(0, 6), "...").concat(address.substr(address.length - 6, 6));
};
exports.shortenAddress = shortenAddress;
var isValidSubstrateAddress = function (address) {
    try {
        encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidSubstrateAddress = isValidSubstrateAddress;
var getNetworkName = function (id) {
    switch (Number(id)) {
        case 5:
            return "Localhost";
        case 1:
            return "Mainnet";
        case 3:
            return "Ropsten";
        case 4:
            return "Rinkeby";
        // case 5:
        //   return "Goerli";
        case 6:
            return "Kotti";
        case 42:
            return "Kovan";
        case 61:
            return "Ethereum Classic - Mainnet";
        case 42220:
            return "CELO - Mainnet";
        case 44787:
            return "CELO - Alfajores Testnet";
        case 62320:
            return "CELO - Baklava Testnet";
        default:
            return "Other";
    }
};
exports.getNetworkName = getNetworkName;
var selectToken = function (config, tokenAddress) { return config === null || config === void 0 ? void 0 : config.tokens.find(function (token) { return token.address === tokenAddress; }); };
exports.selectToken = selectToken;
var formatTransferDate = function (transferDate) {
    return transferDate ? (0, dayjs_1["default"])(transferDate * 1000).format("MMM D, h:mmA") : "";
};
exports.formatTransferDate = formatTransferDate;
var formatAmount = function (amount) {
    return ethers_1.ethers.utils.formatUnits(amount);
};
exports.formatAmount = formatAmount;
var getRandomSeed = function () {
    var arr = new Uint8Array(20);
    var randomValues = crypto.getRandomValues(arr);
    var randomString = Array.from(randomValues, function (val) {
        return val.toString(16).padStart(2, "0");
    }).join("");
    return randomString;
};
exports.getRandomSeed = getRandomSeed;
var getProposalStatus = function (status) {
    switch (status) {
        case 0:
            return "Inactive";
        case 1:
            return "Active";
        case 2:
            return "Passed";
        case 3:
            return "Executed";
        case 4:
            return "Cancelled";
        default:
            return "No status";
    }
};
exports.getProposalStatus = getProposalStatus;
var getColorSchemaTransferStatus = function (status) {
    //TODO: just for now we have passed and executed as provided in figma mockups
    switch (status) {
        case 1:
        case 2:
            return {
                borderColor: "#69C0FF",
                background: "#E6F7FF"
            };
        case 3:
            return {
                borderColor: "#389E0D",
                background: "#D9F7BE"
            };
        case 0:
        case 4:
            return {
                borderColor: "#FF4D4F",
                background: "#ff9a9b"
            };
        default:
            return {
                borderColor: "#548CA8",
                background: "#EEEEEE"
            };
    }
};
exports.getColorSchemaTransferStatus = getColorSchemaTransferStatus;
var computeAndFormatAmount = function (amount) {
    var amountParsed = parseInt(amount);
    var toBigInt = BigInt(amountParsed);
    var toBigNumber = ethers_1.BigNumber.from(toBigInt);
    return (0, exports.formatAmount)(toBigNumber);
};
exports.computeAndFormatAmount = computeAndFormatAmount;
var formatDateTimeline = function (date) { return (0, dayjs_1["default"])(date).format("h:mma"); };
var selectChains = function (chains, fromDomainId, toDomainId) {
    var fromChain = chains.find(function (chain) { return chain.domainId === fromDomainId; });
    var toChain = chains.find(function (chain) { return chain.domainId === toDomainId; });
    return { fromChain: fromChain, toChain: toChain };
};
exports.selectChains = selectChains;
var computeTransferDetails = function (txDetails, chains) {
    var timestamp = txDetails.timestamp, fromAddress = txDetails.fromAddress, proposalEvents = txDetails.proposalEvents, amount = txDetails.amount, fromNetworkName = txDetails.fromNetworkName, toNetworkName = txDetails.toNetworkName, depositTransactionHash = txDetails.depositTransactionHash, fromDomainId = txDetails.fromDomainId, toDomainId = txDetails.toDomainId, proposalStatus = txDetails.status, voteEvents = txDetails.voteEvents, id = txDetails.id;
    var _a = (0, exports.selectChains)(chains, fromDomainId, toDomainId), fromChain = _a.fromChain, toChain = _a.toChain;
    var formatedTransferDate = (0, exports.formatTransferDate)(timestamp);
    var formatedAmount = (0, exports.computeAndFormatAmount)(amount);
    var pillColorStatus = (0, exports.getColorSchemaTransferStatus)(proposalStatus);
    var timelineMessages = [];
    if (!proposalEvents.length && !voteEvents.length) {
        timelineMessages = [
            {
                message: "Deposit submitted",
                time: formatDateTimeline(timestamp)
            },
        ];
    }
    else {
        var votesMessages_1 = voteEvents.map(function (vote) { return ({
            message: "Confirmed by",
            time: formatDateTimeline(vote.timestamp),
            by: vote.by
        }); });
        switch (proposalEvents.length) {
            case 1: {
                var firstMessage = {
                    message: "Deposit submitted",
                    time: formatDateTimeline(proposalEvents[0].timestamp)
                };
                var createdBy = {
                    message: "Proposal created by",
                    time: formatDateTimeline(proposalEvents[0].timestamp),
                    by: proposalEvents[0].by
                };
                var waitingForMoreVotesMsg = {
                    message: "Waiting for more votes",
                    time: formatDateTimeline(proposalEvents[0].timestamp)
                };
                if (!voteEvents.length) {
                    timelineMessages = [
                        firstMessage,
                        createdBy,
                        waitingForMoreVotesMsg,
                    ];
                    break;
                }
                else {
                    timelineMessages = __spreadArray(__spreadArray([
                        firstMessage,
                        createdBy
                    ], __read(votesMessages_1), false), [
                        waitingForMoreVotesMsg,
                    ], false);
                    break;
                }
            }
            default: {
                timelineMessages = proposalEvents.reduce(function (acc, proposal, idx) {
                    if (idx === 0) {
                        acc = __spreadArray([
                            {
                                message: "Deposit submitted",
                                time: formatDateTimeline(proposal.timestamp)
                            },
                            {
                                message: "Proposal created by",
                                time: formatDateTimeline(proposal.timestamp),
                                by: proposalEvents[0].by
                            }
                        ], __read(votesMessages_1), false);
                        return acc;
                    }
                    if (proposalStatus === 4) {
                        acc = __spreadArray(__spreadArray([], __read(acc), false), [
                            {
                                message: "Proposal cancel by",
                                time: formatDateTimeline(proposal.timestamp),
                                by: proposalEvents[0].by
                            },
                            {
                                message: "Transfer canceled",
                                time: formatDateTimeline(proposal.timestamp)
                            },
                        ], false);
                        return acc;
                    }
                    else if (proposalStatus === 2) {
                        acc = __spreadArray(__spreadArray([], __read(acc), false), [
                            {
                                message: "Proposal passed by",
                                time: formatDateTimeline(proposal.timestamp),
                                by: proposalEvents[0].by
                            },
                            {
                                message: "Waiting for execution",
                                time: formatDateTimeline(proposal.timestamp)
                            },
                        ], false);
                        return acc;
                    }
                    else if (proposalStatus === 3 && proposal.proposalStatus === 3) {
                        acc = __spreadArray(__spreadArray([], __read(acc), false), [
                            {
                                message: "Proposal passed by",
                                time: formatDateTimeline(proposal.timestamp),
                                by: proposalEvents[0].by
                            },
                            {
                                message: "Proposal executed by",
                                time: formatDateTimeline(proposal.timestamp),
                                by: proposalEvents[0].by
                            },
                            {
                                message: "Transfer executed on ".concat(toChain === null || toChain === void 0 ? void 0 : toChain.name),
                                time: formatDateTimeline(proposal.timestamp)
                            },
                        ], false);
                        return acc;
                    }
                    return acc;
                }, []);
                break;
            }
        }
    }
    return {
        id: id,
        formatedTransferDate: formatedTransferDate,
        fromAddress: fromAddress,
        formatedAmount: formatedAmount,
        fromNetworkName: fromNetworkName,
        toNetworkName: toNetworkName,
        depositTransactionHash: depositTransactionHash,
        fromDomainId: fromDomainId,
        toDomainId: toDomainId,
        voteEvents: voteEvents,
        proposalEvents: proposalEvents,
        proposalStatus: proposalStatus,
        timelineMessages: timelineMessages,
        fromChain: fromChain,
        toChain: toChain,
        pillColorStatus: pillColorStatus
    };
};
exports.computeTransferDetails = computeTransferDetails;
//# sourceMappingURL=Helpers.js.map