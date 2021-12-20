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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.transitMessageReducerSubstrate = void 0;
function transitMessageReducerSubstrate(transitState, action) {
    switch (action.type) {
        case "addMessage":
            // NOTE: this is to avoid duplicate messages due to chain reorganization
            var payload = action.payload;
            var messages = __spreadArray(__spreadArray([], __read(transitState.transitMessage), false), [payload], false);
            // Select distinct messages by address and eventType
            var uniqueMessages = __spreadArray([], __read(new Map(messages.map(function (item) { return [
                item.address + item.eventType,
                item,
            ]; })).values()), false);
            var uniqueMessagesSorted = uniqueMessages.sort(function (a, b) { return ("order" in a && "order" in b && a.order - b.order) || 0; });
            return __assign(__assign({}, transitState), { transitMessage: uniqueMessagesSorted });
        case "resetMessages":
            return { txIsDone: false, transitMessage: [] };
        case "setTransactionIsDone":
            return __assign(__assign({}, transitState), { txIsDone: true });
        default:
            return transitState;
    }
}
exports.transitMessageReducerSubstrate = transitMessageReducerSubstrate;
//# sourceMappingURL=TransitMessageSubstrateReduce.js.map