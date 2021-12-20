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
exports.__esModule = true;
exports.transfersReducer = exports.ProposalStatus = void 0;
var Helpers_1 = require("../utils/Helpers");
var ProposalStatus;
(function (ProposalStatus) {
    ProposalStatus[ProposalStatus["Inactive"] = 0] = "Inactive";
    ProposalStatus[ProposalStatus["Active"] = 1] = "Active";
    ProposalStatus[ProposalStatus["Passed"] = 2] = "Passed";
    ProposalStatus[ProposalStatus["Executed"] = 3] = "Executed";
    ProposalStatus[ProposalStatus["Cancelled"] = 4] = "Cancelled";
})(ProposalStatus = exports.ProposalStatus || (exports.ProposalStatus = {}));
function transfersReducer(explorerState, action) {
    switch (action.type) {
        case "selectNetwork":
            var chains = explorerState.chains;
            var networkSelected = chains.find(function (_a) {
                var domainId = _a.domainId;
                return domainId === action.payload;
            });
            var _a = networkSelected, name_1 = _a.name, domainId = _a.domainId;
            return __assign(__assign({}, explorerState), { network: { name: name_1, domainId: domainId } });
        case "setTransferDetails":
            var transferDetails = (0, Helpers_1.computeTransferDetails)(action.payload, explorerState.chains);
            return __assign(__assign({}, explorerState), { transferDetails: transferDetails });
        case "cleanTransferDetails":
            var cleanedTransferDetails = {
                id: "",
                formatedTransferDate: "",
                fromAddress: "",
                proposalStatus: 0,
                formatedAmount: "",
                fromNetworkName: "",
                toNetworkName: "",
                depositTransactionHash: "",
                fromDomainId: 0,
                toDomainId: 0,
                voteEvents: [],
                proposalEvents: [],
                timelineMessages: [],
                fromChain: undefined,
                toChain: undefined,
                pillColorStatus: { borderColor: "", background: "" }
            };
            return __assign(__assign({}, explorerState), { transferDetails: cleanedTransferDetails, timelineButtonClicked: false });
        case "setTokenIconsForDetailView":
            var _b = action.payload, fromChain = _b.fromChain, toChain = _b.toChain;
            return __assign(__assign({}, explorerState), { transferDetails: __assign(__assign({}, explorerState.transferDetails), { fromChain: fromChain, toChain: toChain }) });
        case "timelineButtonClick":
            return __assign(__assign({}, explorerState), { timelineButtonClicked: !explorerState.timelineButtonClicked });
        default:
            return explorerState;
    }
}
exports.transfersReducer = transfersReducer;
//# sourceMappingURL=TransfersReducer.js.map