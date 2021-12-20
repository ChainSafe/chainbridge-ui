import React from "react";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { InjectedAccountType } from "../interfaces";
import { BridgeConfig } from "../../../chainbridgeConfig";

const handleConnectFunc =
  (
    isReady: boolean,
    setAccounts: (value: React.SetStateAction<InjectedAccountType[]>) => void,
    selectAccount: (index: number) => void,
    handleSetHomeChain: (domainId: number | undefined) => void,
    homeChains: BridgeConfig[]
  ) =>
  async () => {
    // Requests permission to inject the wallet
    if (!isReady) {
      web3Enable("chainbridge-ui")
        .then(() => {
          // web3Account resolves with the injected accounts
          // or an empty array
          web3Accounts()
            .then((accounts) => {
              return accounts.map(({ address, meta }) => ({
                address,
                meta: {
                  ...meta,
                  name: `${meta.name} (${meta.source})`,
                },
              }));
            })
            .then((injectedAccounts) => {
              // This is where the correct chain configuration is set to the network context
              // Any operations before presenting the accounts to the UI or providing the config
              // to the rest of the dapp should be done here
              setAccounts(injectedAccounts);
              if (injectedAccounts.length === 1) {
                selectAccount(0);
              }
              handleSetHomeChain(
                homeChains.find((item) => item.type === "Substrate")?.domainId
              );
            })
            .catch(console.error);
        })
        .catch(console.error);
    }
  };

export default handleConnectFunc;
