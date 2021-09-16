import { ChainbridgeConfig } from "../chainbridgeConfig";
export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      CHAINBRIDGE: ChainbridgeConfig;
      INDEXER_URL: string;
    };
  }
}
