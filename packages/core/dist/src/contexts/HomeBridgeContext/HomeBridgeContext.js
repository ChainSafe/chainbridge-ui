"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
exports.useHomeBridge = exports.HomeBridgeContext = void 0;
var react_1 = __importStar(require("react"));
var HomeBridgeContext = react_1["default"].createContext(undefined);
exports.HomeBridgeContext = HomeBridgeContext;
var useHomeBridge = function () {
    var context = (0, react_1.useContext)(HomeBridgeContext);
    if (context === undefined) {
        throw new Error("useHomeBridge must be called within a HomeBridgeProvider");
    }
    return context;
};
exports.useHomeBridge = useHomeBridge;
//# sourceMappingURL=HomeBridgeContext.js.map