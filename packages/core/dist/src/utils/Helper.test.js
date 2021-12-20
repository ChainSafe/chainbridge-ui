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
var Helpers_1 = require("./Helpers");
var TestUtils_1 = require("./TestUtils");
describe("ComputeTransfersDetails", function () {
    it("should return one transfer with the details needed", function () {
        var expectedKeys = [
            "id",
            "formatedTransferDate",
            "fromAddress",
            "formatedAmount",
            "fromNetworkName",
            "toNetworkName",
            "depositTransactionHash",
            "fromDomainId",
            "toDomainId",
            "voteEvents",
            "proposalEvents",
            "proposalStatus",
            "timelineMessages",
            "fromChain",
            "toChain",
            "pillColorStatus",
        ];
        var transferDetails = (0, Helpers_1.computeTransferDetails)(TestUtils_1.testResponse.transfers[1], TestUtils_1.runtimeTestingConfig.CHAINBRIDGE.chains);
        var keys = Object.keys(transferDetails);
        expect(keys).toEqual(expectedKeys);
    });
    it("Should return timelineMessages with Transfer canceled, if proposal status is 4", function () {
        var transferDetails = (0, Helpers_1.computeTransferDetails)(TestUtils_1.canceledTransfer, TestUtils_1.runtimeTestingConfig.CHAINBRIDGE.chains);
        var _a = __read(transferDetails.timelineMessages, 4), head = _a[0], tail = _a[3];
        expect(tail.message).toBe("Transfer canceled");
    });
    it("Should return timelineMessages with Waiting for execution message if status is 2", function () {
        var tx = __assign(__assign({}, TestUtils_1.canceledTransfer), { status: 2 });
        var transferDetails = (0, Helpers_1.computeTransferDetails)(tx, TestUtils_1.runtimeTestingConfig.CHAINBRIDGE.chains);
        var _a = __read(transferDetails.timelineMessages, 4), head = _a[0], tail = _a[3];
        expect(tail.message).toBe("Waiting for execution");
    });
    it("Should return timelineMessages with Transfer executed message if status is 3", function () {
        var transferDetails = (0, Helpers_1.computeTransferDetails)(TestUtils_1.testResponse.transfers[1], TestUtils_1.runtimeTestingConfig.CHAINBRIDGE.chains);
        var timelineMessages = transferDetails.timelineMessages;
        var lastMessage = timelineMessages[timelineMessages.length - 1];
        var lengthOfVoteEvents = TestUtils_1.testResponse.transfers[1].voteEvents.length;
        expect(timelineMessages.length).toEqual(lengthOfVoteEvents + 5);
        expect(lastMessage.message.includes("Transfer executed")).toBe(true);
    });
    it("Should return Deposit submitted if proposalEvents and voteEvents are empty", function () {
        var tx = __assign(__assign({}, TestUtils_1.testResponse.transfers[1]), { status: 1, proposalEvents: [], voteEvents: [] });
        var transferDetails = (0, Helpers_1.computeTransferDetails)(tx, TestUtils_1.runtimeTestingConfig.CHAINBRIDGE.chains);
        var timelineMessages = transferDetails.timelineMessages;
        expect(timelineMessages[0].message).toBe("Deposit submitted");
    });
    it("Should return a Waiting for more votes as last message if there is one proposalEvent", function () {
        var tx = __assign(__assign({}, TestUtils_1.testResponse.transfers[1]), { status: 1, proposalEvents: [TestUtils_1.testResponse.transfers[1].proposalEvents[0]] });
        var transferDetails = (0, Helpers_1.computeTransferDetails)(tx, TestUtils_1.runtimeTestingConfig.CHAINBRIDGE.chains);
        var timelineMessages = transferDetails.timelineMessages;
        var lastMessage = timelineMessages[timelineMessages.length - 1];
        expect(lastMessage.message).toBe("Waiting for more votes");
    });
});
//# sourceMappingURL=Helper.test.js.map