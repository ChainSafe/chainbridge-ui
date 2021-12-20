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
exports.useConnectWallet = void 0;
var chainbridge_contracts_1 = require("@chainsafe/chainbridge-contracts");
var react_1 = require("react");
var WethFactory_1 = require("../../../Contracts/WethFactory");
function useConnectWallet(isReady, checkIsReady, dispatcher, onboard, homeChainConfig, provider, network) {
    var _a = __read((0, react_1.useState)(false), 2), initialising = _a[0], setInitialising = _a[1];
    var _b = __read((0, react_1.useState)(false), 2), walletSelected = _b[0], setWalletSelected = _b[1];
    var _c = __read((0, react_1.useState)(undefined), 2), homeBridge = _c[0], setHomeBridge = _c[1];
    // Contracts
    var _d = __read((0, react_1.useState)(undefined), 2), wrapper = _d[0], setWrapper = _d[1];
    var _e = __read((0, react_1.useState)(undefined), 2), wrapTokenConfig = _e[0], setWrapperConfig = _e[1];
    (0, react_1.useEffect)(function () {
        if (initialising || homeBridge || !onboard)
            return;
        console.log("starting init");
        setInitialising(true);
        if (!walletSelected) {
            onboard
                .walletSelect("metamask")
                .then(function (success) {
                if (window.ethereum) {
                    window.ethereum.on("chainChanged", function (ch) {
                        window.location.reload();
                    });
                }
                setWalletSelected(success);
                if (success) {
                    checkIsReady(onboard, dispatcher)
                        .then(function (success) {
                        if (success) {
                            if (homeChainConfig && network && isReady && provider) {
                                var signer = provider.getSigner();
                                if (!signer) {
                                    console.log("No signer");
                                    setInitialising(false);
                                    return;
                                }
                                var bridge = chainbridge_contracts_1.BridgeFactory.connect(homeChainConfig.bridgeAddress, signer);
                                setHomeBridge(bridge);
                                var wrapperToken = homeChainConfig.tokens.find(function (token) { return token.isNativeWrappedToken; });
                                if (!wrapperToken) {
                                    setWrapperConfig(undefined);
                                    setWrapper(undefined);
                                }
                                else {
                                    setWrapperConfig(wrapperToken);
                                    var connectedWeth = WethFactory_1.WethFactory.connect(wrapperToken.address, signer);
                                    setWrapper(connectedWeth);
                                }
                            }
                        }
                    })["catch"](function (error) {
                        console.error(error);
                    })["finally"](function () {
                        setInitialising(false);
                    });
                }
            })["catch"](function (error) {
                setInitialising(false);
                console.error(error);
            });
        }
        else {
            checkIsReady(onboard, dispatcher)
                .then(function (success) {
                if (success) {
                    if (homeChainConfig && network && isReady && provider) {
                        var signer = provider.getSigner();
                        if (!signer) {
                            console.log("No signer");
                            setInitialising(false);
                            return;
                        }
                        var bridge = chainbridge_contracts_1.BridgeFactory.connect(homeChainConfig.bridgeAddress, signer);
                        setHomeBridge(bridge);
                        var wrapperToken = homeChainConfig.tokens.find(function (token) { return token.isNativeWrappedToken; });
                        if (!wrapperToken) {
                            setWrapperConfig(undefined);
                            setWrapper(undefined);
                        }
                        else {
                            setWrapperConfig(wrapperToken);
                            var connectedWeth = WethFactory_1.WethFactory.connect(wrapperToken.address, signer);
                            setWrapper(connectedWeth);
                        }
                    }
                }
            })["catch"](function (error) {
                console.error(error);
            })["finally"](function () {
                setInitialising(false);
            });
        }
    }, [
        initialising,
        homeChainConfig,
        isReady,
        provider,
        checkIsReady,
        network,
        homeBridge,
        onboard,
        walletSelected,
    ]);
    return { homeBridge: homeBridge, wrapper: wrapper, wrapTokenConfig: wrapTokenConfig };
}
exports.useConnectWallet = useConnectWallet;
//# sourceMappingURL=useConnectWallet.js.map