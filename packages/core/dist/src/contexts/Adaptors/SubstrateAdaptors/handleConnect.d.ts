import React from "react";
import { InjectedAccountType } from "../interfaces";
import { BridgeConfig } from "../../../chainbridgeConfig";
declare const handleConnectFunc: (isReady: boolean, setAccounts: (value: React.SetStateAction<InjectedAccountType[]>) => void, selectAccount: (index: number) => void, handleSetHomeChain: (domainId: number | undefined) => void, homeChains: BridgeConfig[]) => () => Promise<void>;
export default handleConnectFunc;
//# sourceMappingURL=handleConnect.d.ts.map