import ETHIcon from "./media/tokens/eth.svg";

type TokenConfig = {
  address: string;
  name?: string;
  symbol?: string;
  imageUri?: string;
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
};

export const chainbridgeConfig: BridgeConfig[] = [
  {
    chainId: 1,
    networkId: 5,
    name: "Ethereum - Goerli",
    bridgeAddress: "0x2524d71D163f60747630c4EBeB077a9832329646",
    erc20HandlerAddress: "0xDc26320258ADfd806d125223Fb0F94e54D13FA51",
    rpcUrl: "https://goerli.prylabs.net",
    type: "Ethereum",
    tokens: [
      {
        address: "0x14dD060dB55c0E7cc072BD3ab4709d55583119c0",
        name: "Test Goerli",
        symbol: "TESTG",
        imageUri: ETHIcon,
      },
    ],
  },
  {
    chainId: 2,
    networkId: 6,
    name: "Ethereum Classic - Kotti",
    bridgeAddress: "0x2524d71D163f60747630c4EBeB077a9832329646",
    erc20HandlerAddress: "0xDc26320258ADfd806d125223Fb0F94e54D13FA51",
    rpcUrl: "https://www.ethercluster.com/kotti",
    type: "Ethereum",
    tokens: [
      {
        address: "0x14dD060dB55c0E7cc072BD3ab4709d55583119c0",
        name: "Test Kotti",
        symbol: "TESTK",
      },
    ],
  },
];
