import { ChainbridgeConfig } from '@chainsafe/chainbridge-ui-core'

declare global {
    interface Window {
        ethereum: any;
        __RUNTIME_CONFIG__: {
            CHAINBRIDGE: ChainbridgeConfig
    }
  }
}
