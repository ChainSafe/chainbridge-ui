import ETHIcon from "./media/tokens/eth.svg";

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
      chainId: 1,
      networkId: 5,
      name: "Ethereum - Goerli",
      bridgeAddress: "0x0993CEE13a42301d2e050693806fe79E822d42fB",
      erc20HandlerAddress: "0x68b6A17C5E4B08759ee7F2e092356c479C5Cc65d",
      rpcUrl: "https://goerli.infura.io/v3/1d29c13faa7f4d6d905131424b7fd75f",
      type: "Ethereum",
      blockExplorer: "https://goerli.etherscan.io/tx",
      nativeTokenSymbol: "ETH",
      tokens: [
        {
          address: "0x6D16859DE8C9421E52c4F5A6003DAcA3B4f8e36B",
          name: "ERC20",
          symbol: "ERC20",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000F1c1e7dfF8466f8A3887AB4a9d398727A700DF9305",
        },
        {
          address: "0xc1BBE2Dc4E3b31E0d0f7F3A71754fA54C866D2B1",
          name: "WAVAX",
          symbol: "WAVAX",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000ed52eCA444088D3892EdaEbb05Ccd012165545D305",
        },
      ],
    },
    {
      chainId: 2,
      networkId: 43113,
      name: "AVAX-C Chain",
      bridgeAddress: "0xed52eCA444088D3892EdaEbb05Ccd012165545D3",
      erc20HandlerAddress: "0xd4B2c7B6CB241848Ac38EA94F131263A820c462D",
      rpcUrl: "https://avalanche.altoros.com/ext/bc/C/rpc",
      type: "Ethereum",
      blockExplorer: "https://cchain.explorer.avax-test.network/tx",
      nativeTokenSymbol: "AVAX",
      defaultGasPrice: 470,
      tokens: [
        {
          address: "0x0888CbA37729e3b3196bE81171E45E3A8bAf157A",
          name: "ERC20",
          symbol: "ERC20",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000F1c1e7dfF8466f8A3887AB4a9d398727A700DF9305",
        },
        {
          address: "0x1D308089a2D1Ced3f1Ce36B1FcaF815b07217be3",
          name: "WAVAX",
          symbol: "WAVAX",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000ed52eCA444088D3892EdaEbb05Ccd012165545D305",
          isNativeWrappedToken: true,
        },
      ],
    },
  ],
};

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
