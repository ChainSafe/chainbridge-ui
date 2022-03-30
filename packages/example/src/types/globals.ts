import { ChainbridgeConfig, UIConfig } from "../chainbridgeConfig";

declare global {
  interface Window {
    // ethereum: any;
    __RUNTIME_CONFIG__: {
      UI: UIConfig;
      CHAINBRIDGE: ChainbridgeConfig;
      INDEXER_URL: string;
    };
  }
}
