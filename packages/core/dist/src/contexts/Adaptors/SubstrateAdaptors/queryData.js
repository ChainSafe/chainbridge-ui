"use strict";
exports.__esModule = true;
var api_1 = require("@polkadot/api");
var ethers_1 = require("ethers");
var bignumber_js_1 = require("bignumber.js");
var queryData = function (api, homeChainConfig, unsubscribe, setTokens, address) {
    // FOR THE PURPOSES OF THE GUIDE, USING ALICE ACCOUNT
    var keyring = new api_1.Keyring({ type: "sr25519" });
    var ALICE = keyring.addFromUri("//Alice");
    api.query.system
        .account(ALICE.address, function (result) {
        var _a;
        var balance = result.toJSON().data.free;
        setTokens((_a = {},
            _a[homeChainConfig.tokens[0].symbol || "TOKEN"] = {
                decimals: homeChainConfig.decimals,
                balance: parseInt(ethers_1.utils.formatUnits(balance, homeChainConfig.decimals)),
                balanceBN: new bignumber_js_1.BigNumber(balance).shiftedBy(-homeChainConfig.decimals),
                name: homeChainConfig.tokens[0].name,
                symbol: homeChainConfig.tokens[0].symbol
            },
            _a));
    })
        .then(function (unsub) {
        unsubscribe = unsub;
    })["catch"](console.error);
    return unsubscribe;
};
exports["default"] = queryData;
//# sourceMappingURL=queryData.js.map