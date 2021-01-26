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
  // Ethereum - Avalanche Bridge
  chains: [
    {
      chainId: 1,
      networkId: 1,
      name: "Ethereum",
      bridgeAddress: "0x96B845aBE346b49135B865E5CeDD735FC448C3aD",
      erc20HandlerAddress: "0xdAC7Bb7Ce4fF441A235F08408e632FA1D799A147",
      rpcUrl: "https://mainnet.infura.io/v3/9a76dde18da0480b96fe5fc0caf20bb0",
      type: "Ethereum",
      blockExplorer: "https://etherscan.io/tx",
      nativeTokenSymbol: "ETH",
      tokens: [
        {
          address: "0x6b175474e89094c44da98b954eedeac495271d0f",
          name: "DAI",
          symbol: "ERC20",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000006b175474e89094c44da98b954eedeac495271d0f00",
        },
        {
          address: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
          name: "Uniswap",
          symbol: "UNI",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98401",
        },
        {
          address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
          name: "0x Protocol",
          symbol: "ZRX",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000E41d2489571d322189246DaFA5ebDe1F4699F49801",
        },
        {
          address: "0x111111111117dC0aa78b770fA6A738034120C302",
          name: "1inchToken",
          symbol: "1INCH",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000111111111117dC0aa78b770fA6A738034120C30201",
        },
        {
          address: "0xE48972fCd82a274411c01834e2f031D4377Fa2c0",
          name: "2key.network",
          symbol: "2KEY",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000E48972fCd82a274411c01834e2f031D4377Fa2c001",
        },
        {
          address: "0x8888801aF4d980682e47f1A9036e589479e835C5",
          name: "88mph.app",
          symbol: "MPH",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000008888801aF4d980682e47f1A9036e589479e835C501",
        },
        {
          address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
          name: "Aave Token",
          symbol: "AAVE",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000007Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE901",
        },
        {
          address: "0x0E8d6b471e332F140e7d9dbB99E5E3822F728DA6",
          name: "Abyss",
          symbol: "ABYSS",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000000E8d6b471e332F140e7d9dbB99E5E3822F728DA601",
        },
        {
          address: "0x4B3a0c6d668B43F3f07904E124328659b90Bb4Ca",
          name: "AceD",
          symbol: "AceD",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000004B3a0c6d668B43F3f07904E124328659b90Bb4Ca01",
        },
        {
          address: "0xADE00C28244d5CE17D72E40330B1c318cD12B7c3",
          name: "Ad Ex Network",
          symbol: "ADX",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000ADE00C28244d5CE17D72E40330B1c318cD12B7c301",
        },
        {
          address: "0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e",
          name: "Aelf",
          symbol: "ELF",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000bf2179859fc6D5BEE9Bf9158632Dc51678a4100e01",
        },
        {
          address: "0xa704fCe7b309Ec09DF16e2F5Ab8cAf6Fe8A4BAA9",
          name: "Agri Chain",
          symbol: "AGRI",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000a704fCe7b309Ec09DF16e2F5Ab8cAf6Fe8A4BAA901",
        },
        {
          address: "0x37E8789bB9996CaC9156cD5F5Fd32599E6b91289",
          name: "Aid Coin",
          symbol: "AID",
          imageUri: ETHIcon,
          resourceId:
            "0x000000000000000000000037E8789bB9996CaC9156cD5F5Fd32599E6b9128901",
        },
        {
          address: "0x8Ab7404063Ec4DBcfd4598215992DC3F8EC853d7",
          name: "Akropolis",
          symbol: "AKRO",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000008Ab7404063Ec4DBcfd4598215992DC3F8EC853d701",
        },
        {
          address: "0x94d863173EE77439E4292284fF13fAD54b3BA182",
          name: "Akropolis Delphi",
          symbol: "ADEL",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000008Ab7404063Ec4DBcfd4598215992DC3F8EC853d701",
        },
      ],
    },
    {
      chainId: 2,
      networkId: 43114,
      name: "Avalanche",
      bridgeAddress: "0x32E35B48e10cAA2eD433486287B1f39207D1b39F",
      erc20HandlerAddress: "0x96B845aBE346b49135B865E5CeDD735FC448C3aD",
      rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
      type: "Ethereum",
      blockExplorer: "https://cchain.explorer.avax.network/tx",
      nativeTokenSymbol: "AVAX",
      defaultGasPrice: 470,
      tokens: [
        {
          address: "0xdAC7Bb7Ce4fF441A235F08408e632FA1D799A147",
          name: "DAI",
          symbol: "DAI",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000006b175474e89094c44da98b954eedeac495271d0f00",
        },
        {
          address: "0xdF3aCC3460965996FF496Cb9D0CF9E6859545a86",
          name: "Uniswap",
          symbol: "UNI",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98401",
        },
        {
          address: "0xC0a9c341FF5531677214dFB7B4ACEDa63f92b6f0",
          name: "0x Protocol",
          symbol: "ZRX",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000E41d2489571d322189246DaFA5ebDe1F4699F49801",
        },
        {
          address: "0x9982506E33D2dD0db0F9faFbE5732dcc4f1256B3",
          name: "1inchToken",
          symbol: "1INCH",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000111111111117dC0aa78b770fA6A738034120C30201",
        },
        {
          address: "0xF604ad9cd75551Dd9c496AbF3E2C1C8D9C3d6BF8",
          name: "2key.network",
          symbol: "2KEY",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000E48972fCd82a274411c01834e2f031D4377Fa2c001",
        },
        {
          address: "0x73842d48d56923801A16336B45E7A8A341dEBFA5",
          name: "88mph.app",
          symbol: "MPH",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000008888801aF4d980682e47f1A9036e589479e835C501",
        },
        {
          address: "0x217446Ce09AA183a9034f4FF20d31b9268427187",
          name: "Aave Token",
          symbol: "AAVE",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000007Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE901",
        },
        {
          address: "0xb46aB8BE3d240a52FDD0c2636b3f269712e96C9f",
          name: "Abyss",
          symbol: "ABYSS",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000000E8d6b471e332F140e7d9dbB99E5E3822F728DA601",
        },
        {
          address: "0x1Bb5936d8cb341Ee6C4321144c86D9286A58476e",
          name: "AceD",
          symbol: "AceD",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000004B3a0c6d668B43F3f07904E124328659b90Bb4Ca01",
        },
        {
          address: "0x4F47eC61451FAFc3d26D190541Eb92253419D99f",
          name: "Ad Ex Network",
          symbol: "ADX",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000ADE00C28244d5CE17D72E40330B1c318cD12B7c301",
        },
        {
          address: "0xF0C33Eaf14bAEA0b503a8B62B6Fcd537490f336A",
          name: "Aelf",
          symbol: "ELF",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000bf2179859fc6D5BEE9Bf9158632Dc51678a4100e01",
        },
        {
          address: "0xc8Adf837351586638B6460Bb5F1F6D27544823C5",
          name: "Agri Chain",
          symbol: "AGRI",
          imageUri: ETHIcon,
          resourceId:
            "0x0000000000000000000000a704fCe7b309Ec09DF16e2F5Ab8cAf6Fe8A4BAA901",
        },
        {
          address: "0xaE928f7bD476bA05691aFC15bf7914b70967dd92",
          name: "Aid Coin",
          symbol: "AID",
          imageUri: ETHIcon,
          resourceId:
            "0x000000000000000000000037E8789bB9996CaC9156cD5F5Fd32599E6b9128901",
        },
        {
          address: "0x09Ff97AA422A897e10e47ab07bc8AA5e04c915Ba",
          name: "Akropolis",
          symbol: "AKRO",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000008Ab7404063Ec4DBcfd4598215992DC3F8EC853d701",
        },
        {
          address: "0x424E704fc12D5e51E56D200E903e0F0F9d3aD046",
          name: "Akropolis Delphi",
          symbol: "ADEL",
          imageUri: ETHIcon,
          resourceId:
            "0x00000000000000000000008Ab7404063Ec4DBcfd4598215992DC3F8EC853d701",
        },
      ],
    },
  ],
};
