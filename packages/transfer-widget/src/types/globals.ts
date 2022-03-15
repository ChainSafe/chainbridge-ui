import { ChainbridgeConfig, UIConfig } from "@chainsafe/chainbridge-ui-core";
declare global {
  interface Window {
    ethereum: any;
    __RUNTIME_CONFIG__: {
      UI: UIConfig;
      CHAINBRIDGE: ChainbridgeConfig;
      INDEXER_URL: string;
    };
  }
}
export {}
