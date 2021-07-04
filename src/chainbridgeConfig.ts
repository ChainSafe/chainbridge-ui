import ETHIcon from './media/tokens/eth.svg';
// import WETHIcon from "./media/tokens/weth.svg";

export type TokenConfig = {
  address: string;
  name?: string;
  symbol?: string;
  imageUri?: string;
  resourceId: string;
  isNativeWrappedToken?: boolean;
};

export type ChainType = 'Ethereum' | 'Substrate';

export type BridgeConfig = {
  networkId?: number;
  chainId: number;
  name: string;
  rpcUrl: string;
  type: ChainType;
  tokens: TokenConfig[];
  nativeTokenSymbol: string;
  decimals: number;
};

export type EvmBridgeConfig = BridgeConfig & {
  bridgeAddress: string;
  erc20HandlerAddress: string;
  type: 'Ethereum';
  //This should be the full path to display a tx hash, without the trailing slash, ie. https://etherscan.io/tx
  blockExplorer?: string;
  defaultGasPrice?: number;
  deployedBlockNumber?: number;
};

export type SubstrateBridgeConfig = BridgeConfig & {
  type: 'Substrate';
  chainbridgePalletName: string;
  bridgeFeeFunctionName?: string; // If this value is provided, the chain value will be used will be used
  bridgeFeeValue?: number; // If the above value is not provided, this value will be used for the fee. No scaling should be applied.
  transferPalletName: string;
  transferFunctionName: string;
  typesFileName: string;
};

export type ChainbridgeConfig = {
  chains: Array<EvmBridgeConfig | SubstrateBridgeConfig>;
};

export const chainbridgeConfig: ChainbridgeConfig = {
  // Local GETH <> Local Substrate
  chains: [
    // {
    //   chainId: 0,
    //   networkId: 5,
    //   name: "Ethereum - Local",
    //   decimals: 18,
    //   bridgeAddress: "0x62877dDCd49aD22f5eDfc6ac108e9a4b5D2bD88B",
    //   erc20HandlerAddress: "0x3167776db165D8eA0f51790CA2bbf44Db5105ADF",
    //   rpcUrl: "http://localhost:8545",
    //   type: "Ethereum",
    //   nativeTokenSymbol: "ETH",
    //   tokens: [
    //     {
    //       address: "0x21605f71845f372A9ed84253d2D024B7B10999f4",
    //       name: "TOKEN",
    //       symbol: "TOKEN",
    //       imageUri: ETHIcon,
    //       resourceId:
    //         "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
    //     },
    //   ],
    // },
    // {
    //   chainId: 1,
    //   networkId: 2,
    //   name: "Substrate - Local",
    //   decimals: 18,
    //   rpcUrl: "ws://localhost:9944",
    //   type: "Substrate",
    //   nativeTokenSymbol: "DOT",
    //   chainbridgePalletName: "chainBridge",
    //   bridgeFeeFunctionName: "tokenTransferFee",
    //   transferPalletName: "example",
    //   transferFunctionName: "transferNative",
    //   typesFileName: "bridgeTypes.json",
    //   tokens: [
    //     {
    //       address: "substrate-native",
    //       name: "DOT",
    //       symbol: "DOT",
    //       resourceId: "substrate-native",
    //     },
    //   ],
    // },
    {
      chainId: 0,
      networkId: 42,
      name: 'Ethereum',
      decimals: 18,
      bridgeAddress: '0x478ab279Ac5F4bd69382D34cF2382606E6208eFc',
      erc20HandlerAddress: '0x3483c3a1Af5e78AE5AaB07de3Ea57b6F3877745F',
      rpcUrl: 'wss://kovan.infura.io/ws/v3/e199aa0da7e54bd9be94de96ea753127',
      type: 'Ethereum',
      nativeTokenSymbol: 'ETH',
      tokens: [
        {
          address: '0x2726A258f88b4e5B3a251e3d91594c527E10494D',
          name: 'wCFG',
          symbol: 'wCFG',
          imageUri: ETHIcon,
          resourceId:
            '0x00000000000000000000000000000009e974040e705c10fb4de576d6cc261900',
        },
      ],
    },
    {
      chainId: 1,
      networkId: 2,
      name: 'Centrifuge - Amber',
      decimals: 18,
      rpcUrl: 'wss://fullnode.amber.centrifuge.io',
      type: 'Substrate',
      nativeTokenSymbol: 'CFG',
      chainbridgePalletName: 'chainBridge',
      bridgeFeeFunctionName: 'tokenTransferFee',
      transferPalletName: 'palletBridge',
      transferFunctionName: 'transferNative',
      typesFileName: 'bridgeTypes.json',
      tokens: [
        {
          address: 'substrate-native',
          name: 'CFG',
          symbol: 'CFG',
          resourceId: 'substrate-native',
        },
      ],
    },
  ],
};
