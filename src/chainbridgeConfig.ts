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
          address: "0x9dEbca6eA3af87Bf422Cea9ac955618ceb56EfB4",
          name: "Avalanche",
          symbol: "AVAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xdF3aCC3460965996FF496Cb9D0CF9E6859545a86/logo.png",
          resourceId:
            "0x00000000000000000000009dEbca6eA3af87Bf422Cea9ac955618ceb56EfB402",
        },
        {
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          name: "Wrapped Ether",
          symbol: "WETH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3a755C20913b9bE05Da94f72A4027B9755b4fF85/logo.png",
          resourceId:
            "0000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc201",
        },
        {
          address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
          name: "ChainLink Token",
          symbol: "LINK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x55212B038624D9FaB4D1A65e23f7744d5f0D014A/logo.png",
          resourceId:
            "0000000000000000000000514910771af9ca656af840dff83e8264ecf986ca01",
        },
        {
          address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
          name: "Uniswap",
          symbol: "UNI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xdF3aCC3460965996FF496Cb9D0CF9E6859545a86/logo.png",
          resourceId:
            "00000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98401",
        },
        {
          address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
          name: "Aave Token",
          symbol: "AAVE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x217446Ce09AA183a9034f4FF20d31b9268427187/logo.png",
          resourceId:
            "00000000000000000000007fc66500c84a76ad7e9c93437bfc5ac33e2ddae901",
        },
        {
          address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
          name: "Synthetix Network Token",
          symbol: "SNX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x88f47B5fCdC85A0D80E89A9DfA27694c6e408646/logo.png",
          resourceId:
            "0000000000000000000000c011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f01",
        },
        {
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          name: "Dai Stablecoin",
          symbol: "DAI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2DCA6503946d29Ca8d1C87A247ef122652B03c0e/logo.png",
          resourceId:
            "00000000000000000000006b175474e89094c44da98b954eedeac495271d0f01",
        },
        {
          address: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
          name: "Binance USD",
          symbol: "BUSD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3677638067FeD0B12f2916197c468a0aed52D99A/logo.png",
          resourceId:
            "00000000000000000000004fabb145d64652a948d72533023f6e7a623c7c5301",
        },
        {
          address: "0x6f259637dcD74C767781E37Bc6133cd6A68aa161",
          name: "HuobiToken",
          symbol: "HT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xAF3b5ac3BC6901CC73E8668C84A613DeEF1829B1/logo.png",
          resourceId:
            "00000000000000000000006f259637dcd74c767781e37bc6133cd6a68aa16101",
        },
        {
          address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
          name: "SushiToken",
          symbol: "SUSHI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x44fC678eb98c47b2b0564b455132c91b781a62d4/logo.png",
          resourceId:
            "00000000000000000000006b3595068778dd592e39a122f4f5a5cf09c90fe201",
        },
        {
          address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
          name: "Compound",
          symbol: "COMP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1C4EcE4cd3756a5fD19DbA02Aa54BC8cE0F82875/logo.png",
          resourceId:
            "0000000000000000000000c00e94cb662c3520282e6f5717214004a7f2688801",
        },
        {
          address: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
          name: "yearn.finance",
          symbol: "YFI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2400EA5E0f56D6f8bF14c1c52EebAdE24b4542f3/logo.png",
          resourceId:
            "00000000000000000000000bc529c00c6401aef6d220be8c6ea1667f6ad93e01",
        },
        {
          address: "0x0316EB71485b0Ab14103307bf65a021042c6d380",
          name: "Huobi BTC",
          symbol: "HBTC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x46B96f0f9cd34C87b04B50ecA5b7E7FC3FCb7600/logo.png",
          resourceId:
            "00000000000000000000000316eb71485b0ab14103307bf65a021042c6d38001",
        },
        {
          address: "0x3155BA85D5F96b2d030a4966AF206230e46849cb",
          name: "THORChain ETH.RUNE",
          symbol: "RUNE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x257ac56097bA2333384d14B4e183668a747fFB0d/logo.png",
          resourceId:
            "00000000000000000000003155ba85d5f96b2d030a4966af206230e46849cb01",
        },
        {
          address: "0xc944E90C64B2c07662A292be6244BDf05Cda44a7",
          name: "Graph Token",
          symbol: "GRT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2F5CcB2199a24e43f18f1583bAfeDd4Fc5c78d0D/logo.png",
          resourceId:
            "0000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a701",
        },
        {
          address: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
          name: "Paxos Standard",
          symbol: "PAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x4480b7bb890219DA5a1F5e7dF8feC40Bbe223c4A/logo.png",
          resourceId:
            "00000000000000000000008e870d67f660d95d5be530380d0ec0bd388289e101",
        },
        {
          address: "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828",
          name: "UMA Voting Token v1",
          symbol: "UMA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x660D0D11d8bC1A6f6CBD2d0dF8e567351fd92B5D/logo.png",
          resourceId:
            "000000000000000000000004fa0d235c4abf4bcf4787af4cf447de572ef82801",
        },
        {
          address: "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
          name: "LoopringCoin V2",
          symbol: "LRC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x283EaC7764F7f30A5E7483d7917e0a30DD30e6D3/logo.png",
          resourceId:
            "0000000000000000000000bbbbca6a901c926f240b89eacb641d8aec7aeafd01",
        },
        {
          address: "0x408e41876cCCDC0F92210600ef50372656052a38",
          name: "Republic Token",
          symbol: "REN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3e55c6230ED5DdF068B7aC0Ce0Bb4cA4a5cDDE1D/logo.png",
          resourceId:
            "0000000000000000000000408e41876cccdc0f92210600ef50372656052a3801",
        },
        {
          address: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
          name: "OMGToken",
          symbol: "OMG",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xa9250f85351060c84976e4E3E2b73AD0F78D846f/logo.png",
          resourceId:
            "0000000000000000000000d26114cd6ee289accf82350c8d8487fedb8a0c0701",
        },
        {
          address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
          name: "0x Protocol Token",
          symbol: "ZRX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC0a9c341FF5531677214dFB7B4ACEDa63f92b6f0/logo.png",
          resourceId:
            "0000000000000000000000e41d2489571d322189246dafa5ebde1f4699f49801",
        },
        {
          address: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
          name: "Basic Attention Token",
          symbol: "BAT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xAd544CD2F421A1cC75162CFE9AD83E71eCD35E70/logo.png",
          resourceId:
            "00000000000000000000000d8775f648430679a709e98d2b0cb6250d2887ef01",
        },
        {
          address: "0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206",
          name: "Nexo",
          symbol: "NEXO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xaF282388314906444c2360022686C34d37Ce3553/logo.png",
          resourceId:
            "0000000000000000000000b62132e35a6c13ee1ee0f84dc5d40bad8d81520601",
        },
        {
          address: "0x006BeA43Baa3f7A6f765F14f10A1a1b08334EF45",
          name: "Stox",
          symbol: "STX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x585Ff0bceb851125AE83366159211B11604C3f98/logo.png",
          resourceId:
            "0000000000000000000000006bea43baa3f7a6f765f14f10a1a1b08334ef4501",
        },
        {
          address: "0x0000000000085d4780B73119b644AE5ecd22b376",
          name: "TrueUSD",
          symbol: "TUSD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xbA5b7348e935cf38A5dA932d70ac6458Ae1530B0/logo.png",
          resourceId:
            "00000000000000000000000000000000085d4780b73119b644ae5ecd22b37601",
        },
        {
          address: "0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c",
          name: "Enjin Coin",
          symbol: "ENJ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x06f647C4211C832e430B344B2B1853f31FcBB044/logo.png",
          resourceId:
            "0000000000000000000000f629cbd94d3791c9250152bd8dfbdf380e2a3b9c01",
        },
        {
          address: "0x8762db106B2c2A0bccB3A80d1Ed41273552616E8",
          name: "Reserve Rights",
          symbol: "RSR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xFCff2a29B30fd9dF139919BB88C735c1Fd85E1B1/logo.png",
          resourceId:
            "00000000000000000000008762db106b2c2a0bccb3a80d1ed41273552616e801",
        },
        {
          address: "0x4a220E6096B25EADb88358cb44068A3248254675",
          name: "Quant",
          symbol: "QNT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xcF257Ad5B3CCDD21b83F356D14EFc6a0B00E269c/logo.png",
          resourceId:
            "00000000000000000000004a220e6096b25eadb88358cb44068a324825467501",
        },
        {
          address: "0xa1faa113cbE53436Df28FF0aEe54275c13B40975",
          name: "AlphaToken",
          symbol: "ALPHA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1fe49ECEDEb6D30Dc873A9BEba0f448213c913DF/logo.png",
          resourceId:
            "0000000000000000000000a1faa113cbe53436df28ff0aee54275c13b4097501",
        },
        {
          address: "0x111111111117dC0aa78b770fA6A738034120C302",
          name: "1INCH Token",
          symbol: "1INCH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x9982506E33D2dD0db0F9faFbE5732dcc4f1256B3/logo.png",
          resourceId:
            "0000000000000000000000111111111117dc0aa78b770fa6a738034120c30201",
        },
        {
          address: "0xdd974D5C2e2928deA5F71b9825b8b646686BD200",
          name: "Kyber Network Crystal",
          symbol: "KNC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x15F4A63eEC28bDbc586a166c64c0310A36d7EB0e/logo.png",
          resourceId:
            "0000000000000000000000dd974d5c2e2928dea5f71b9825b8b646686bd20001",
        },
        {
          address: "0x967da4048cD07aB37855c090aAF366e4ce1b9F48",
          name: "Ocean Token",
          symbol: "OCEAN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x0781717A3F10b540262A494B00D04240F966c75C/logo.png",
          resourceId:
            "0000000000000000000000967da4048cd07ab37855c090aaf366e4ce1b9f4801",
        },
        {
          address: "0xba100000625a3754423978a60c9317c58a424e3D",
          name: "Balancer",
          symbol: "BAL",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xe952253C9fee85847cBF33840E3866b3465CCF5d/logo.png",
          resourceId:
            "0000000000000000000000ba100000625a3754423978a60c9317c58a424e3d01",
        },
        {
          address: "0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C",
          name: "Bancor Network Token",
          symbol: "BNT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x55920e46da62b072C6097c7B921fA36487039933/logo.png",
          resourceId:
            "00000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c01",
        },
        {
          address: "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
          name: "EthLend Token",
          symbol: "LEND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x709Ea716F7536aF65fd1FeF506969dae0D0B0913/logo.png",
          resourceId:
            "000000000000000000000080fb784b7ed66730e8b1dbd9820afd29931aab0301",
        },
        {
          address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          name: "Matic Token",
          symbol: "MATIC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xD43A77477a48394A2693e2B31817Bfa50e31220C/logo.png",
          resourceId:
            "00000000000000000000007d1afa7b718fb893db30a3abc0cfc608aacfebb001",
        },
        {
          address: "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942",
          name: "Decentraland MANA",
          symbol: "MANA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8eA0F20fC4e56e553e07ac82dC36655EfC8419e6/logo.png",
          resourceId:
            "00000000000000000000000f5d2fb29fb7d3cfee444a200298f468908cc94201",
        },
        {
          address: "0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55",
          name: "BandToken",
          symbol: "BAND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xe69b823A4050b2B84651d255eF417B598aF44918/logo.png",
          resourceId:
            "0000000000000000000000ba11d00c5f74255f56a5e366f4f77f5a186d7f5501",
        },
        {
          address: "0x6810e776880C02933D47DB1b9fc05908e5386b96",
          name: "Gnosis Token",
          symbol: "GNO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xE8d81233f93E082a90ABAEC2fafC5716Fe60bf4d/logo.png",
          resourceId:
            "00000000000000000000006810e776880c02933d47db1b9fc05908e5386b9601",
        },
        {
          address: "0x362bc847A3a9637d3af6624EeC853618a43ed7D2",
          name: "Parsiq Token",
          symbol: "PRQ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xFc3F561363E3d0E8D20F5dFa8A44F1742E9d4f92/logo.png",
          resourceId:
            "0000000000000000000000362bc847a3a9637d3af6624eec853618a43ed7d201",
        },
        {
          address: "0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671",
          name: "Numeraire",
          symbol: "NMR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xda9759cc1029f006faFFE233AE94F135706D25ff/logo.png",
          resourceId:
            "00000000000000000000001776e1f26f98b1a5df9cd347953a26dd3cb4667101",
        },
        {
          address: "0xa117000000f279D81A1D3cc75430fAA017FA5A2e",
          name: "Aragon Network Token",
          symbol: "ANT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x9865f6C534948Cd09FC034fF0c11a0593CaB7D19/logo.png",
          resourceId:
            "0000000000000000000000a117000000f279d81a1d3cc75430faa017fa5a2e01",
        },
        {
          address: "0x6c6EE5e31d828De241282B9606C8e98Ea48526E2",
          name: "HoloToken",
          symbol: "HOT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB96B862b0A02980489761b7C2528977f0A4088C7/logo.png",
          resourceId:
            "00000000000000000000006c6ee5e31d828de241282b9606c8e98ea48526e201",
        },
        {
          address: "0xbC396689893D065F41bc2C6EcbeE5e0085233447",
          name: "Perpetual",
          symbol: "PERP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x0a31D39325B061d53F03f080eD1947F43B93573a/logo.png",
          resourceId:
            "0000000000000000000000bc396689893d065f41bc2c6ecbee5e008523344701",
        },
        {
          address: "0x584bC13c7D411c00c01A62e8019472dE68768430",
          name: "Hegic",
          symbol: "HEGIC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3ef106483AdC9A3fe6e6Ad363e0bB9169F4544d6/logo.png",
          resourceId:
            "0000000000000000000000584bc13c7d411c00c01a62e8019472de6876843001",
        },
        {
          address: "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30",
          name: "Injective Token",
          symbol: "INJ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x5Aa3cDF45F6C1EC79C04811E7b754bb520Ae7dD0/logo.png",
          resourceId:
            "0000000000000000000000e28b3b32b6c345a34ff64674606124dd5aceca3001",
        },
        {
          address: "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
          name: "Paxos Gold",
          symbol: "PAXG",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2A37F6E3a3682f250b4CffF46B0Fd77303a2551e/logo.png",
          resourceId:
            "000000000000000000000045804880de22913dafe09f4980848ece6ecbaf7801",
        },
        {
          address: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
          name: "Reputation",
          symbol: "REP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x5d785De7583F7a7dD124E20D00908cf60f37DBB3/logo.png",
          resourceId:
            "00000000000000000000001985365e9f78359a9b6ad760e32412f4a445e86201",
        },
        {
          address: "0x36F3FD68E7325a35EB768F1AedaAe9EA0689d723",
          name: "Empty Set Dollar",
          symbol: "ESD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xF3499d2fE8fcb1b8f10E007C793A42E2B8c7F5dF/logo.png",
          resourceId:
            "000000000000000000000036f3fd68e7325a35eb768f1aedaae9ea0689d72301",
        },
        {
          address: "0xfA5047c9c78B8877af97BDcb85Db743fD7313d4a",
          name: "ROOK",
          symbol: "ROOK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xea80968fbC9b52Ba7fe433c7bC72A011cb77d114/logo.png",
          resourceId:
            "0000000000000000000000fa5047c9c78b8877af97bdcb85db743fd7313d4a01",
        },
        {
          address: "0x0b38210ea11411557c13457D4dA7dC6ea731B88a",
          name: "API3",
          symbol: "API3",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x5A2f5A5c3F78acA93749535A58D0b52096aD8d04/logo.png",
          resourceId:
            "00000000000000000000000b38210ea11411557c13457d4da7dc6ea731b88a01",
        },
        {
          address: "0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC",
          name: "KEEP Token",
          symbol: "KEEP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xe4a52C6Bd6256fB34AC80e6882A145506D82596B/logo.png",
          resourceId:
            "000000000000000000000085eee30c52b0b379b046fb0f85f4f3dc3009afec01",
        },
        {
          address: "0xdc9Ac3C20D1ed0B540dF9b1feDC10039Df13F99c",
          name: "Utrust Token",
          symbol: "UTK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xDE99E14d23142aDf216f587fc3E4dA1b3b2cdb7e/logo.png",
          resourceId:
            "0000000000000000000000dc9ac3c20d1ed0b540df9b1fedc10039df13f99c01",
        },
        {
          address: "0x00a8b738E453fFd858a7edf03bcCfe20412f0Eb0",
          name: "AllianceBlock Token",
          symbol: "ALBT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xd8b9501c0A997AcbEC255642A620CaB473004C9F/logo.png",
          resourceId:
            "000000000000000000000000a8b738e453ffd858a7edf03bccfe20412f0eb001",
        },
        {
          address: "0xA15C7Ebe1f07CaF6bFF097D8a589fb8AC49Ae5B3",
          name: "Pundi X Token",
          symbol: "NPXS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x004D40072034ac8a4a8036a33efbeCdB3839901F/logo.png",
          resourceId:
            "0000000000000000000000a15c7ebe1f07caf6bff097d8a589fb8ac49ae5b301",
        },
        {
          address: "0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9",
          name: "Swipe",
          symbol: "SXP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xd3d28D81027D5db17Cea62e78597C41a1611e6D3/logo.png",
          resourceId:
            "00000000000000000000008ce9137d39326ad0cd6491fb5cc0cba0e089b6a901",
        },
        {
          address: "0x58b6A8A3302369DAEc383334672404Ee733aB239",
          name: "Livepeer Token",
          symbol: "LPT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x13971F0b076A78d3661410f0bB50447B7a7e8c51/logo.png",
          resourceId:
            "000000000000000000000058b6a8a3302369daec383334672404ee733ab23901",
        },
        {
          address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
          name: "Frax",
          symbol: "FRAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xCe3162863d3A35a4FE6FaE6d15e70c953b9Ae0fC/logo.png",
          resourceId:
            "0000000000000000000000853d955acef822db058eb8505911ed77f175b99e01",
        },
        {
          address: "0x2ba592F78dB6436527729929AAf6c908497cB200",
          name: "Cream",
          symbol: "CREAM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x859D55ee20Dc160ccD3279192cF2BAe629BbE850/logo.png",
          resourceId:
            "00000000000000000000002ba592f78db6436527729929aaf6c908497cb20001",
        },
        {
          address: "0x4fE83213D56308330EC302a8BD641f1d0113A4Cc",
          name: "NuCypher",
          symbol: "NU",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x0C586184Aa70Fa56E216F5c5cCb179952D3b31F9/logo.png",
          resourceId:
            "00000000000000000000004fe83213d56308330ec302a8bd641f1d0113a4cc01",
        },
        {
          address: "0x08d967bb0134F2d07f7cfb6E246680c53927DD30",
          name: "MATH Token",
          symbol: "MATH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xa1c897d3a288eA73e7325907b3df560708dA2E4f/logo.png",
          resourceId:
            "000000000000000000000008d967bb0134f2d07f7cfb6e246680c53927dd3001",
        },
        {
          address: "0x0d438F3b5175Bebc262bF23753C1E53d03432bDE",
          name: "Wrapped NXM",
          symbol: "wNXM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x49d664f0B929DD5cE4DEFae9a2B8212EfA5b81a8/logo.png",
          resourceId:
            "00000000000000000000000d438f3b5175bebc262bf23753c1e53d03432bde01",
        },
        {
          address: "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b",
          name: "DefiPulse Index",
          symbol: "DPI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x378635d2fB87fa904e6B029a2dF6d0206C3aba40/logo.png",
          resourceId:
            "00000000000000000000001494ca1f11d487c2bbe4543e90080aeba4ba3c2b01",
        },
        {
          address: "0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44",
          name: "Keep3rV1",
          symbol: "KP3R",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xFF545A694A15Fb9C357A7fd07D96462eF312f37B/logo.png",
          resourceId:
            "00000000000000000000001ceb5cb57c4d4e2b2433641b95dd330a33185a4401",
        },
        {
          address: "0x8290333ceF9e6D528dD5618Fb97a76f268f3EDD4",
          name: "Ankr Network",
          symbol: "ANKR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xE83121231E9e574512a7932b88361Cb5EC581e3D/logo.png",
          resourceId:
            "00000000000000000000008290333cef9e6d528dd5618fb97a76f268f3edd401",
        },
        {
          address: "0x9992eC3cF6A55b00978cdDF2b27BC6882d88D1eC",
          name: "Polymath",
          symbol: "POLY",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x7CF28aB2Ec2ff345d35f366dBb09B88d07A26cA5/logo.png",
          resourceId:
            "00000000000000000000009992ec3cf6a55b00978cddf2b27bc6882d88d1ec01",
        },
        {
          address: "0x6468e79A80C0eaB0F9A2B574c8d5bC374Af59414",
          name: "E-RADIX",
          symbol: "eXRD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x4A740a7874F9223437f0721f1c764DB675f8af7A/logo.png",
          resourceId:
            "00000000000000000000006468e79a80c0eab0f9a2b574c8d5bc374af5941401",
        },
        {
          address: "0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83",
          name: "YFII.finance",
          symbol: "YFII",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x34C903360d263d1A5b850C9cDAEe51753f1379f9/logo.png",
          resourceId:
            "0000000000000000000000a1d0e215a23d7030842fc67ce582a6afa3ccab8301",
        },
        {
          address: "0x0391D2021f89DC339F60Fff84546EA23E337750f",
          name: "BarnBridge Governance Token",
          symbol: "BOND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x282aD4e3Ece690325A9A6dB4a833EF8449297f43/logo.png",
          resourceId:
            "00000000000000000000000391d2021f89dc339f60fff84546ea23e337750f01",
        },
        {
          address: "0xB4EFd85c19999D84251304bDA99E90B92300Bd93",
          name: "Rocket Pool",
          symbol: "RPL",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x49df98915A2199361CFcA9d551224659EAa254d2/logo.png",
          resourceId:
            "0000000000000000000000b4efd85c19999d84251304bda99e90b92300bd9301",
        },
        {
          address: "0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e",
          name: "ELF Token",
          symbol: "ELF",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xF0C33Eaf14bAEA0b503a8B62B6Fcd537490f336A/logo.png",
          resourceId:
            "0000000000000000000000bf2179859fc6d5bee9bf9158632dc51678a4100e01",
        },
        {
          address: "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85",
          name: "Fetch",
          symbol: "FET",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB1f3d98C7772B8B9cd9551Ae1951F4D1d7c85179/logo.png",
          resourceId:
            "0000000000000000000000aea46a60368a7bd060eec7df8cba43b7ef41ad8501",
        },
        {
          address: "0xDF2C7238198Ad8B389666574f2d8bc411A4b7428",
          name: "Mainframe Token",
          symbol: "MFT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1E5daf1b63FcCdE7367EE010E5Bea0ba9E25d86f/logo.png",
          resourceId:
            "0000000000000000000000df2c7238198ad8b389666574f2d8bc411a4b742801",
        },
        {
          address: "0xe4815AE53B124e7263F08dcDBBB757d41Ed658c6",
          name: "Zks",
          symbol: "ZKS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x776B02244ad5D46F0610215fFe0BCa86a87cFb16/logo.png",
          resourceId:
            "0000000000000000000000e4815ae53b124e7263f08dcdbbb757d41ed658c601",
        },
        {
          address: "0x34950Ff2b487d9E5282c5aB342d08A2f712eb79F",
          name: "EFFORCE IEO",
          symbol: "WOZX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x27EB19330E5B29d8f28f8c36e8cfB7D0825F611b/logo.png",
          resourceId:
            "000000000000000000000034950ff2b487d9e5282c5ab342d08a2f712eb79f01",
        },
        {
          address: "0x83e6f1E41cdd28eAcEB20Cb649155049Fac3D5Aa",
          name: "PolkastarterToken",
          symbol: "POLS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x7D2A1DF100F8E2706D4e205ABC541d7Cf450721E/logo.png",
          resourceId:
            "000000000000000000000083e6f1e41cdd28eaceb20cb649155049fac3d5aa01",
        },
        {
          address: "0x40FD72257597aA14C7231A7B1aaa29Fce868F677",
          name: "Sora Token",
          symbol: "XOR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x53ff216b6E0f40C5c3db74E282BCe861A70eD3dd/logo.png",
          resourceId:
            "000000000000000000000040fd72257597aa14c7231a7b1aaa29fce868f67701",
        },
        {
          address: "0x0Ae055097C6d159879521C384F1D2123D1f195e6",
          name: "STAKE",
          symbol: "STAKE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8151c35acc58EbD060aBac319C8FA425Aa09a5f8/logo.png",
          resourceId:
            "00000000000000000000000ae055097c6d159879521c384f1d2123d1f195e601",
        },
        {
          address: "0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa",
          name: "tBTC",
          symbol: "TBTC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x9902f53cB02226c30EdF85E71Ca36D16A1BF6798/logo.png",
          resourceId:
            "00000000000000000000008daebade922df735c38c80c7ebd708af50815faa01",
        },
        {
          address: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
          name: "SAND",
          symbol: "SAND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x33Be9b2Cc4d5a4F52F28f6fA4d9038Ab38aFa0De/logo.png",
          resourceId:
            "00000000000000000000003845badade8e6dff049820680d1f14bd3903a5d001",
        },
        {
          address: "0xaA7a9CA87d3694B5755f213B5D04094b8d0F0A6F",
          name: "Trace Token",
          symbol: "TRAC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xcD8c548b5362DfF9Df6090Fe180526071a3d97d1/logo.png",
          resourceId:
            "0000000000000000000000aa7a9ca87d3694b5755f213b5d04094b8d0f0a6f01",
        },
        {
          address: "0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0",
          name: "LoomToken",
          symbol: "LOOM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x9A2ea0f24a0B293A68c781BC73Ee25569d406767/logo.png",
          resourceId:
            "0000000000000000000000a4e8c3ec456107ea67d3075bf9e3df3a75823db001",
        },
        {
          address: "0xb753428af26E81097e7fD17f40c88aaA3E04902c",
          name: "Spice",
          symbol: "SFI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x7785022B6e8CF085df8a3aD053D8c8AfD16A8F0C/logo.png",
          resourceId:
            "0000000000000000000000b753428af26e81097e7fd17f40c88aaa3e04902c01",
        },
        {
          address: "0x8Ab7404063Ec4DBcfd4598215992DC3F8EC853d7",
          name: "Akropolis",
          symbol: "AKRO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x09Ff97AA422A897e10e47ab07bc8AA5e04c915Ba/logo.png",
          resourceId:
            "00000000000000000000008ab7404063ec4dbcfd4598215992dc3f8ec853d701",
        },
        {
          address: "0xa0246c9032bC3A600820415aE600c6388619A14D",
          name: "FARM Reward Token",
          symbol: "FARM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xBdfdF2202CE3dBc4A2B7914Fb3C9e10002F94f38/logo.png",
          resourceId:
            "0000000000000000000000a0246c9032bc3a600820415ae600c6388619a14d01",
        },
        {
          address: "0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419",
          name: "DIAToken",
          symbol: "DIA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x646b9335Ecff0AB98d7ED1982B94cA42ACeB22F7/logo.png",
          resourceId:
            "000000000000000000000084ca8bc7997272c7cfb4d0cd3d55cd942b3c941901",
        },
        {
          address: "0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2",
          name: "Meta",
          symbol: "MTA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x496E08F44D3cEdeCC704956Cd0dd85af14827EaF/logo.png",
          resourceId:
            "0000000000000000000000a3bed4e1c75d00fa6f4e5e6922db7261b5e9acd201",
        },
        {
          address: "0xF5D669627376EBd411E34b98F19C868c8ABA5ADA",
          name: "Axie Infinity Shard",
          symbol: "AXS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC3DA635246a199b631203E85D6FCD45FbbCb5b2b/logo.png",
          resourceId:
            "0000000000000000000000f5d669627376ebd411e34b98f19c868c8aba5ada01",
        },
        {
          address: "0xADE00C28244d5CE17D72E40330B1c318cD12B7c3",
          name: "AdEx Network",
          symbol: "ADX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x4F47eC61451FAFc3d26D190541Eb92253419D99f/logo.png",
          resourceId:
            "0000000000000000000000ade00c28244d5ce17d72e40330b1c318cd12b7c301",
        },
        {
          address: "0xD9Ec3ff1f8be459Bb9369b4E79e9Ebcf7141C093",
          name: "KardiaChain Token",
          symbol: "KAI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1306CCbCe7D88372c68eB2d81Ecc6a8E7C1b12bF/logo.png",
          resourceId:
            "0000000000000000000000d9ec3ff1f8be459bb9369b4e79e9ebcf7141c09301",
        },
        {
          address: "0xec67005c4E498Ec7f55E092bd1d35cbC47C91892",
          name: "Melon Token",
          symbol: "MLN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xF10681D62e4B6a482584665862A027113eF6CE4D/logo.png",
          resourceId:
            "0000000000000000000000ec67005c4e498ec7f55e092bd1d35cbc47c9189201",
        },
        {
          address: "0xFbEEa1C75E4c4465CB2FCCc9c6d6afe984558E20",
          name: "DuckDaoDime",
          symbol: "DDIM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x091aE9288A34AEF2D63588C59baEc3ab6FB46Ac2/logo.png",
          resourceId:
            "0000000000000000000000fbeea1c75e4c4465cb2fccc9c6d6afe984558e2001",
        },
        {
          address: "0x33D0568941C0C64ff7e0FB4fbA0B11BD37deEd9f",
          name: "RAMP DEFI",
          symbol: "RAMP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xF467d19343E4e2D2838C0164B9034bBF0B25B807/logo.png",
          resourceId:
            "000000000000000000000033d0568941c0c64ff7e0fb4fba0b11bd37deed9f01",
        },
        {
          address: "0xEA26c4aC16D4a5A106820BC8AEE85fd0b7b2b664",
          name: "QuarkChain Token",
          symbol: "QKC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x88654768172578d302691c59E7898d48763eBaC9/logo.png",
          resourceId:
            "0000000000000000000000ea26c4ac16d4a5a106820bc8aee85fd0b7b2b66401",
        },
        {
          address: "0xb683D83a532e2Cb7DFa5275eED3698436371cc9f",
          name: "BTU Protocol",
          symbol: "BTU",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x33c22a61afa06083c8dc7894f4ca27a45B89A5b5/logo.png",
          resourceId:
            "0000000000000000000000b683d83a532e2cb7dfa5275eed3698436371cc9f01",
        },
        {
          address: "0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7",
          name: "cVault.finance",
          symbol: "CORE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB1311550790054F94000f51A8F84674811cDAc24/logo.png",
          resourceId:
            "000000000000000000000062359ed7505efc61ff1d56fef82158ccaffa23d701",
        },
        {
          address: "0x0Cf0Ee63788A0849fE5297F3407f701E122cC023",
          name: "Streamr DATAcoin",
          symbol: "DATA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x884F0Eb3061A3D9d61B35dC4d722DCDEBDEa49Ce/logo.png",
          resourceId:
            "00000000000000000000000cf0ee63788a0849fe5297f3407f701e122cc02301",
        },
        {
          address: "0x8888801aF4d980682e47f1A9036e589479e835C5",
          name: "88mph.app",
          symbol: "MPH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x73842d48d56923801A16336B45E7A8A341dEBFA5/logo.png",
          resourceId:
            "00000000000000000000008888801af4d980682e47f1a9036e589479e835c501",
        },
        {
          address: "0x8207c1FfC5B6804F6024322CcF34F29c3541Ae26",
          name: "OriginToken",
          symbol: "OGN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3f2620717a6132AD822d8Ec20cc7cBCBc6d0621A/logo.png",
          resourceId:
            "00000000000000000000008207c1ffc5b6804f6024322ccf34f29c3541ae2601",
        },
        {
          address: "0xBD2F0Cd039E0BFcf88901C98c0bFAc5ab27566e3",
          name: "Dynamic Set Dollar",
          symbol: "DSD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x7b459f64Bf916859A9DB6dE7fE240BFe8CF52DD1/logo.png",
          resourceId:
            "0000000000000000000000bd2f0cd039e0bfcf88901c98c0bfac5ab27566e301",
        },
        {
          address: "0x6c5bA91642F10282b576d91922Ae6448C9d52f4E",
          name: "Phala",
          symbol: "PHA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xDEf1b9DbdCDdB2E40526153Cd3E600ddAD32b297/logo.png",
          resourceId:
            "00000000000000000000006c5ba91642f10282b576d91922ae6448c9d52f4e01",
        },
      ],
    },
    {
      chainId: 2,
      networkId: 43114,
      name: "Avalanche",
      bridgeAddress: "0x32E35B48e10cAA2eD433486287B1f39207D1b39F",
      erc20HandlerAddress: "0x96B845aBE346b49135B865E5CeDD735FC448C3aD",
      rpcUrl: "wss://api.avax.network/ext/bc/C/ws",
      type: "Ethereum",
      blockExplorer: "https://cchain.explorer.avax.network/tx",
      nativeTokenSymbol: "AVAX",
      defaultGasPrice: 470,
      tokens: [
        {
          address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
          name: "Wrapped Avalanche",
          symbol: "WAVAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xdF3aCC3460965996FF496Cb9D0CF9E6859545a86/logo.png",
          resourceId:
            "0x00000000000000000000009dEbca6eA3af87Bf422Cea9ac955618ceb56EfB402",
          isNativeWrappedToken: true,
        },
        {
          address: "0x3a755C20913b9bE05Da94f72A4027B9755b4fF85",
          name: "Ethereum",
          symbol: "ETH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3a755C20913b9bE05Da94f72A4027B9755b4fF85/logo.png",
          resourceId:
            "0000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc201",
        },
        {
          address: "0x55212B038624D9FaB4D1A65e23f7744d5f0D014A",
          name: "Chain Link",
          symbol: "LINK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x55212B038624D9FaB4D1A65e23f7744d5f0D014A/logo.png",
          resourceId:
            "0000000000000000000000514910771af9ca656af840dff83e8264ecf986ca01",
        },
        {
          address: "0xdF3aCC3460965996FF496Cb9D0CF9E6859545a86",
          name: "Uniswap",
          symbol: "UNI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xdF3aCC3460965996FF496Cb9D0CF9E6859545a86/logo.png",
          resourceId:
            "00000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98401",
        },
        {
          address: "0x217446Ce09AA183a9034f4FF20d31b9268427187",
          name: "Aave Token",
          symbol: "AAVE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x217446Ce09AA183a9034f4FF20d31b9268427187/logo.png",
          resourceId:
            "00000000000000000000007fc66500c84a76ad7e9c93437bfc5ac33e2ddae901",
        },
        {
          address: "0x88f47B5fCdC85A0D80E89A9DfA27694c6e408646",
          name: "Synthetix Network Token",
          symbol: "SNX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x88f47B5fCdC85A0D80E89A9DfA27694c6e408646/logo.png",
          resourceId:
            "0000000000000000000000c011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f01",
        },
        {
          address: "0x2DCA6503946d29Ca8d1C87A247ef122652B03c0e",
          name: "DaiStablecoin",
          symbol: "DAI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2DCA6503946d29Ca8d1C87A247ef122652B03c0e/logo.png",
          resourceId:
            "00000000000000000000006b175474e89094c44da98b954eedeac495271d0f01",
        },
        {
          address: "0x3677638067FeD0B12f2916197c468a0aed52D99A",
          name: "Binance USD",
          symbol: "BUSD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3677638067FeD0B12f2916197c468a0aed52D99A/logo.png",
          resourceId:
            "00000000000000000000004fabb145d64652a948d72533023f6e7a623c7c5301",
        },
        {
          address: "0xAF3b5ac3BC6901CC73E8668C84A613DeEF1829B1",
          name: "Huobi Token",
          symbol: "HT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xAF3b5ac3BC6901CC73E8668C84A613DeEF1829B1/logo.png",
          resourceId:
            "00000000000000000000006f259637dcd74c767781e37bc6133cd6a68aa16101",
        },
        {
          address: "0x44fC678eb98c47b2b0564b455132c91b781a62d4",
          name: "Sushi Token",
          symbol: "SUSHI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x44fC678eb98c47b2b0564b455132c91b781a62d4/logo.png",
          resourceId:
            "00000000000000000000006b3595068778dd592e39a122f4f5a5cf09c90fe201",
        },
        {
          address: "0x1C4EcE4cd3756a5fD19DbA02Aa54BC8cE0F82875",
          name: "Compound",
          symbol: "COMP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1C4EcE4cd3756a5fD19DbA02Aa54BC8cE0F82875/logo.png",
          resourceId:
            "0000000000000000000000c00e94cb662c3520282e6f5717214004a7f2688801",
        },
        {
          address: "0x2400EA5E0f56D6f8bF14c1c52EebAdE24b4542f3",
          name: "yearn.finance",
          symbol: "YFI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2400EA5E0f56D6f8bF14c1c52EebAdE24b4542f3/logo.png",
          resourceId:
            "00000000000000000000000bc529c00c6401aef6d220be8c6ea1667f6ad93e01",
        },
        {
          address: "0x46B96f0f9cd34C87b04B50ecA5b7E7FC3FCb7600",
          name: "Huobi BTC",
          symbol: "HBTC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x46B96f0f9cd34C87b04B50ecA5b7E7FC3FCb7600/logo.png",
          resourceId:
            "00000000000000000000000316eb71485b0ab14103307bf65a021042c6d38001",
        },
        {
          address: "0x257ac56097bA2333384d14B4e183668a747fFB0d",
          name: "THORChain ETH.RUNE",
          symbol: "RUNE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x257ac56097bA2333384d14B4e183668a747fFB0d/logo.png",
          resourceId:
            "00000000000000000000003155ba85d5f96b2d030a4966af206230e46849cb01",
        },
        {
          address: "0x2F5CcB2199a24e43f18f1583bAfeDd4Fc5c78d0D",
          name: "Graph Token",
          symbol: "GRT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2F5CcB2199a24e43f18f1583bAfeDd4Fc5c78d0D/logo.png",
          resourceId:
            "0000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a701",
        },
        {
          address: "0x4480b7bb890219DA5a1F5e7dF8feC40Bbe223c4A",
          name: "Paxos Standard",
          symbol: "PAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x4480b7bb890219DA5a1F5e7dF8feC40Bbe223c4A/logo.png",
          resourceId:
            "00000000000000000000008e870d67f660d95d5be530380d0ec0bd388289e101",
        },
        {
          address: "0x660D0D11d8bC1A6f6CBD2d0dF8e567351fd92B5D",
          name: "UMAVoting Tokenv1",
          symbol: "UMA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x660D0D11d8bC1A6f6CBD2d0dF8e567351fd92B5D/logo.png",
          resourceId:
            "000000000000000000000004fa0d235c4abf4bcf4787af4cf447de572ef82801",
        },
        {
          address: "0x283EaC7764F7f30A5E7483d7917e0a30DD30e6D3",
          name: "Loopring",
          symbol: "LRC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x283EaC7764F7f30A5E7483d7917e0a30DD30e6D3/logo.png",
          resourceId:
            "0000000000000000000000bbbbca6a901c926f240b89eacb641d8aec7aeafd01",
        },
        {
          address: "0x3e55c6230ED5DdF068B7aC0Ce0Bb4cA4a5cDDE1D",
          name: "Republic",
          symbol: "REN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3e55c6230ED5DdF068B7aC0Ce0Bb4cA4a5cDDE1D/logo.png",
          resourceId:
            "0000000000000000000000408e41876cccdc0f92210600ef50372656052a3801",
        },
        {
          address: "0xa9250f85351060c84976e4E3E2b73AD0F78D846f",
          name: "Omise GO",
          symbol: "OMG",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xa9250f85351060c84976e4E3E2b73AD0F78D846f/logo.png",
          resourceId:
            "0000000000000000000000d26114cd6ee289accf82350c8d8487fedb8a0c0701",
        },
        {
          address: "0xC0a9c341FF5531677214dFB7B4ACEDa63f92b6f0",
          name: "0x Protocol",
          symbol: "ZRX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC0a9c341FF5531677214dFB7B4ACEDa63f92b6f0/logo.png",
          resourceId:
            "0000000000000000000000e41d2489571d322189246dafa5ebde1f4699f49801",
        },
        {
          address: "0xAd544CD2F421A1cC75162CFE9AD83E71eCD35E70",
          name: "Basic Attention Token",
          symbol: "BAT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xAd544CD2F421A1cC75162CFE9AD83E71eCD35E70/logo.png",
          resourceId:
            "00000000000000000000000d8775f648430679a709e98d2b0cb6250d2887ef01",
        },
        {
          address: "0xaF282388314906444c2360022686C34d37Ce3553",
          name: "Nexo",
          symbol: "NEXO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xaF282388314906444c2360022686C34d37Ce3553/logo.png",
          resourceId:
            "0000000000000000000000b62132e35a6c13ee1ee0f84dc5d40bad8d81520601",
        },
        {
          address: "0x585Ff0bceb851125AE83366159211B11604C3f98",
          name: "Stox",
          symbol: "STX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x585Ff0bceb851125AE83366159211B11604C3f98/logo.png",
          resourceId:
            "0000000000000000000000006bea43baa3f7a6f765f14f10a1a1b08334ef4501",
        },
        {
          address: "0xbA5b7348e935cf38A5dA932d70ac6458Ae1530B0",
          name: "True USD",
          symbol: "TUSD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xbA5b7348e935cf38A5dA932d70ac6458Ae1530B0/logo.png",
          resourceId:
            "00000000000000000000000000000000085d4780b73119b644ae5ecd22b37601",
        },
        {
          address: "0x06f647C4211C832e430B344B2B1853f31FcBB044",
          name: "Enjin Coin",
          symbol: "ENJ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x06f647C4211C832e430B344B2B1853f31FcBB044/logo.png",
          resourceId:
            "0000000000000000000000f629cbd94d3791c9250152bd8dfbdf380e2a3b9c01",
        },
        {
          address: "0xFCff2a29B30fd9dF139919BB88C735c1Fd85E1B1",
          name: "Reserve Rights",
          symbol: "RSR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xFCff2a29B30fd9dF139919BB88C735c1Fd85E1B1/logo.png",
          resourceId:
            "00000000000000000000008762db106b2c2a0bccb3a80d1ed41273552616e801",
        },
        {
          address: "0xcF257Ad5B3CCDD21b83F356D14EFc6a0B00E269c",
          name: "Quant",
          symbol: "QNT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xcF257Ad5B3CCDD21b83F356D14EFc6a0B00E269c/logo.png",
          resourceId:
            "00000000000000000000004a220e6096b25eadb88358cb44068a324825467501",
        },
        {
          address: "0x1fe49ECEDEb6D30Dc873A9BEba0f448213c913DF",
          name: "Alpha Token",
          symbol: "ALPHA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1fe49ECEDEb6D30Dc873A9BEba0f448213c913DF/logo.png",
          resourceId:
            "0000000000000000000000a1faa113cbe53436df28ff0aee54275c13b4097501",
        },
        {
          address: "0x9982506E33D2dD0db0F9faFbE5732dcc4f1256B3",
          name: "1INCHToken",
          symbol: "1INCH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x9982506E33D2dD0db0F9faFbE5732dcc4f1256B3/logo.png",
          resourceId:
            "0000000000000000000000111111111117dc0aa78b770fa6a738034120c30201",
        },
        {
          address: "0x15F4A63eEC28bDbc586a166c64c0310A36d7EB0e",
          name: "Kyber Network",
          symbol: "KNC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x15F4A63eEC28bDbc586a166c64c0310A36d7EB0e/logo.png",
          resourceId:
            "0000000000000000000000dd974d5c2e2928dea5f71b9825b8b646686bd20001",
        },
        {
          address: "0x0781717A3F10b540262A494B00D04240F966c75C",
          name: "Ocean Token",
          symbol: "OCEAN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x0781717A3F10b540262A494B00D04240F966c75C/logo.png",
          resourceId:
            "0000000000000000000000967da4048cd07ab37855c090aaf366e4ce1b9f4801",
        },
        {
          address: "0xe952253C9fee85847cBF33840E3866b3465CCF5d",
          name: "Balancer",
          symbol: "BAL",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xe952253C9fee85847cBF33840E3866b3465CCF5d/logo.png",
          resourceId:
            "0000000000000000000000ba100000625a3754423978a60c9317c58a424e3d01",
        },
        {
          address: "0x55920e46da62b072C6097c7B921fA36487039933",
          name: "Bancor",
          symbol: "BNT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x55920e46da62b072C6097c7B921fA36487039933/logo.png",
          resourceId:
            "00000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c01",
        },
        {
          address: "0x709Ea716F7536aF65fd1FeF506969dae0D0B0913",
          name: "Eth Lend",
          symbol: "LEND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x709Ea716F7536aF65fd1FeF506969dae0D0B0913/logo.png",
          resourceId:
            "000000000000000000000080fb784b7ed66730e8b1dbd9820afd29931aab0301",
        },
        {
          address: "0xD43A77477a48394A2693e2B31817Bfa50e31220C",
          name: "Matic Token",
          symbol: "MATIC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xD43A77477a48394A2693e2B31817Bfa50e31220C/logo.png",
          resourceId:
            "00000000000000000000007d1afa7b718fb893db30a3abc0cfc608aacfebb001",
        },
        {
          address: "0x8eA0F20fC4e56e553e07ac82dC36655EfC8419e6",
          name: "Mana",
          symbol: "MANA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8eA0F20fC4e56e553e07ac82dC36655EfC8419e6/logo.png",
          resourceId:
            "00000000000000000000000f5d2fb29fb7d3cfee444a200298f468908cc94201",
        },
        {
          address: "0xe69b823A4050b2B84651d255eF417B598aF44918",
          name: "Band Protocol",
          symbol: "BAND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xe69b823A4050b2B84651d255eF417B598aF44918/logo.png",
          resourceId:
            "0000000000000000000000ba11d00c5f74255f56a5e366f4f77f5a186d7f5501",
        },
        {
          address: "0xE8d81233f93E082a90ABAEC2fafC5716Fe60bf4d",
          name: "Gnosis",
          symbol: "GNO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xE8d81233f93E082a90ABAEC2fafC5716Fe60bf4d/logo.png",
          resourceId:
            "00000000000000000000006810e776880c02933d47db1b9fc05908e5386b9601",
        },
        {
          address: "0xFc3F561363E3d0E8D20F5dFa8A44F1742E9d4f92",
          name: "Parsiq Token",
          symbol: "PRQ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xFc3F561363E3d0E8D20F5dFa8A44F1742E9d4f92/logo.png",
          resourceId:
            "0000000000000000000000362bc847a3a9637d3af6624eec853618a43ed7d201",
        },
        {
          address: "0xda9759cc1029f006faFFE233AE94F135706D25ff",
          name: "Numeraire",
          symbol: "NMR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xda9759cc1029f006faFFE233AE94F135706D25ff/logo.png",
          resourceId:
            "00000000000000000000001776e1f26f98b1a5df9cd347953a26dd3cb4667101",
        },
        {
          address: "0x9865f6C534948Cd09FC034fF0c11a0593CaB7D19",
          name: "Aragon Network Token",
          symbol: "ANT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x9865f6C534948Cd09FC034fF0c11a0593CaB7D19/logo.png",
          resourceId:
            "0000000000000000000000a117000000f279d81a1d3cc75430faa017fa5a2e01",
        },
        {
          address: "0xB96B862b0A02980489761b7C2528977f0A4088C7",
          name: "Holo Token",
          symbol: "HOT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB96B862b0A02980489761b7C2528977f0A4088C7/logo.png",
          resourceId:
            "00000000000000000000006c6ee5e31d828de241282b9606c8e98ea48526e201",
        },
        {
          address: "0x0a31D39325B061d53F03f080eD1947F43B93573a",
          name: "Perpetual",
          symbol: "PERP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x0a31D39325B061d53F03f080eD1947F43B93573a/logo.png",
          resourceId:
            "0000000000000000000000bc396689893d065f41bc2c6ecbee5e008523344701",
        },
        {
          address: "0x3ef106483AdC9A3fe6e6Ad363e0bB9169F4544d6",
          name: "Hegic",
          symbol: "HEGIC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3ef106483AdC9A3fe6e6Ad363e0bB9169F4544d6/logo.png",
          resourceId:
            "0000000000000000000000584bc13c7d411c00c01a62e8019472de6876843001",
        },
        {
          address: "0x5Aa3cDF45F6C1EC79C04811E7b754bb520Ae7dD0",
          name: "Injective Token",
          symbol: "INJ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x5Aa3cDF45F6C1EC79C04811E7b754bb520Ae7dD0/logo.png",
          resourceId:
            "0000000000000000000000e28b3b32b6c345a34ff64674606124dd5aceca3001",
        },
        {
          address: "0x2A37F6E3a3682f250b4CffF46B0Fd77303a2551e",
          name: "Paxos Gold",
          symbol: "PAXG",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2A37F6E3a3682f250b4CffF46B0Fd77303a2551e/logo.png",
          resourceId:
            "000000000000000000000045804880de22913dafe09f4980848ece6ecbaf7801",
        },
        {
          address: "0x5d785De7583F7a7dD124E20D00908cf60f37DBB3",
          name: "Augur",
          symbol: "REP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x5d785De7583F7a7dD124E20D00908cf60f37DBB3/logo.png",
          resourceId:
            "00000000000000000000001985365e9f78359a9b6ad760e32412f4a445e86201",
        },
        {
          address: "0xF3499d2fE8fcb1b8f10E007C793A42E2B8c7F5dF",
          name: "Empty Set Dollar",
          symbol: "ESD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xF3499d2fE8fcb1b8f10E007C793A42E2B8c7F5dF/logo.png",
          resourceId:
            "000000000000000000000036f3fd68e7325a35eb768f1aedaae9ea0689d72301",
        },
        {
          address: "0xea80968fbC9b52Ba7fe433c7bC72A011cb77d114",
          name: "ROOK",
          symbol: "ROOK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xea80968fbC9b52Ba7fe433c7bC72A011cb77d114/logo.png",
          resourceId:
            "0000000000000000000000fa5047c9c78b8877af97bdcb85db743fd7313d4a01",
        },
        {
          address: "0x5A2f5A5c3F78acA93749535A58D0b52096aD8d04",
          name: "API3",
          symbol: "API3",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x5A2f5A5c3F78acA93749535A58D0b52096aD8d04/logo.png",
          resourceId:
            "00000000000000000000000b38210ea11411557c13457d4da7dc6ea731b88a01",
        },
        {
          address: "0xe4a52C6Bd6256fB34AC80e6882A145506D82596B",
          name: "KEEPToken",
          symbol: "KEEP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xe4a52C6Bd6256fB34AC80e6882A145506D82596B/logo.png",
          resourceId:
            "000000000000000000000085eee30c52b0b379b046fb0f85f4f3dc3009afec01",
        },
        {
          address: "0xDE99E14d23142aDf216f587fc3E4dA1b3b2cdb7e",
          name: "Utrust Token",
          symbol: "UTK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xDE99E14d23142aDf216f587fc3E4dA1b3b2cdb7e/logo.png",
          resourceId:
            "0000000000000000000000dc9ac3c20d1ed0b540df9b1fedc10039df13f99c01",
        },
        {
          address: "0xd8b9501c0A997AcbEC255642A620CaB473004C9F",
          name: "Alliance Block Token",
          symbol: "ALBT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xd8b9501c0A997AcbEC255642A620CaB473004C9F/logo.png",
          resourceId:
            "000000000000000000000000a8b738e453ffd858a7edf03bccfe20412f0eb001",
        },
        {
          address: "0x004D40072034ac8a4a8036a33efbeCdB3839901F",
          name: "Pundi X",
          symbol: "NPXS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x004D40072034ac8a4a8036a33efbeCdB3839901F/logo.png",
          resourceId:
            "0000000000000000000000a15c7ebe1f07caf6bff097d8a589fb8ac49ae5b301",
        },
        {
          address: "0xd3d28D81027D5db17Cea62e78597C41a1611e6D3",
          name: "Swipe",
          symbol: "SXP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xd3d28D81027D5db17Cea62e78597C41a1611e6D3/logo.png",
          resourceId:
            "00000000000000000000008ce9137d39326ad0cd6491fb5cc0cba0e089b6a901",
        },
        {
          address: "0x13971F0b076A78d3661410f0bB50447B7a7e8c51",
          name: "Livepeer Token",
          symbol: "LPT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x13971F0b076A78d3661410f0bB50447B7a7e8c51/logo.png",
          resourceId:
            "000000000000000000000058b6a8a3302369daec383334672404ee733ab23901",
        },
        {
          address: "0xCe3162863d3A35a4FE6FaE6d15e70c953b9Ae0fC",
          name: "Frax",
          symbol: "FRAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xCe3162863d3A35a4FE6FaE6d15e70c953b9Ae0fC/logo.png",
          resourceId:
            "0000000000000000000000853d955acef822db058eb8505911ed77f175b99e01",
        },
        {
          address: "0x859D55ee20Dc160ccD3279192cF2BAe629BbE850",
          name: "Cream",
          symbol: "CREAM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x859D55ee20Dc160ccD3279192cF2BAe629BbE850/logo.png",
          resourceId:
            "00000000000000000000002ba592f78db6436527729929aaf6c908497cb20001",
        },
        {
          address: "0x0C586184Aa70Fa56E216F5c5cCb179952D3b31F9",
          name: "Nu Cypher",
          symbol: "NU",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x0C586184Aa70Fa56E216F5c5cCb179952D3b31F9/logo.png",
          resourceId:
            "00000000000000000000004fe83213d56308330ec302a8bd641f1d0113a4cc01",
        },
        {
          address: "0xa1c897d3a288eA73e7325907b3df560708dA2E4f",
          name: "MATHToken",
          symbol: "MATH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xa1c897d3a288eA73e7325907b3df560708dA2E4f/logo.png",
          resourceId:
            "000000000000000000000008d967bb0134f2d07f7cfb6e246680c53927dd3001",
        },
        {
          address: "0x49d664f0B929DD5cE4DEFae9a2B8212EfA5b81a8",
          name: "Wrapped NXM",
          symbol: "wNXM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x49d664f0B929DD5cE4DEFae9a2B8212EfA5b81a8/logo.png",
          resourceId:
            "00000000000000000000000d438f3b5175bebc262bf23753c1e53d03432bde01",
        },
        {
          address: "0x378635d2fB87fa904e6B029a2dF6d0206C3aba40",
          name: "Defi Pulse Index",
          symbol: "DPI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x378635d2fB87fa904e6B029a2dF6d0206C3aba40/logo.png",
          resourceId:
            "00000000000000000000001494ca1f11d487c2bbe4543e90080aeba4ba3c2b01",
        },
        {
          address: "0xFF545A694A15Fb9C357A7fd07D96462eF312f37B",
          name: "Keep3r V1",
          symbol: "KP3R",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xFF545A694A15Fb9C357A7fd07D96462eF312f37B/logo.png",
          resourceId:
            "00000000000000000000001ceb5cb57c4d4e2b2433641b95dd330a33185a4401",
        },
        {
          address: "0xE83121231E9e574512a7932b88361Cb5EC581e3D",
          name: "Ankr Network",
          symbol: "ANKR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xE83121231E9e574512a7932b88361Cb5EC581e3D/logo.png",
          resourceId:
            "00000000000000000000008290333cef9e6d528dd5618fb97a76f268f3edd401",
        },
        {
          address: "0x7CF28aB2Ec2ff345d35f366dBb09B88d07A26cA5",
          name: "Polymath",
          symbol: "POLY",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x7CF28aB2Ec2ff345d35f366dBb09B88d07A26cA5/logo.png",
          resourceId:
            "00000000000000000000009992ec3cf6a55b00978cddf2b27bc6882d88d1ec01",
        },
        {
          address: "0x4A740a7874F9223437f0721f1c764DB675f8af7A",
          name: "E-RADIX",
          symbol: "eXRD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x4A740a7874F9223437f0721f1c764DB675f8af7A/logo.png",
          resourceId:
            "00000000000000000000006468e79a80c0eab0f9a2b574c8d5bc374af5941401",
        },
        {
          address: "0x34C903360d263d1A5b850C9cDAEe51753f1379f9",
          name: "YFII.finance",
          symbol: "YFII",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x34C903360d263d1A5b850C9cDAEe51753f1379f9/logo.png",
          resourceId:
            "0000000000000000000000a1d0e215a23d7030842fc67ce582a6afa3ccab8301",
        },
        {
          address: "0x282aD4e3Ece690325A9A6dB4a833EF8449297f43",
          name: "Barn Bridge Governance Token",
          symbol: "BOND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x282aD4e3Ece690325A9A6dB4a833EF8449297f43/logo.png",
          resourceId:
            "00000000000000000000000391d2021f89dc339f60fff84546ea23e337750f01",
        },
        {
          address: "0x49df98915A2199361CFcA9d551224659EAa254d2",
          name: "Rocket Pool",
          symbol: "RPL",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x49df98915A2199361CFcA9d551224659EAa254d2/logo.png",
          resourceId:
            "0000000000000000000000b4efd85c19999d84251304bda99e90b92300bd9301",
        },
        {
          address: "0xF0C33Eaf14bAEA0b503a8B62B6Fcd537490f336A",
          name: "Aelf",
          symbol: "ELF",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xF0C33Eaf14bAEA0b503a8B62B6Fcd537490f336A/logo.png",
          resourceId:
            "0000000000000000000000bf2179859fc6d5bee9bf9158632dc51678a4100e01",
        },
        {
          address: "0xB1f3d98C7772B8B9cd9551Ae1951F4D1d7c85179",
          name: "Fetch",
          symbol: "FET",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB1f3d98C7772B8B9cd9551Ae1951F4D1d7c85179/logo.png",
          resourceId:
            "0000000000000000000000aea46a60368a7bd060eec7df8cba43b7ef41ad8501",
        },
        {
          address: "0x1E5daf1b63FcCdE7367EE010E5Bea0ba9E25d86f",
          name: "Mainframe",
          symbol: "MFT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1E5daf1b63FcCdE7367EE010E5Bea0ba9E25d86f/logo.png",
          resourceId:
            "0000000000000000000000df2c7238198ad8b389666574f2d8bc411a4b742801",
        },
        {
          address: "0x776B02244ad5D46F0610215fFe0BCa86a87cFb16",
          name: "Zks",
          symbol: "ZKS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x776B02244ad5D46F0610215fFe0BCa86a87cFb16/logo.png",
          resourceId:
            "0000000000000000000000e4815ae53b124e7263f08dcdbbb757d41ed658c601",
        },
        {
          address: "0x27EB19330E5B29d8f28f8c36e8cfB7D0825F611b",
          name: "EFFORCEIEO",
          symbol: "WOZX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x27EB19330E5B29d8f28f8c36e8cfB7D0825F611b/logo.png",
          resourceId:
            "000000000000000000000034950ff2b487d9e5282c5ab342d08a2f712eb79f01",
        },
        {
          address: "0x7D2A1DF100F8E2706D4e205ABC541d7Cf450721E",
          name: "Polkastarter Token",
          symbol: "POLS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x7D2A1DF100F8E2706D4e205ABC541d7Cf450721E/logo.png",
          resourceId:
            "000000000000000000000083e6f1e41cdd28eaceb20cb649155049fac3d5aa01",
        },
        {
          address: "0x53ff216b6E0f40C5c3db74E282BCe861A70eD3dd",
          name: "Sora Token",
          symbol: "XOR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x53ff216b6E0f40C5c3db74E282BCe861A70eD3dd/logo.png",
          resourceId:
            "000000000000000000000040fd72257597aa14c7231a7b1aaa29fce868f67701",
        },
        {
          address: "0x8151c35acc58EbD060aBac319C8FA425Aa09a5f8",
          name: "STAKE",
          symbol: "STAKE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8151c35acc58EbD060aBac319C8FA425Aa09a5f8/logo.png",
          resourceId:
            "00000000000000000000000ae055097c6d159879521c384f1d2123d1f195e601",
        },
        {
          address: "0x9902f53cB02226c30EdF85E71Ca36D16A1BF6798",
          name: "tBTC",
          symbol: "tBTC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x9902f53cB02226c30EdF85E71Ca36D16A1BF6798/logo.png",
          resourceId:
            "00000000000000000000008daebade922df735c38c80c7ebd708af50815faa01",
        },
        {
          address: "0x33Be9b2Cc4d5a4F52F28f6fA4d9038Ab38aFa0De",
          name: "SAND",
          symbol: "SAND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x33Be9b2Cc4d5a4F52F28f6fA4d9038Ab38aFa0De/logo.png",
          resourceId:
            "00000000000000000000003845badade8e6dff049820680d1f14bd3903a5d001",
        },
        {
          address: "0xcD8c548b5362DfF9Df6090Fe180526071a3d97d1",
          name: "Trace",
          symbol: "TRAC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xcD8c548b5362DfF9Df6090Fe180526071a3d97d1/logo.png",
          resourceId:
            "0000000000000000000000aa7a9ca87d3694b5755f213b5d04094b8d0f0a6f01",
        },
        {
          address: "0x9A2ea0f24a0B293A68c781BC73Ee25569d406767",
          name: "Loom Network",
          symbol: "LOOM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x9A2ea0f24a0B293A68c781BC73Ee25569d406767/logo.png",
          resourceId:
            "0000000000000000000000a4e8c3ec456107ea67d3075bf9e3df3a75823db001",
        },
        {
          address: "0x7785022B6e8CF085df8a3aD053D8c8AfD16A8F0C",
          name: "Spice",
          symbol: "SFI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x7785022B6e8CF085df8a3aD053D8c8AfD16A8F0C/logo.png",
          resourceId:
            "0000000000000000000000b753428af26e81097e7fd17f40c88aaa3e04902c01",
        },
        {
          address: "0x09Ff97AA422A897e10e47ab07bc8AA5e04c915Ba",
          name: "Akropolis",
          symbol: "AKRO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x09Ff97AA422A897e10e47ab07bc8AA5e04c915Ba/logo.png",
          resourceId:
            "00000000000000000000008ab7404063ec4dbcfd4598215992dc3f8ec853d701",
        },
        {
          address: "0xBdfdF2202CE3dBc4A2B7914Fb3C9e10002F94f38",
          name: "FARMReward Token",
          symbol: "FARM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xBdfdF2202CE3dBc4A2B7914Fb3C9e10002F94f38/logo.png",
          resourceId:
            "0000000000000000000000a0246c9032bc3a600820415ae600c6388619a14d01",
        },
        {
          address: "0x646b9335Ecff0AB98d7ED1982B94cA42ACeB22F7",
          name: "DIAToken",
          symbol: "DIA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x646b9335Ecff0AB98d7ED1982B94cA42ACeB22F7/logo.png",
          resourceId:
            "000000000000000000000084ca8bc7997272c7cfb4d0cd3d55cd942b3c941901",
        },
        {
          address: "0x496E08F44D3cEdeCC704956Cd0dd85af14827EaF",
          name: "Meta",
          symbol: "MTA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x496E08F44D3cEdeCC704956Cd0dd85af14827EaF/logo.png",
          resourceId:
            "0000000000000000000000a3bed4e1c75d00fa6f4e5e6922db7261b5e9acd201",
        },
        {
          address: "0xC3DA635246a199b631203E85D6FCD45FbbCb5b2b",
          name: "Axie Infinity Shard",
          symbol: "AXS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC3DA635246a199b631203E85D6FCD45FbbCb5b2b/logo.png",
          resourceId:
            "0000000000000000000000f5d669627376ebd411e34b98f19c868c8aba5ada01",
        },
        {
          address: "0x4F47eC61451FAFc3d26D190541Eb92253419D99f",
          name: "Ad Ex Network",
          symbol: "ADX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x4F47eC61451FAFc3d26D190541Eb92253419D99f/logo.png",
          resourceId:
            "0000000000000000000000ade00c28244d5ce17d72e40330b1c318cd12b7c301",
        },
        {
          address: "0x1306CCbCe7D88372c68eB2d81Ecc6a8E7C1b12bF",
          name: "Kardia Chain Token",
          symbol: "KAI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1306CCbCe7D88372c68eB2d81Ecc6a8E7C1b12bF/logo.png",
          resourceId:
            "0000000000000000000000d9ec3ff1f8be459bb9369b4e79e9ebcf7141c09301",
        },
        {
          address: "0xF10681D62e4B6a482584665862A027113eF6CE4D",
          name: "Melon Token",
          symbol: "MLN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xF10681D62e4B6a482584665862A027113eF6CE4D/logo.png",
          resourceId:
            "0000000000000000000000ec67005c4e498ec7f55e092bd1d35cbc47c9189201",
        },
        {
          address: "0x091aE9288A34AEF2D63588C59baEc3ab6FB46Ac2",
          name: "Duck Dao Dime",
          symbol: "DDIM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x091aE9288A34AEF2D63588C59baEc3ab6FB46Ac2/logo.png",
          resourceId:
            "0000000000000000000000fbeea1c75e4c4465cb2fccc9c6d6afe984558e2001",
        },
        {
          address: "0xF467d19343E4e2D2838C0164B9034bBF0B25B807",
          name: "RAMPDEFI",
          symbol: "RAMP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xF467d19343E4e2D2838C0164B9034bBF0B25B807/logo.png",
          resourceId:
            "000000000000000000000033d0568941c0c64ff7e0fb4fba0b11bd37deed9f01",
        },
        {
          address: "0x88654768172578d302691c59E7898d48763eBaC9",
          name: "Quark Chain",
          symbol: "QKC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x88654768172578d302691c59E7898d48763eBaC9/logo.png",
          resourceId:
            "0000000000000000000000ea26c4ac16d4a5a106820bc8aee85fd0b7b2b66401",
        },
        {
          address: "0x33c22a61afa06083c8dc7894f4ca27a45B89A5b5",
          name: "BTUProtocol",
          symbol: "BTU",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x33c22a61afa06083c8dc7894f4ca27a45B89A5b5/logo.png",
          resourceId:
            "0000000000000000000000b683d83a532e2cb7dfa5275eed3698436371cc9f01",
        },
        {
          address: "0xB1311550790054F94000f51A8F84674811cDAc24",
          name: "cVault.finance",
          symbol: "CORE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB1311550790054F94000f51A8F84674811cDAc24/logo.png",
          resourceId:
            "000000000000000000000062359ed7505efc61ff1d56fef82158ccaffa23d701",
        },
        {
          address: "0x884F0Eb3061A3D9d61B35dC4d722DCDEBDEa49Ce",
          name: "Streamr",
          symbol: "DATA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x884F0Eb3061A3D9d61B35dC4d722DCDEBDEa49Ce/logo.png",
          resourceId:
            "00000000000000000000000cf0ee63788a0849fe5297f3407f701e122cc02301",
        },
        {
          address: "0x73842d48d56923801A16336B45E7A8A341dEBFA5",
          name: "88mph.app",
          symbol: "MPH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x73842d48d56923801A16336B45E7A8A341dEBFA5/logo.png",
          resourceId:
            "00000000000000000000008888801af4d980682e47f1a9036e589479e835c501",
        },
        {
          address: "0x3f2620717a6132AD822d8Ec20cc7cBCBc6d0621A",
          name: "Origin Protocol",
          symbol: "OGN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3f2620717a6132AD822d8Ec20cc7cBCBc6d0621A/logo.png",
          resourceId:
            "00000000000000000000008207c1ffc5b6804f6024322ccf34f29c3541ae2601",
        },
        {
          address: "0x7b459f64Bf916859A9DB6dE7fE240BFe8CF52DD1",
          name: "Dynamic Set Dollar",
          symbol: "DSD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x7b459f64Bf916859A9DB6dE7fE240BFe8CF52DD1/logo.png",
          resourceId:
            "0000000000000000000000bd2f0cd039e0bfcf88901c98c0bfac5ab27566e301",
        },
        {
          address: "0xDEf1b9DbdCDdB2E40526153Cd3E600ddAD32b297",
          name: "Phala",
          symbol: "PHA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xDEf1b9DbdCDdB2E40526153Cd3E600ddAD32b297/logo.png",
          resourceId:
            "00000000000000000000006c5ba91642f10282b576d91922ae6448c9d52f4e01",
        },
      ],
    },
  ],
};
