import { ChainbridgeConfig } from '../types'

declare global {
    interface Window {
        ethereum: any;
        __RUNTIME_CONFIG__: {
            CHAINBRIDGE: ChainbridgeConfig
    }
  }
}
