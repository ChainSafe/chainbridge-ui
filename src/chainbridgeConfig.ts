// import ETHIcon from "./media/tokens/eth.svg";
import WETHIcon from "./media/tokens/weth.svg";

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
};

export type ChainbridgeConfig = {
  chains: BridgeConfig[];
};

export const chainbridgeConfig: ChainbridgeConfig = {
  // ETC Mainnet - ETH Mainnet Bridge
  chains: [
    {
      chainId: 1,
      networkId: 61,
      name: "Ethereum Classic - Mainnet",
      bridgeAddress: "0x9C4073806e1b4432F49a6a3e2e8A42fC0e0D4b5d",
      erc20HandlerAddress: "0x2AE6613167c584550441373F2216f405D85512BA",
      rpcUrl: "https://www.ethercluster.com/etc",
      type: "Ethereum",
      blockExplorer: "https://blockscout.com/etc/mainnet/tx",
      nativeTokenSymbol: "ETC",
      tokens: [
        {
          address: "0x505c6120808e1dC50E84f9B2d8F5db3252666cBD",
          name: "Wrapped ETC",
          symbol: "wETC",
          imageUri: WETHIcon,
          resourceId:
            "0x0000000000000000000000505c6120808e1dC50E84f9B2d8F5db3252666cBD01",
          isNativeWrappedToken: true,
        },
      ],
    },
    {
      chainId: 0,
      networkId: 1,
      name: "Ethereum - Mainnet",
      bridgeAddress: "0x9C4073806e1b4432F49a6a3e2e8A42fC0e0D4b5d",
      erc20HandlerAddress: "0x2AE6613167c584550441373F2216f405D85512BA",
      rpcUrl:
        "https://eth-mainnet.alchemyapi.io/v2/o_08MvnDc-AJg852nXB04N5t9mi0aPjo",
      type: "Ethereum",
      blockExplorer: "https://blockscout.com/etc/kotti/tx",
      nativeTokenSymbol: "ETH",
      tokens: [
        {
          address: "0x505c6120808e1dC50E84f9B2d8F5db3252666cBD",
          name: "Wrapped ETC",
          symbol: "wETC",
          imageUri: WETHIcon,
          resourceId:
            "0x0000000000000000000000505c6120808e1dC50E84f9B2d8F5db3252666cBD01",
        },
      ],
    },
  ],

  // Goerli - Kotti Bridge
  // chains: [
  //   {
  //     chainId: 1,
  //     networkId: 5,
  //     name: "Ethereum - Goerli",
  //     bridgeAddress: "0x2524d71D163f60747630c4EBeB077a9832329646",
  //     erc20HandlerAddress: "0xDc26320258ADfd806d125223Fb0F94e54D13FA51",
  //     rpcUrl: "https://goerli.prylabs.net",
  //     type: "Ethereum",
  //     blockExplorer: "https://goerli.etherscan.io/tx",
  //     nativeTokenSymbol: "ETH",
  //     tokens: [
  //       {
  //         address: "0x735B895bCb37cBba5812154f4F34480EcE1B672C",
  //         name: "Wrapped ETC",
  //         symbol: "wETC",
  //         imageUri: WETHIcon,
  //         resourceId:
  //           "0x000000000000000000000023A9FD05ef0c5fb9dDE964C4d4191A169Fd221f802",
  //       },
  //       {
  //         address: "0x14dD060dB55c0E7cc072BD3ab4709d55583119c0",
  //         name: "An ERC20",
  //         symbol: "ERC20",
  //         imageUri: ETHIcon,
  //         resourceId:
  //           "0x000000000000000000000014dD060dB55c0E7cc072BD3ab4709d55583119c001",
  //       },
  //     ],
  //   },
  //   {
  //     chainId: 2,
  //     networkId: 6,
  //     name: "Ethereum Classic - Kotti",
  //     bridgeAddress: "0x2524d71D163f60747630c4EBeB077a9832329646",
  //     erc20HandlerAddress: "0xDc26320258ADfd806d125223Fb0F94e54D13FA51",
  //     rpcUrl: "https://www.ethercluster.com/kotti",
  //     type: "Ethereum",
  //     blockExplorer: "https://blockscout.com/etc/kotti/tx",
  //     nativeTokenSymbol: "ETC",
  //     tokens: [
  //       {
  //         address: "0x23A9FD05ef0c5fb9dDE964C4d4191A169Fd221f8",
  //         name: "Wrapped ETC",
  //         symbol: "wETC",
  //         imageUri: WETHIcon,
  //         resourceId:
  //           "0x000000000000000000000023A9FD05ef0c5fb9dDE964C4d4191A169Fd221f802",
  //         isNativeWrappedToken: true,
  //       },
  //       {
  //         address: "0x14dD060dB55c0E7cc072BD3ab4709d55583119c0",
  //         name: "An ERC20",
  //         symbol: "ERC20",
  //         imageUri: ETHIcon,
  //         resourceId:
  //           "0x000000000000000000000014dD060dB55c0E7cc072BD3ab4709d55583119c001",
  //       },
  //     ],
  //   },
  // ],

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
