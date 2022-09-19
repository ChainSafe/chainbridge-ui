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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_ssm_1 = require("@aws-sdk/client-ssm");
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const ssm = new client_ssm_1.SSM({
    region: "us-east-2",
});
const getConfigFromSSM = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = yield ssm.getParameter({
            Name: "/chainbridge/chainbridge-ui-local",
            WithDecryption: true,
        });
        const rawResponse = (_a = data.Parameter) === null || _a === void 0 ? void 0 : _a.Value;
        if (rawResponse) {
            const parsedResponse = JSON.parse(rawResponse);
            return parsedResponse;
        }
    }
    catch (e) {
        console.warn("AWS SSM request failed");
        console.error(e);
        return { error: e };
    }
});
app.get("/config", (req, res) => {
    getConfigFromSSM().then((config) => {
        res.json(config);
    });
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map