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
exports.__esModule = true;
exports.useDestinationBridgeHook = void 0;
var chainbridge_contracts_1 = require("@chainsafe/chainbridge-contracts");
var react_1 = require("react");
var helpers_1 = require("./helpers");
function useDestinationBridgeHook(destinationChainConfig) {
    var _a = __read((0, react_1.useState)(undefined), 2), destinationBridge = _a[0], setDestinationBridge = _a[1];
    (0, react_1.useEffect)(function () {
        if (destinationBridge)
            return;
        var provider = (0, helpers_1.getProvider)(destinationChainConfig);
        if (destinationChainConfig && provider) {
            var bridge = chainbridge_contracts_1.BridgeFactory.connect(destinationChainConfig.bridgeAddress, provider);
            setDestinationBridge(bridge);
        }
    }, [destinationChainConfig]);
    return destinationBridge;
}
exports.useDestinationBridgeHook = useDestinationBridgeHook;
//# sourceMappingURL=useDestinationBridgeHook.js.map