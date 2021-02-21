import ETHIcon from "./media/tokens/eth.svg";
//import WETHIcon from "./media/tokens/weth.svg";
import WEXPIcon from "./media/tokens/wexp.png";
import EGGIcon from "./media/tokens/eggs.png";

export type TokenConfig = {
  address: string;
  name?: string;
  symbol?: string;
  imageUri?: string;
  resourceId: string;
  isNativeWrappedToken?: boolean;
};

export type BridgeConfig = {
  chainId: number;
  networkId: number;
  name: string;
  bridgeAddress: string;
  erc20HandlerAddress: string;
  rpcUrl: string;
  type: "Ethereum" | "Substrate";
  tokens: TokenConfig[];
  nativeTokenSymbol: string;
  //This should be the full path to display a tx hash, without the trailing slash, ie. https://etherscan.io/tx
  blockExplorer?: string;
  defaultGasPrice?: number;
};

export type ChainbridgeConfig = {
  chains: BridgeConfig[];
};

export const chainbridgeConfig: ChainbridgeConfig = {
  // Goerli - Kotti Bridge
  chains: [
    {
      chainId: 2,
      networkId: 2,
      name: "Expanse",
      bridgeAddress: "0xfDcDD3eE5D5d99EEDB2fCb38927378199E51a4Cc",
      erc20HandlerAddress: "0xD1A05D56876f78ef99cf7D726ADEbaDC4409911f",
      rpcUrl: "https://node.expanse.tech",
      type: "Ethereum",
      blockExplorer: "https://explorer.expanse.tech/tx",
      nativeTokenSymbol: "EXP",
      tokens: [
        {
          address: "0x331631B4bb93b9B8962faE15860BD538a389395A",
          name: "Wrapped EXP",
          symbol: "wEXP",
          imageUri: WEXPIcon,
          resourceId:
            "0x0000000000000000000000331631B4bb93b9B8962faE15860BD538a389395A02",
          isNativeWrappedToken: true,
        },
        {
          address: "0xd1365a5Af713cde10C6ac3fB9EDBB2bBbd4B2Ba2",
          name: "Eggswap",
          symbol: "EGG",
          imageUri: EGGIcon,
          resourceId:
            "0x0000000000000000000000d1365a5Af713cde10C6ac3fB9EDBB2bBbd4B2Ba202",
        },
      ],
    },
    {
      chainId: 4,
      networkId: 4,
      name: "Ethereum - Rinkeby",
      bridgeAddress: "0xC78c8dBF31fC3fB34F3bDb3Ac7f6C056De4CDa87",
      erc20HandlerAddress: "0x33AeE33E7c7E12f27D4B155E9728f69B483cc93A",
      rpcUrl: "https://rinkeby-light.eth.linkpool.io",
      type: "Ethereum",
      blockExplorer: "https://rinkeby.etherscan.io/tx",
      nativeTokenSymbol: "ETH",
      tokens: [
        {
          address: "0x78b797BEd95463E946df884F2B470449ec60bF39",
          name: "Wrapped EXP",
          symbol: "rEXP",
          imageUri: WEXPIcon,
          resourceId:
            "0x0000000000000000000000331631B4bb93b9B8962faE15860BD538a389395A02",
          isNativeWrappedToken: false,
        },
        {
          address: "0xb9FEf156CA20C966c651f3eA1a7EA262cdC07b74",
          name: "Rinkeby EggSwap",
          symbol: "rEGG",
          imageUri: EGGIcon,
          resourceId:
            "0x0000000000000000000000d1365a5Af713cde10C6ac3fB9EDBB2bBbd4B2Ba202",
        },
      ],
    },
    {
      chainId: 137,
      networkId: 137,
      name: "Matic",
      bridgeAddress: "0x31f08a521E697FaC0f2aF43C1Fc633B26be91Ddc",
      erc20HandlerAddress: "0xc982ae8247C152f0b4d27f22479E15c66FbF3D44",
      rpcUrl: "https://rpc-mainnet.matic.network",
      type: "Ethereum",
      blockExplorer: "https://explorer.matic.network/tx",
      nativeTokenSymbol: "MATIC",
      tokens: [
        {
          address: "0x27D83D722D601Ec204aDf5465890b442349e6C3C",
          name: "Wrapped EXP",
          symbol: "WEXP",
          imageUri: WEXPIcon,
          resourceId:
            "0x0000000000000000000000331631B4bb93b9B8962faE15860BD538a389395A02",
          isNativeWrappedToken: false,
        },
      ],
    },
  ],

  // DEVNET
  //   erc20ResourceId:
  //   "0x00000000000000000000000021605f71845f372A9ed84253d2D024B7B10999f4",
  // chains: [
  // {
  //   chainId: 1,
  //   networkId: 5,
  //   name: "Ethereum - A",
  //   bridgeAddress: "0x62877dDCd49aD22f5eDfc6ac108e9a4b5D2bD88B",
  //   erc20HandlerAddress: "0x3167776db165D8eA0f51790CA2bbf44Db5105ADF",
  //   rpcUrl: "http://localhost:8545",
  //   type: "Ethereum",
  //   tokens: [
  //     {
  //       address: "0x21605f71845f372A9ed84253d2D024B7B10999f4",
  //       name: "Test EthA",
  //       symbol: "TESTA",
  //       imageUri: ETHIcon,
  //     },
  //   ],
  // },
  // {
  //   chainId: 2,
  //   networkId: 6,
  //   name: "Ethereum - B",
  //   bridgeAddress: "0x62877dDCd49aD22f5eDfc6ac108e9a4b5D2bD88B",
  //   erc20HandlerAddress: "0x3167776db165D8eA0f51790CA2bbf44Db5105ADF",
  //   rpcUrl: "http://localhost:8546",
  //   type: "Ethereum",
  //   tokens: [
  //     {
  //       address: "0x21605f71845f372A9ed84253d2D024B7B10999f4",
  //       name: "Test EthB",
  //       symbol: "TESTB",
  //       imageUri: ETHIcon,
  //     },
  //   ],
  // },
  // ]
};
