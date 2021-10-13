import { ChainbridgeConfig, UIConfig } from "../chainbridgeConfig";

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      UI: UIConfig;
      CHAINBRIDGE: ChainbridgeConfig;
      INDEXER_URL: string;
    };
  }
}
