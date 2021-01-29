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
          address: "0x9dEbca6eA3af87Bf422Cea9ac955618ceb56EfB4",
          name: "Avalanche",
          symbol: "AVAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/ethereum-tokens/0x9dEbca6eA3af87Bf422Cea9ac955618ceb56EfB4/logo.png",
          resourceId:
            "0x00000000000000000000009dEbca6eA3af87Bf422Cea9ac955618ceb56EfB402",
        },
        {
          address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          name: "Wrapped Ether",
          symbol: "WETH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15/logo.png",
          resourceId:
            "0x0000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc201",
        },
        {
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          name: "Tether USD",
          symbol: "USDT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xde3A24028580884448a5397872046a019649b084/logo.png",
          resourceId:
            "0x0000000000000000000000dac17f958d2ee523a2206206994597c13d831ec701",
        },
        {
          address: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
          name: "ChainLink Token",
          symbol: "LINK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651/logo.png",
          resourceId:
            "0x0000000000000000000000514910771af9ca656af840dff83e8264ecf986ca01",
        },
        {
          address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          name: "Wrapped BTC",
          symbol: "WBTC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB/logo.png",
          resourceId:
            "0x00000000000000000000002260fac5e5542a773aa44fbcfedf7c193bc2c59901",
        },
        {
          address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
          name: "Uniswap",
          symbol: "UNI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xf39f9671906d8630812f9d9863bBEf5D523c84Ab/logo.png",
          resourceId:
            "0x00000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98401",
        },
        {
          address: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
          name: "Aave Token",
          symbol: "AAVE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8cE2Dee54bB9921a2AE0A63dBb2DF8eD88B91dD9/logo.png",
          resourceId:
            "0x00000000000000000000007fc66500c84a76ad7e9c93437bfc5ac33e2ddae901",
        },
        {
          address: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
          name: "Synthetix Network Token",
          symbol: "SNX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x68e44C4619db40ae1a0725e77C02587bC8fBD1c9/logo.png",
          resourceId:
            "0x0000000000000000000000c011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f01",
        },
        {
          address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
          name: "Dai Stablecoin",
          symbol: "DAI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a/logo.png",
          resourceId:
            "0x00000000000000000000006b175474e89094c44da98b954eedeac495271d0f01",
        },
        {
          address: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
          name: "Binance USD",
          symbol: "BUSD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xaEb044650278731Ef3DC244692AB9F64C78FfaEA/logo.png",
          resourceId:
            "0x00000000000000000000004fabb145d64652a948d72533023f6e7a623c7c5301",
        },
        {
          address: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
          name: "Maker",
          symbol: "MKR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8DF92E9C0508aB0030d432DA9F2C65EB1Ee97620/logo.png",
          resourceId:
            "0x00000000000000000000009f8F72aA9304c8B593d555F12eF6589cC3A579A201",
        },
        {
          address: "0x6f259637dcD74C767781E37Bc6133cd6A68aa161",
          name: "HuobiToken",
          symbol: "HT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x421b2a69b886BA17a61C7dAd140B9070d5Ef300B/logo.png",
          resourceId:
            "0x00000000000000000000006f259637dcd74c767781e37bc6133cd6a68aa16101",
        },
        {
          address: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
          name: "Compound",
          symbol: "COMP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x53CEedB4f6f277edfDDEdB91373B044FE6AB5958/logo.png",
          resourceId:
            "0x0000000000000000000000c00e94cb662c3520282e6f5717214004a7f2688801",
        },
        {
          address: "0x6B3595068778DD592e39A122f4f5a5cF09C90fE2",
          name: "SushiToken",
          symbol: "SUSHI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc/logo.png",
          resourceId:
            "0x00000000000000000000006b3595068778dd592e39a122f4f5a5cf09c90fe201",
        },
        {
          address: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
          name: "yearn.finance",
          symbol: "YFI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x99519AcB025a0e0d44c3875A4BbF03af65933627/logo.png",
          resourceId:
            "0x00000000000000000000000bc529c00c6401aef6d220be8c6ea1667f6ad93e01",
        },
        {
          address: "0x0316EB71485b0Ab14103307bf65a021042c6d380",
          name: "Huobi BTC",
          symbol: "HBTC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8c1632b83D9E2D3C31B0728e953A22B7B33348A3/logo.png",
          resourceId:
            "0x00000000000000000000000316eb71485b0ab14103307bf65a021042c6d38001",
        },
        {
          address: "0x3155BA85D5F96b2d030a4966AF206230e46849cb",
          name: "THORChain ETH.RUNE",
          symbol: "RUNE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x390ba0fb0Bd3Aa2a5484001606329701148074e6/logo.png",
          resourceId:
            "0x00000000000000000000003155ba85d5f96b2d030a4966af206230e46849cb01",
        },
        {
          address: "0xc944E90C64B2c07662A292be6244BDf05Cda44a7",
          name: "Graph Token",
          symbol: "GRT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x46C54b16aF7747067f412c78eBaDaE203a26aDa0/logo.png",
          resourceId:
            "0x0000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a701",
        },
        {
          address: "0x8E870D67F660D95d5be530380D0eC0bd388289E1",
          name: "Paxos Standard",
          symbol: "PAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x403985fD6628E44b6fca9876575b9503cB80A47A/logo.png",
          resourceId:
            "0x00000000000000000000008e870d67f660d95d5be530380d0ec0bd388289e101",
        },
        {
          address: "0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828",
          name: "UMA Voting Token v1",
          symbol: "UMA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC84d7bfF2555955b44BDF6A307180810412D751B/logo.png",
          resourceId:
            "0x000000000000000000000004fa0d235c4abf4bcf4787af4cf447de572ef82801",
        },
        {
          address: "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
          name: "LoopringCoin V2",
          symbol: "LRC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x628A9639cc78F46604A625452C0242c7B487BA3c/logo.png",
          resourceId:
            "0x0000000000000000000000bbbbca6a901c926f240b89eacb641d8aec7aeafd01",
        },
        {
          address: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07",
          name: "OMGToken",
          symbol: "OMG",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x276C6670b97F22cE7Ad754b08CB330DECb6a3332/logo.png",
          resourceId:
            "0x0000000000000000000000d26114cd6ee289accf82350c8d8487fedb8a0c0701",
        },
        {
          address: "0x408e41876cCCDC0F92210600ef50372656052a38",
          name: "Republic Token",
          symbol: "REN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xAc6C38f2DeC391b478144Ae7F078D08B08d0a284/logo.png",
          resourceId:
            "0x0000000000000000000000408e41876cccdc0f92210600ef50372656052a3801",
        },
        {
          address: "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
          name: "Basic Attention Token",
          symbol: "BAT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x6b329326E0F6b95B93b52229b213334278D6f277/logo.png",
          resourceId:
            "0x00000000000000000000000d8775f648430679a709e98d2b0cb6250d2887ef01",
        },
        {
          address: "0xE41d2489571d322189246DaFA5ebDe1F4699F498",
          name: "0x Protocol Token",
          symbol: "ZRX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC8E94215b75F5B9c3b5fB041eC3A97B7D17a37Ff/logo.png",
          resourceId:
            "0x0000000000000000000000e41d2489571d322189246dafa5ebde1f4699f49801",
        },
        {
          address: "0xB62132e35a6c13ee1EE0f84dC5d40bad8d815206",
          name: "Nexo",
          symbol: "NEXO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xfe87Aba89d58da09d5bC13b4A1dC873C1b901806/logo.png",
          resourceId:
            "0x0000000000000000000000b62132e35a6c13ee1ee0f84dc5d40bad8d81520601",
        },
        {
          address: "0x006BeA43Baa3f7A6f765F14f10A1a1b08334EF45",
          name: "Stox",
          symbol: "STX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x232F79C05CB34de19C79104068E76452B624baB3/logo.png",
          resourceId:
            "0x0000000000000000000000006bea43baa3f7a6f765f14f10a1a1b08334ef4501",
        },
        {
          address: "0x4a220E6096B25EADb88358cb44068A3248254675",
          name: "Quant",
          symbol: "QNT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x4fcC1E009ef85B35d39B3Fe533d27751e4CFa8f7/logo.png",
          resourceId:
            "0x00000000000000000000004a220e6096b25eadb88358cb44068a324825467501",
        },
        {
          address: "0x0000000000085d4780B73119b644AE5ecd22b376",
          name: "TrueUSD",
          symbol: "TUSD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xc458770B5fA66f4DF1498c3D824261D5f5EC3582/logo.png",
          resourceId:
            "0x00000000000000000000000000000000085d4780b73119b644ae5ecd22b37601",
        },
        {
          address: "0xF629cBd94d3791C9250152BD8dfBDF380E2a3B9c",
          name: "Enjin Coin",
          symbol: "ENJ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xCde255522146ddF36d57BA5Cd8D74695bD13C994/logo.png",
          resourceId:
            "0x0000000000000000000000f629cbd94d3791c9250152bd8dfbdf380e2a3b9c01",
        },
        {
          address: "0x8762db106B2c2A0bccB3A80d1Ed41273552616E8",
          name: "Reserve Rights",
          symbol: "RSR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x91C20a30ebA9795BBdEd46df9ad5b215DFa04fcD/logo.png",
          resourceId:
            "0x00000000000000000000008762db106b2c2a0bccb3a80d1ed41273552616e801",
        },
        {
          address: "0xa1faa113cbE53436Df28FF0aEe54275c13B40975",
          name: "AlphaToken",
          symbol: "ALPHA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8Ea071D1903B27Ee57c82710B3a7cF660f285Bb8/logo.png",
          resourceId:
            "0x0000000000000000000000a1faa113cbe53436df28ff0aee54275c13b4097501",
        },
        {
          address: "0x111111111117dC0aa78b770fA6A738034120C302",
          name: "1INCH Token",
          symbol: "1INCH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xE54EB2C3009Fa411BF24fB017F9725b973CE36F0/logo.png",
          resourceId:
            "0x0000000000000000000000111111111117dc0aa78b770fa6a738034120c30201",
        },
        {
          address: "0xba100000625a3754423978a60c9317c58a424e3D",
          name: "Balancer",
          symbol: "BAL",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xA2A035Dd93b0e963864FA14A240401d6CeAc5558/logo.png",
          resourceId:
            "0x0000000000000000000000ba100000625a3754423978a60c9317c58a424e3d01",
        },
        {
          address: "0xdd974D5C2e2928deA5F71b9825b8b646686BD200",
          name: "Kyber Network Crystal",
          symbol: "KNC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xb7f7C9347f55d6d6265e152c636cD29aB17Dc9F6/logo.png",
          resourceId:
            "0x0000000000000000000000dd974d5c2e2928dea5f71b9825b8b646686bd20001",
        },
        {
          address: "0x967da4048cD07aB37855c090aAF366e4ce1b9F48",
          name: "Ocean Token",
          symbol: "OCEAN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x0057371Cd534577b6040E140654DE0958116Cf3A/logo.png",
          resourceId:
            "0x0000000000000000000000967da4048cd07ab37855c090aaf366e4ce1b9f4801",
        },
        {
          address: "0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C",
          name: "Bancor Network Token",
          symbol: "BNT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xeD44979561a797515767B0201121afC4b5eE2838/logo.png",
          resourceId:
            "0x00000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c01",
        },
        {
          address: "0x0F5D2fB29fb7d3CFeE444a200298f468908cC942",
          name: "Decentraland MANA",
          symbol: "MANA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x332877d7b83D98eFC3e22C203c54E6e62F7f35e9/logo.png",
          resourceId:
            "0x00000000000000000000000f5d2fb29fb7d3cfee444a200298f468908cc94201",
        },
        {
          address: "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
          name: "EthLend Token",
          symbol: "LEND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xaeF85E9F467b2Dc187351b37BF63124C0A9bB913/logo.png",
          resourceId:
            "0x000000000000000000000080fb784b7ed66730e8b1dbd9820afd29931aab0301",
        },
        {
          address: "0xBA11D00c5f74255f56a5E366F4F77f5A186d7f55",
          name: "BandToken",
          symbol: "BAND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x6Fd02c0789797e595751208a2446faF721B9f3C2/logo.png",
          resourceId:
            "0x0000000000000000000000ba11d00c5f74255f56a5e366f4f77f5a186d7f5501",
        },
        {
          address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
          name: "Matic Token",
          symbol: "MATIC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x885ca6663E1E19DAD31c1e08D9958a2b8F538D53/logo.png",
          resourceId:
            "0x00000000000000000000007d1afa7b718fb893db30a3abc0cfc608aacfebb001",
        },
        {
          address: "0x6810e776880C02933D47DB1b9fc05908e5386b96",
          name: "Gnosis Token",
          symbol: "GNO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xBAA66822055AD37EC05638eC5AAfDC6Ef0e96445/logo.png",
          resourceId:
            "0x00000000000000000000006810e776880c02933d47db1b9fc05908e5386b9601",
        },
        {
          address: "0x6c6EE5e31d828De241282B9606C8e98Ea48526E2",
          name: "HoloToken",
          symbol: "HOT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xA471033610995EEdF0D6E4C598a4A9b4EC99c700/logo.png",
          resourceId:
            "0x00000000000000000000006c6ee5e31d828de241282b9606c8e98ea48526e201",
        },
        {
          address: "0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671",
          name: "Numeraire",
          symbol: "NMR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x57541c10591Df7568BDc9D93f769d44eAc1e3c3a/logo.png",
          resourceId:
            "0x00000000000000000000001776e1f26f98b1a5df9cd347953a26dd3cb4667101",
        },
        {
          address: "0x362bc847A3a9637d3af6624EeC853618a43ed7D2",
          name: "Parsiq Token",
          symbol: "PRQ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x6A8E6794ab77C63c3C90A62F1088F16AC61F463D/logo.png",
          resourceId:
            "0x0000000000000000000000362bc847a3a9637d3af6624eec853618a43ed7d201",
        },
        {
          address: "0xa117000000f279D81A1D3cc75430fAA017FA5A2e",
          name: "Aragon Network Token",
          symbol: "ANT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x6C67e7D38570d6c7FFFdbB930cF204D97C62C470/logo.png",
          resourceId:
            "0x0000000000000000000000a117000000f279d81a1d3cc75430faa017fa5a2e01",
        },
        {
          address: "0xbC396689893D065F41bc2C6EcbeE5e0085233447",
          name: "Perpetual",
          symbol: "PERP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x88Af8D172e64326A71C1a7756CB4F6125D98F2A5/logo.png",
          resourceId:
            "0x0000000000000000000000bc396689893d065f41bc2c6ecbee5e008523344701",
        },
        {
          address: "0x1985365e9f78359a9B6AD760e32412f4a445E862",
          name: "Reputation",
          symbol: "REP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xb9924372Ddc7e7F13757C8B9ae0F03906a684D65/logo.png",
          resourceId:
            "0x00000000000000000000001985365e9f78359a9b6ad760e32412f4a445e86201",
        },
        {
          address: "0x45804880De22913dAFE09f4980848ECE6EcbAf78",
          name: "Paxos Gold",
          symbol: "PAXG",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1687b16087B576E403C8d6926fBc0798e48FD0de/logo.png",
          resourceId:
            "0x000000000000000000000045804880de22913dafe09f4980848ece6ecbaf7801",
        },
        {
          address: "0xfA5047c9c78B8877af97BDcb85Db743fD7313d4a",
          name: "ROOK",
          symbol: "ROOK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x052c1e9de172366F30F300e805707a6520615977/logo.png",
          resourceId:
            "0x0000000000000000000000fa5047c9c78b8877af97bdcb85db743fd7313d4a01",
        },
        {
          address: "0xdc9Ac3C20D1ed0B540dF9b1feDC10039Df13F99c",
          name: "Utrust Token",
          symbol: "UTK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x994921baDc83D4F16eEde22B81b64162c50A49EB/logo.png",
          resourceId:
            "0x0000000000000000000000dc9ac3c20d1ed0b540df9b1fedc10039df13f99c01",
        },
        {
          address: "0x85Eee30c52B0b379b046Fb0F85F4f3Dc3009aFEC",
          name: "KEEP Token",
          symbol: "KEEP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x73945347fbCBFed872D590110f817621440a9d39/logo.png",
          resourceId:
            "0x000000000000000000000085eee30c52b0b379b046fb0f85f4f3dc3009afec01",
        },
        {
          address: "0xe28b3B32B6c345A34Ff64674606124Dd5Aceca30",
          name: "Injective Token",
          symbol: "INJ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xfE057C0496eF3CCa8d85d847dA99c9815ba9981F/logo.png",
          resourceId:
            "0x0000000000000000000000e28b3b32b6c345a34ff64674606124dd5aceca3001",
        },
        {
          address: "0xA15C7Ebe1f07CaF6bFF097D8a589fb8AC49Ae5B3",
          name: "Pundi X Token",
          symbol: "NPXS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x07d83B7101c540fcC1720c3d51923f218Ae9b6Ac/logo.png",
          resourceId:
            "0x0000000000000000000000a15c7ebe1f07caf6bff097d8a589fb8ac49ae5b301",
        },
        {
          address: "0x584bC13c7D411c00c01A62e8019472dE68768430",
          name: "Hegic",
          symbol: "HEGIC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x20642e9cdd6BFe701817A7b50dE89777C8F2b208/logo.png",
          resourceId:
            "0x0000000000000000000000584bc13c7d411c00c01a62e8019472de6876843001",
        },
        {
          address: "0x0b38210ea11411557c13457D4dA7dC6ea731B88a",
          name: "API3",
          symbol: "API3",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xBf853B96F95Fae6883E9cBC813B4021FCcF1eED4/logo.png",
          resourceId:
            "0x00000000000000000000000b38210ea11411557c13457d4da7dc6ea731b88a01",
        },
        {
          address: "0x00a8b738E453fFd858a7edf03bcCfe20412f0Eb0",
          name: "AllianceBlock Token",
          symbol: "ALBT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC0c9b6714a482AAD7b11327cCf4d7a0545A828a5/logo.png",
          resourceId:
            "0x000000000000000000000000a8b738e453ffd858a7edf03bccfe20412f0eb001",
        },
        {
          address: "0x8CE9137d39326AD0cD6491fb5CC0CbA0e089b6A9",
          name: "Swipe",
          symbol: "SXP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3AfAD3EB65DeAf28f594958717530bC66D6Cdd1c/logo.png",
          resourceId:
            "0x00000000000000000000008ce9137d39326ad0cd6491fb5cc0cba0e089b6a901",
        },
        {
          address: "0x853d955aCEf822Db058eb8505911ED77F175b99e",
          name: "Frax",
          symbol: "FRAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xBB69c92FBb4F1aFf528875056650c862F94D3CC1/logo.png",
          resourceId:
            "0x0000000000000000000000853d955acef822db058eb8505911ed77f175b99e01",
        },
        {
          address: "0x2ba592F78dB6436527729929AAf6c908497cB200",
          name: "Cream",
          symbol: "CREAM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xb9AB39F9b4E3af0c97aE55EA48A960656C681A88/logo.png",
          resourceId:
            "0x00000000000000000000002ba592f78db6436527729929aaf6c908497cb20001",
        },
        {
          address: "0x36F3FD68E7325a35EB768F1AedaAe9EA0689d723",
          name: "Empty Set Dollar",
          symbol: "ESD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x455b3FD5eF7bcA83C0c1Cd71695Ec7aEda773E4f/logo.png",
          resourceId:
            "0x000000000000000000000036f3fd68e7325a35eb768f1aedaae9ea0689d72301",
        },
        {
          address: "0x8290333ceF9e6D528dD5618Fb97a76f268f3EDD4",
          name: "Ankr Network",
          symbol: "ANKR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xd09Af6A3C12EC24CeD114A0829F5Bf73D40dC5A8/logo.png",
          resourceId:
            "0x00000000000000000000008290333cef9e6d528dd5618fb97a76f268f3edd401",
        },
        {
          address: "0x4fE83213D56308330EC302a8BD641f1d0113A4Cc",
          name: "NuCypher",
          symbol: "NU",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x32141622A7C79790176670ffFcA17154678A9A24/logo.png",
          resourceId:
            "0x00000000000000000000004fe83213d56308330ec302a8bd641f1d0113a4cc01",
        },
        {
          address: "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b",
          name: "DefiPulse Index",
          symbol: "DPI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x150DC9795908a27988aBf71C30E9B1647922A7B3/logo.png",
          resourceId:
            "0x00000000000000000000001494ca1f11d487c2bbe4543e90080aeba4ba3c2b01",
        },
        {
          address: "0x58b6A8A3302369DAEc383334672404Ee733aB239",
          name: "Livepeer Token",
          symbol: "LPT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2c67EC45B2E7138823dee0576D0d17Ac6Aa36b74/logo.png",
          resourceId:
            "0x000000000000000000000058b6a8a3302369daec383334672404ee733ab23901",
        },
        {
          address: "0x0d438F3b5175Bebc262bF23753C1E53d03432bDE",
          name: "Wrapped NXM",
          symbol: "wNXM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3585E1f43Af5A0E5a9429A8058BDf999ED67f81d/logo.png",
          resourceId:
            "0x00000000000000000000000d438f3b5175bebc262bf23753c1e53d03432bde01",
        },
        {
          address: "0x9992eC3cF6A55b00978cdDF2b27BC6882d88D1eC",
          name: "Polymath",
          symbol: "POLY",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1676C3D77ac75741678d6Ca28f288352a57D0973/logo.png",
          resourceId:
            "0x00000000000000000000009992ec3cf6a55b00978cddf2b27bc6882d88d1ec01",
        },
        {
          address: "0xa1d0E215a23d7030842FC67cE582a6aFa3CCaB83",
          name: "YFII.finance",
          symbol: "YFII",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xA0e1645A594a3ac2556Ad0707D89B908B1A17d03/logo.png",
          resourceId:
            "0x0000000000000000000000a1d0e215a23d7030842fc67ce582a6afa3ccab8301",
        },
        {
          address: "0x08d967bb0134F2d07f7cfb6E246680c53927DD30",
          name: "MATH Token",
          symbol: "MATH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x374C62a3B07350de41C4A95c4094474f84d7BF66/logo.png",
          resourceId:
            "0x000000000000000000000008d967bb0134f2d07f7cfb6e246680c53927dd3001",
        },
        {
          address: "0x1cEB5cB57C4D4E2b2433641b95Dd330A33185A44",
          name: "Keep3rV1",
          symbol: "KP3R",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB42F2c83b4ee3C3620789B5603f4bdf01792e0a0/logo.png",
          resourceId:
            "0x00000000000000000000001ceb5cb57c4d4e2b2433641b95dd330a33185a4401",
        },
        {
          address: "0x8dAEBADE922dF735c38C80C7eBD708Af50815fAa",
          name: "tBTC",
          symbol: "TBTC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1c24D4ef397F6F8c80403f52E9D11Bef1D129a93/logo.png",
          resourceId:
            "0x00000000000000000000008daebade922df735c38c80c7ebd708af50815faa01",
        },
        {
          address: "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85",
          name: "Fetch",
          symbol: "FET",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x23D7e6Af758883F4976617DAB2641af94FF7CA1F/logo.png",
          resourceId:
            "0x0000000000000000000000aea46a60368a7bd060eec7df8cba43b7ef41ad8501",
        },
        {
          address: "0xa0246c9032bC3A600820415aE600c6388619A14D",
          name: "FARM Reward Token",
          symbol: "FARM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x5E92Fb74d337cd3914E0E48a7E679f87f2585471/logo.png",
          resourceId:
            "0x0000000000000000000000a0246c9032bc3a600820415ae600c6388619a14d01",
        },
        {
          address: "0xB4EFd85c19999D84251304bDA99E90B92300Bd93",
          name: "Rocket Pool",
          symbol: "RPL",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x5cDAD843078930C8fEB1d50bE474acCf11B7ada1/logo.png",
          resourceId:
            "0x0000000000000000000000b4efd85c19999d84251304bda99e90b92300bd9301",
        },
        {
          address: "0xe4815AE53B124e7263F08dcDBBB757d41Ed658c6",
          name: "Zks",
          symbol: "ZKS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x40871A08cd7b9751639a0831e5a83808F4c7EBA9/logo.png",
          resourceId:
            "0x0000000000000000000000e4815ae53b124e7263f08dcdbbb757d41ed658c601",
        },
        {
          address: "0xbf2179859fc6D5BEE9Bf9158632Dc51678a4100e",
          name: "ELF Token",
          symbol: "ELF",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xfCDf63735c1Cf3203CE64fEf59DcA6A7aC9A6D54/logo.png",
          resourceId:
            "0x0000000000000000000000bf2179859fc6d5bee9bf9158632dc51678a4100e01",
        },
        {
          address: "0x40FD72257597aA14C7231A7B1aaa29Fce868F677",
          name: "Sora Token",
          symbol: "XOR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x307A2a7127429f0C24c607E4633d17B6E98E8372/logo.png",
          resourceId:
            "0x000000000000000000000040fd72257597aa14c7231a7b1aaa29fce868f67701",
        },
        {
          address: "0x6468e79A80C0eaB0F9A2B574c8d5bC374Af59414",
          name: "E-RADIX",
          symbol: "eXRD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x535E15B13f2A82350E8C02d62BDbA385a6307c30/logo.png",
          resourceId:
            "0x00000000000000000000006468e79a80c0eab0f9a2b574c8d5bc374af5941401",
        },
        {
          address: "0xDF2C7238198Ad8B389666574f2d8bc411A4b7428",
          name: "Mainframe Token",
          symbol: "MFT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x254Aa21D2996400b19CeE93623C307D6E973Ea3f/logo.png",
          resourceId:
            "0x0000000000000000000000df2c7238198ad8b389666574f2d8bc411a4b742801",
        },
        {
          address: "0x83e6f1E41cdd28eAcEB20Cb649155049Fac3D5Aa",
          name: "PolkastarterToken",
          symbol: "POLS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xE1463E8991c8A62e64b77b5Fb6B22F190344C2A9/logo.png",
          resourceId:
            "0x000000000000000000000083e6f1e41cdd28eaceb20cb649155049fac3d5aa01",
        },
        {
          address: "0x0391D2021f89DC339F60Fff84546EA23E337750f",
          name: "BarnBridge Governance Token",
          symbol: "BOND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x59Cd8bb3E49930F313eD744585E4067bc45cF85d/logo.png",
          resourceId:
            "0x00000000000000000000000391d2021f89dc339f60fff84546ea23e337750f01",
        },
        {
          address: "0x34950Ff2b487d9E5282c5aB342d08A2f712eb79F",
          name: "EFFORCE IEO",
          symbol: "WOZX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1830DD37A0ddd3207fFAc9013E4F4D60FEC22036/logo.png",
          resourceId:
            "0x000000000000000000000034950ff2b487d9e5282c5ab342d08a2f712eb79f01",
        },
        {
          address: "0x3845badAde8e6dFF049820680d1F14bD3903a5d0",
          name: "SAND",
          symbol: "SAND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xA29d60Ef9706571bBDa9b505A117e1D36a0D683C/logo.png",
          resourceId:
            "0x00000000000000000000003845badade8e6dff049820680d1f14bd3903a5d001",
        },
        {
          address: "0xCC4304A31d09258b0029eA7FE63d032f52e44EFe",
          name: "TrustSwap Token",
          symbol: "SWAP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x17908a369a1884Ce287Bf79c269a16F0Fb84082E/logo.png",
          resourceId:
            "0x0000000000000000000000cc4304a31d09258b0029ea7fe63d032f52e44efe01",
        },
        {
          address: "0x0Ae055097C6d159879521C384F1D2123D1f195e6",
          name: "STAKE",
          symbol: "STAKE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x540641C9B0fcb979496A8c03C711033239C841d5/logo.png",
          resourceId:
            "0x00000000000000000000000ae055097c6d159879521c384f1d2123d1f195e601",
        },
        {
          address: "0xaA7a9CA87d3694B5755f213B5D04094b8d0F0A6F",
          name: "Trace Token",
          symbol: "TRAC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xdEA3Da33bDee64487358DB66d9AbC9EC256D1BFb/logo.png",
          resourceId:
            "0x0000000000000000000000aa7a9ca87d3694b5755f213b5d04094b8d0f0a6f01",
        },
        {
          address: "0xA4e8C3Ec456107eA67d3075bF9e3DF3A75823DB0",
          name: "LoomToken",
          symbol: "LOOM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xfA178938Da2d58e55e52dc6dB92B99d9B2102EaE/logo.png",
          resourceId:
            "0x0000000000000000000000a4e8c3ec456107ea67d3075bf9e3df3a75823db001",
        },
        {
          address: "0xb753428af26E81097e7fD17f40c88aaA3E04902c",
          name: "Spice",
          symbol: "SFI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC386282f66c090A1e42c39e83dBD2c2d447dE506/logo.png",
          resourceId:
            "0x0000000000000000000000b753428af26e81097e7fd17f40c88aaa3e04902c01",
        },
        {
          address: "0xD9Ec3ff1f8be459Bb9369b4E79e9Ebcf7141C093",
          name: "KardiaChain Token",
          symbol: "KAI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1D81360dADf2E1756FaeAe46072dD12997170F46/logo.png",
          resourceId:
            "0x0000000000000000000000d9ec3ff1f8be459bb9369b4e79e9ebcf7141c09301",
        },
        {
          address: "0xFbEEa1C75E4c4465CB2FCCc9c6d6afe984558E20",
          name: "DuckDaoDime",
          symbol: "DDIM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xF40920212A74387387328Db8e30726C0cc62ae33/logo.png",
          resourceId:
            "0x0000000000000000000000fbeea1c75e4c4465cb2fccc9c6d6afe984558e2001",
        },
        {
          address: "0x8Ab7404063Ec4DBcfd4598215992DC3F8EC853d7",
          name: "Akropolis",
          symbol: "AKRO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x086A23685F2A33BfdeDF4dEd738e9afDdfb854Ed/logo.png",
          resourceId:
            "0x00000000000000000000008ab7404063ec4dbcfd4598215992dc3f8ec853d701",
        },
        {
          address: "0xEA26c4aC16D4a5A106820BC8AEE85fd0b7b2b664",
          name: "QuarkChain Token",
          symbol: "QKC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xa9B41c348717F755101189b907F37Ee4ec703E8C/logo.png",
          resourceId:
            "0x0000000000000000000000ea26c4ac16d4a5a106820bc8aee85fd0b7b2b66401",
        },
        {
          address: "0xADE00C28244d5CE17D72E40330B1c318cD12B7c3",
          name: "AdEx Network",
          symbol: "ADX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xEdd6ce14626B228D90aF0fB126a432e4b2174844/logo.png",
          resourceId:
            "0x0000000000000000000000ade00c28244d5ce17d72e40330b1c318cd12b7c301",
        },
        {
          address: "0xb683D83a532e2Cb7DFa5275eED3698436371cc9f",
          name: "BTU Protocol",
          symbol: "BTU",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x211960f8260DB1B0171c33931a2aeFd9562592B0/logo.png",
          resourceId:
            "0x0000000000000000000000b683d83a532e2cb7dfa5275eed3698436371cc9f01",
        },
        {
          address: "0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2",
          name: "Meta",
          symbol: "MTA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x61EDA5B986b9da6A67a2a128e67ee7CED890DEAb/logo.png",
          resourceId:
            "0x0000000000000000000000a3bed4e1c75d00fa6f4e5e6922db7261b5e9acd201",
        },
        {
          address: "0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419",
          name: "DIAToken",
          symbol: "DIA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xd072dEcEb5FD919bF8853CeB1068438652a06c00/logo.png",
          resourceId:
            "0x000000000000000000000084ca8bc7997272c7cfb4d0cd3d55cd942b3c941901",
        },
        {
          address: "0x33D0568941C0C64ff7e0FB4fbA0B11BD37deEd9f",
          name: "RAMP DEFI",
          symbol: "RAMP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x182795eE69b458930633A60DA79E8F9787A4828c/logo.png",
          resourceId:
            "0x000000000000000000000033d0568941c0c64ff7e0fb4fba0b11bd37deed9f01",
        },
        {
          address: "0xec67005c4E498Ec7f55E092bd1d35cbC47C91892",
          name: "Melon Token",
          symbol: "MLN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2bD2e0C3d39d6c82EaCA300958aa2E4be6740223/logo.png",
          resourceId:
            "0x0000000000000000000000ec67005c4e498ec7f55e092bd1d35cbc47c9189201",
        },
        {
          address: "0x43Dfc4159D86F3A37A5A4B3D4580b888ad7d4DDd",
          name: "DODO bird",
          symbol: "DODO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x480d6193B2a2Db2702F3ce6FE5Bc1F0c8a95336B/logo.png",
          resourceId:
            "0x000000000000000000000043dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd01",
        },
        {
          address: "0x62359Ed7505Efc61FF1D56fEF82158CcaffA23D7",
          name: "cVault.finance",
          symbol: "CORE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x424587becE1A7436Ae4a38eD9E8686992236618B/logo.png",
          resourceId:
            "0x000000000000000000000062359ed7505efc61ff1d56fef82158ccaffa23d701",
        },
        {
          address: "0xF5D669627376EBd411E34b98F19C868c8ABA5ADA",
          name: "Axie Infinity Shard",
          symbol: "AXS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x860d87C4EE3bf2F001a641e32FbeF8F0342Ba924/logo.png",
          resourceId:
            "0x0000000000000000000000f5d669627376ebd411e34b98f19c868c8aba5ada01",
        },
      ],
    },
    {
      chainId: 2,
      networkId: 43114,
      name: "Avalanche",
      bridgeAddress: "0x6460777cDa22AD67bBb97536FFC446D65761197E",
      erc20HandlerAddress: "0x6147F5a1a4eEa5C529e2F375Bd86f8F58F8Bc990",
      rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
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
          address: "0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15",
          name: "Ether",
          symbol: "ETH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15/logo.png",
          resourceId:
            "0x0000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc201",
        },
        {
          address: "0xde3A24028580884448a5397872046a019649b084",
          name: "Tether USD",
          symbol: "USDT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xde3A24028580884448a5397872046a019649b084/logo.png",
          resourceId:
            "0x0000000000000000000000dac17f958d2ee523a2206206994597c13d831ec701",
        },
        {
          address: "0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651",
          name: "ChainLink Token",
          symbol: "LINK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651/logo.png",
          resourceId:
            "0x0000000000000000000000514910771af9ca656af840dff83e8264ecf986ca01",
        },
        {
          address: "0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB",
          name: "Wrapped BTC",
          symbol: "WBTC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB/logo.png",
          resourceId:
            "0x00000000000000000000002260fac5e5542a773aa44fbcfedf7c193bc2c59901",
        },
        {
          address: "0xf39f9671906d8630812f9d9863bBEf5D523c84Ab",
          name: "Uniswap",
          symbol: "UNI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xf39f9671906d8630812f9d9863bBEf5D523c84Ab/logo.png",
          resourceId:
            "0x00000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98401",
        },
        {
          address: "0x8cE2Dee54bB9921a2AE0A63dBb2DF8eD88B91dD9",
          name: "Aave Token",
          symbol: "AAVE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8cE2Dee54bB9921a2AE0A63dBb2DF8eD88B91dD9/logo.png",
          resourceId:
            "0x00000000000000000000007fc66500c84a76ad7e9c93437bfc5ac33e2ddae901",
        },
        {
          address: "0x68e44C4619db40ae1a0725e77C02587bC8fBD1c9",
          name: "Synthetix Network Token",
          symbol: "SNX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x68e44C4619db40ae1a0725e77C02587bC8fBD1c9/logo.png",
          resourceId:
            "0x0000000000000000000000c011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f01",
        },
        {
          address: "0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a",
          name: "Dai Stablecoin",
          symbol: "DAI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a/logo.png",
          resourceId:
            "0x00000000000000000000006b175474e89094c44da98b954eedeac495271d0f01",
        },
        {
          address: "0xaEb044650278731Ef3DC244692AB9F64C78FfaEA",
          name: "Binance USD",
          symbol: "BUSD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xaEb044650278731Ef3DC244692AB9F64C78FfaEA/logo.png",
          resourceId:
            "0x00000000000000000000004fabb145d64652a948d72533023f6e7a623c7c5301",
        },
        {
          address: "0x8DF92E9C0508aB0030d432DA9F2C65EB1Ee97620",
          name: "Maker",
          symbol: "MKR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8DF92E9C0508aB0030d432DA9F2C65EB1Ee97620/logo.png",
          resourceId:
            "0x00000000000000000000009f8F72aA9304c8B593d555F12eF6589cC3A579A201",
        },
        {
          address: "0x421b2a69b886BA17a61C7dAd140B9070d5Ef300B",
          name: "HuobiToken",
          symbol: "HT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x421b2a69b886BA17a61C7dAd140B9070d5Ef300B/logo.png",
          resourceId:
            "0x00000000000000000000006f259637dcd74c767781e37bc6133cd6a68aa16101",
        },
        {
          address: "0x53CEedB4f6f277edfDDEdB91373B044FE6AB5958",
          name: "Compound",
          symbol: "COMP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x53CEedB4f6f277edfDDEdB91373B044FE6AB5958/logo.png",
          resourceId:
            "0x0000000000000000000000c00e94cb662c3520282e6f5717214004a7f2688801",
        },
        {
          address: "0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc",
          name: "SushiToken",
          symbol: "SUSHI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc/logo.png",
          resourceId:
            "0x00000000000000000000006b3595068778dd592e39a122f4f5a5cf09c90fe201",
        },
        {
          address: "0x99519AcB025a0e0d44c3875A4BbF03af65933627",
          name: "yearn.finance",
          symbol: "YFI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x99519AcB025a0e0d44c3875A4BbF03af65933627/logo.png",
          resourceId:
            "0x00000000000000000000000bc529c00c6401aef6d220be8c6ea1667f6ad93e01",
        },
        {
          address: "0x8c1632b83D9E2D3C31B0728e953A22B7B33348A3",
          name: "Huobi BTC",
          symbol: "HBTC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8c1632b83D9E2D3C31B0728e953A22B7B33348A3/logo.png",
          resourceId:
            "0x00000000000000000000000316eb71485b0ab14103307bf65a021042c6d38001",
        },
        {
          address: "0x390ba0fb0Bd3Aa2a5484001606329701148074e6",
          name: "THORChain ETH.RUNE",
          symbol: "RUNE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x390ba0fb0Bd3Aa2a5484001606329701148074e6/logo.png",
          resourceId:
            "0x00000000000000000000003155ba85d5f96b2d030a4966af206230e46849cb01",
        },
        {
          address: "0x46C54b16aF7747067f412c78eBaDaE203a26aDa0",
          name: "Graph Token",
          symbol: "GRT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x46C54b16aF7747067f412c78eBaDaE203a26aDa0/logo.png",
          resourceId:
            "0x0000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a701",
        },
        {
          address: "0x403985fD6628E44b6fca9876575b9503cB80A47A",
          name: "Paxos Standard",
          symbol: "PAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x403985fD6628E44b6fca9876575b9503cB80A47A/logo.png",
          resourceId:
            "0x00000000000000000000008e870d67f660d95d5be530380d0ec0bd388289e101",
        },
        {
          address: "0xC84d7bfF2555955b44BDF6A307180810412D751B",
          name: "UMA Voting Token v1",
          symbol: "UMA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC84d7bfF2555955b44BDF6A307180810412D751B/logo.png",
          resourceId:
            "0x000000000000000000000004fa0d235c4abf4bcf4787af4cf447de572ef82801",
        },
        {
          address: "0x628A9639cc78F46604A625452C0242c7B487BA3c",
          name: "LoopringCoin V2",
          symbol: "LRC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x628A9639cc78F46604A625452C0242c7B487BA3c/logo.png",
          resourceId:
            "0x0000000000000000000000bbbbca6a901c926f240b89eacb641d8aec7aeafd01",
        },
        {
          address: "0x276C6670b97F22cE7Ad754b08CB330DECb6a3332",
          name: "OMGToken",
          symbol: "OMG",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x276C6670b97F22cE7Ad754b08CB330DECb6a3332/logo.png",
          resourceId:
            "0x0000000000000000000000d26114cd6ee289accf82350c8d8487fedb8a0c0701",
        },
        {
          address: "0xAc6C38f2DeC391b478144Ae7F078D08B08d0a284",
          name: "Republic Token",
          symbol: "REN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xAc6C38f2DeC391b478144Ae7F078D08B08d0a284/logo.png",
          resourceId:
            "0x0000000000000000000000408e41876cccdc0f92210600ef50372656052a3801",
        },
        {
          address: "0x6b329326E0F6b95B93b52229b213334278D6f277",
          name: "Basic Attention Token",
          symbol: "BAT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x6b329326E0F6b95B93b52229b213334278D6f277/logo.png",
          resourceId:
            "0x00000000000000000000000d8775f648430679a709e98d2b0cb6250d2887ef01",
        },
        {
          address: "0xC8E94215b75F5B9c3b5fB041eC3A97B7D17a37Ff",
          name: "0x Protocol Token",
          symbol: "ZRX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC8E94215b75F5B9c3b5fB041eC3A97B7D17a37Ff/logo.png",
          resourceId:
            "0x0000000000000000000000e41d2489571d322189246dafa5ebde1f4699f49801",
        },
        {
          address: "0xfe87Aba89d58da09d5bC13b4A1dC873C1b901806",
          name: "Nexo",
          symbol: "NEXO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xfe87Aba89d58da09d5bC13b4A1dC873C1b901806/logo.png",
          resourceId:
            "0x0000000000000000000000b62132e35a6c13ee1ee0f84dc5d40bad8d81520601",
        },
        {
          address: "0x232F79C05CB34de19C79104068E76452B624baB3",
          name: "Stox",
          symbol: "STX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x232F79C05CB34de19C79104068E76452B624baB3/logo.png",
          resourceId:
            "0x0000000000000000000000006bea43baa3f7a6f765f14f10a1a1b08334ef4501",
        },
        {
          address: "0x4fcC1E009ef85B35d39B3Fe533d27751e4CFa8f7",
          name: "Quant",
          symbol: "QNT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x4fcC1E009ef85B35d39B3Fe533d27751e4CFa8f7/logo.png",
          resourceId:
            "0x00000000000000000000004a220e6096b25eadb88358cb44068a324825467501",
        },
        {
          address: "0xc458770B5fA66f4DF1498c3D824261D5f5EC3582",
          name: "TrueUSD",
          symbol: "TUSD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xc458770B5fA66f4DF1498c3D824261D5f5EC3582/logo.png",
          resourceId:
            "0x00000000000000000000000000000000085d4780b73119b644ae5ecd22b37601",
        },
        {
          address: "0xCde255522146ddF36d57BA5Cd8D74695bD13C994",
          name: "Enjin Coin",
          symbol: "ENJ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xCde255522146ddF36d57BA5Cd8D74695bD13C994/logo.png",
          resourceId:
            "0x0000000000000000000000f629cbd94d3791c9250152bd8dfbdf380e2a3b9c01",
        },
        {
          address: "0x91C20a30ebA9795BBdEd46df9ad5b215DFa04fcD",
          name: "Reserve Rights",
          symbol: "RSR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x91C20a30ebA9795BBdEd46df9ad5b215DFa04fcD/logo.png",
          resourceId:
            "0x00000000000000000000008762db106b2c2a0bccb3a80d1ed41273552616e801",
        },
        {
          address: "0x8Ea071D1903B27Ee57c82710B3a7cF660f285Bb8",
          name: "AlphaToken",
          symbol: "ALPHA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x8Ea071D1903B27Ee57c82710B3a7cF660f285Bb8/logo.png",
          resourceId:
            "0x0000000000000000000000a1faa113cbe53436df28ff0aee54275c13b4097501",
        },
        {
          address: "0xE54EB2C3009Fa411BF24fB017F9725b973CE36F0",
          name: "1INCH Token",
          symbol: "1INCH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xE54EB2C3009Fa411BF24fB017F9725b973CE36F0/logo.png",
          resourceId:
            "0x0000000000000000000000111111111117dc0aa78b770fa6a738034120c30201",
        },
        {
          address: "0xA2A035Dd93b0e963864FA14A240401d6CeAc5558",
          name: "Balancer",
          symbol: "BAL",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xA2A035Dd93b0e963864FA14A240401d6CeAc5558/logo.png",
          resourceId:
            "0x0000000000000000000000ba100000625a3754423978a60c9317c58a424e3d01",
        },
        {
          address: "0xb7f7C9347f55d6d6265e152c636cD29aB17Dc9F6",
          name: "Kyber Network Crystal",
          symbol: "KNC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xb7f7C9347f55d6d6265e152c636cD29aB17Dc9F6/logo.png",
          resourceId:
            "0x0000000000000000000000dd974d5c2e2928dea5f71b9825b8b646686bd20001",
        },
        {
          address: "0x0057371Cd534577b6040E140654DE0958116Cf3A",
          name: "Ocean Token",
          symbol: "OCEAN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x0057371Cd534577b6040E140654DE0958116Cf3A/logo.png",
          resourceId:
            "0x0000000000000000000000967da4048cd07ab37855c090aaf366e4ce1b9f4801",
        },
        {
          address: "0xeD44979561a797515767B0201121afC4b5eE2838",
          name: "Bancor Network Token",
          symbol: "BNT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xeD44979561a797515767B0201121afC4b5eE2838/logo.png",
          resourceId:
            "0x00000000000000000000001f573d6fb3f13d689ff844b4ce37794d79a7ff1c01",
        },
        {
          address: "0x332877d7b83D98eFC3e22C203c54E6e62F7f35e9",
          name: "Decentraland MANA",
          symbol: "MANA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x332877d7b83D98eFC3e22C203c54E6e62F7f35e9/logo.png",
          resourceId:
            "0x00000000000000000000000f5d2fb29fb7d3cfee444a200298f468908cc94201",
        },
        {
          address: "0xaeF85E9F467b2Dc187351b37BF63124C0A9bB913",
          name: "EthLend Token",
          symbol: "LEND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xaeF85E9F467b2Dc187351b37BF63124C0A9bB913/logo.png",
          resourceId:
            "0x000000000000000000000080fb784b7ed66730e8b1dbd9820afd29931aab0301",
        },
        {
          address: "0x6Fd02c0789797e595751208a2446faF721B9f3C2",
          name: "BandToken",
          symbol: "BAND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x6Fd02c0789797e595751208a2446faF721B9f3C2/logo.png",
          resourceId:
            "0x0000000000000000000000ba11d00c5f74255f56a5e366f4f77f5a186d7f5501",
        },
        {
          address: "0x885ca6663E1E19DAD31c1e08D9958a2b8F538D53",
          name: "Matic Token",
          symbol: "MATIC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x885ca6663E1E19DAD31c1e08D9958a2b8F538D53/logo.png",
          resourceId:
            "0x00000000000000000000007d1afa7b718fb893db30a3abc0cfc608aacfebb001",
        },
        {
          address: "0xBAA66822055AD37EC05638eC5AAfDC6Ef0e96445",
          name: "Gnosis Token",
          symbol: "GNO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xBAA66822055AD37EC05638eC5AAfDC6Ef0e96445/logo.png",
          resourceId:
            "0x00000000000000000000006810e776880c02933d47db1b9fc05908e5386b9601",
        },
        {
          address: "0xA471033610995EEdF0D6E4C598a4A9b4EC99c700",
          name: "HoloToken",
          symbol: "HOT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xA471033610995EEdF0D6E4C598a4A9b4EC99c700/logo.png",
          resourceId:
            "0x00000000000000000000006c6ee5e31d828de241282b9606c8e98ea48526e201",
        },
        {
          address: "0x57541c10591Df7568BDc9D93f769d44eAc1e3c3a",
          name: "Numeraire",
          symbol: "NMR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x57541c10591Df7568BDc9D93f769d44eAc1e3c3a/logo.png",
          resourceId:
            "0x00000000000000000000001776e1f26f98b1a5df9cd347953a26dd3cb4667101",
        },
        {
          address: "0x6A8E6794ab77C63c3C90A62F1088F16AC61F463D",
          name: "Parsiq Token",
          symbol: "PRQ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x6A8E6794ab77C63c3C90A62F1088F16AC61F463D/logo.png",
          resourceId:
            "0x0000000000000000000000362bc847a3a9637d3af6624eec853618a43ed7d201",
        },
        {
          address: "0x6C67e7D38570d6c7FFFdbB930cF204D97C62C470",
          name: "Aragon Network Token",
          symbol: "ANT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x6C67e7D38570d6c7FFFdbB930cF204D97C62C470/logo.png",
          resourceId:
            "0x0000000000000000000000a117000000f279d81a1d3cc75430faa017fa5a2e01",
        },
        {
          address: "0x88Af8D172e64326A71C1a7756CB4F6125D98F2A5",
          name: "Perpetual",
          symbol: "PERP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x88Af8D172e64326A71C1a7756CB4F6125D98F2A5/logo.png",
          resourceId:
            "0x0000000000000000000000bc396689893d065f41bc2c6ecbee5e008523344701",
        },
        {
          address: "0xb9924372Ddc7e7F13757C8B9ae0F03906a684D65",
          name: "Reputation",
          symbol: "REP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xb9924372Ddc7e7F13757C8B9ae0F03906a684D65/logo.png",
          resourceId:
            "0x00000000000000000000001985365e9f78359a9b6ad760e32412f4a445e86201",
        },
        {
          address: "0x1687b16087B576E403C8d6926fBc0798e48FD0de",
          name: "Paxos Gold",
          symbol: "PAXG",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1687b16087B576E403C8d6926fBc0798e48FD0de/logo.png",
          resourceId:
            "0x000000000000000000000045804880de22913dafe09f4980848ece6ecbaf7801",
        },
        {
          address: "0x052c1e9de172366F30F300e805707a6520615977",
          name: "ROOK",
          symbol: "ROOK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x052c1e9de172366F30F300e805707a6520615977/logo.png",
          resourceId:
            "0x0000000000000000000000fa5047c9c78b8877af97bdcb85db743fd7313d4a01",
        },
        {
          address: "0x994921baDc83D4F16eEde22B81b64162c50A49EB",
          name: "Utrust Token",
          symbol: "UTK",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x994921baDc83D4F16eEde22B81b64162c50A49EB/logo.png",
          resourceId:
            "0x0000000000000000000000dc9ac3c20d1ed0b540df9b1fedc10039df13f99c01",
        },
        {
          address: "0x73945347fbCBFed872D590110f817621440a9d39",
          name: "KEEP Token",
          symbol: "KEEP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x73945347fbCBFed872D590110f817621440a9d39/logo.png",
          resourceId:
            "0x000000000000000000000085eee30c52b0b379b046fb0f85f4f3dc3009afec01",
        },
        {
          address: "0xfE057C0496eF3CCa8d85d847dA99c9815ba9981F",
          name: "Injective Token",
          symbol: "INJ",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xfE057C0496eF3CCa8d85d847dA99c9815ba9981F/logo.png",
          resourceId:
            "0x0000000000000000000000e28b3b32b6c345a34ff64674606124dd5aceca3001",
        },
        {
          address: "0x07d83B7101c540fcC1720c3d51923f218Ae9b6Ac",
          name: "Pundi X Token",
          symbol: "NPXS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x07d83B7101c540fcC1720c3d51923f218Ae9b6Ac/logo.png",
          resourceId:
            "0x0000000000000000000000a15c7ebe1f07caf6bff097d8a589fb8ac49ae5b301",
        },
        {
          address: "0x20642e9cdd6BFe701817A7b50dE89777C8F2b208",
          name: "Hegic",
          symbol: "HEGIC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x20642e9cdd6BFe701817A7b50dE89777C8F2b208/logo.png",
          resourceId:
            "0x0000000000000000000000584bc13c7d411c00c01a62e8019472de6876843001",
        },
        {
          address: "0xBf853B96F95Fae6883E9cBC813B4021FCcF1eED4",
          name: "API3",
          symbol: "API3",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xBf853B96F95Fae6883E9cBC813B4021FCcF1eED4/logo.png",
          resourceId:
            "0x00000000000000000000000b38210ea11411557c13457d4da7dc6ea731b88a01",
        },
        {
          address: "0xC0c9b6714a482AAD7b11327cCf4d7a0545A828a5",
          name: "AllianceBlock Token",
          symbol: "ALBT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC0c9b6714a482AAD7b11327cCf4d7a0545A828a5/logo.png",
          resourceId:
            "0x000000000000000000000000a8b738e453ffd858a7edf03bccfe20412f0eb001",
        },
        {
          address: "0x3AfAD3EB65DeAf28f594958717530bC66D6Cdd1c",
          name: "Swipe",
          symbol: "SXP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3AfAD3EB65DeAf28f594958717530bC66D6Cdd1c/logo.png",
          resourceId:
            "0x00000000000000000000008ce9137d39326ad0cd6491fb5cc0cba0e089b6a901",
        },
        {
          address: "0xBB69c92FBb4F1aFf528875056650c862F94D3CC1",
          name: "Frax",
          symbol: "FRAX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xBB69c92FBb4F1aFf528875056650c862F94D3CC1/logo.png",
          resourceId:
            "0x0000000000000000000000853d955acef822db058eb8505911ed77f175b99e01",
        },
        {
          address: "0xb9AB39F9b4E3af0c97aE55EA48A960656C681A88",
          name: "Cream",
          symbol: "CREAM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xb9AB39F9b4E3af0c97aE55EA48A960656C681A88/logo.png",
          resourceId:
            "0x00000000000000000000002ba592f78db6436527729929aaf6c908497cb20001",
        },
        {
          address: "0x455b3FD5eF7bcA83C0c1Cd71695Ec7aEda773E4f",
          name: "Empty Set Dollar",
          symbol: "ESD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x455b3FD5eF7bcA83C0c1Cd71695Ec7aEda773E4f/logo.png",
          resourceId:
            "0x000000000000000000000036f3fd68e7325a35eb768f1aedaae9ea0689d72301",
        },
        {
          address: "0xd09Af6A3C12EC24CeD114A0829F5Bf73D40dC5A8",
          name: "Ankr Network",
          symbol: "ANKR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xd09Af6A3C12EC24CeD114A0829F5Bf73D40dC5A8/logo.png",
          resourceId:
            "0x00000000000000000000008290333cef9e6d528dd5618fb97a76f268f3edd401",
        },
        {
          address: "0x32141622A7C79790176670ffFcA17154678A9A24",
          name: "NuCypher",
          symbol: "NU",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x32141622A7C79790176670ffFcA17154678A9A24/logo.png",
          resourceId:
            "0x00000000000000000000004fe83213d56308330ec302a8bd641f1d0113a4cc01",
        },
        {
          address: "0x150DC9795908a27988aBf71C30E9B1647922A7B3",
          name: "DefiPulse Index",
          symbol: "DPI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x150DC9795908a27988aBf71C30E9B1647922A7B3/logo.png",
          resourceId:
            "0x00000000000000000000001494ca1f11d487c2bbe4543e90080aeba4ba3c2b01",
        },
        {
          address: "0x2c67EC45B2E7138823dee0576D0d17Ac6Aa36b74",
          name: "Livepeer Token",
          symbol: "LPT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2c67EC45B2E7138823dee0576D0d17Ac6Aa36b74/logo.png",
          resourceId:
            "0x000000000000000000000058b6a8a3302369daec383334672404ee733ab23901",
        },
        {
          address: "0x3585E1f43Af5A0E5a9429A8058BDf999ED67f81d",
          name: "Wrapped NXM",
          symbol: "wNXM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x3585E1f43Af5A0E5a9429A8058BDf999ED67f81d/logo.png",
          resourceId:
            "0x00000000000000000000000d438f3b5175bebc262bf23753c1e53d03432bde01",
        },
        {
          address: "0x1676C3D77ac75741678d6Ca28f288352a57D0973",
          name: "Polymath",
          symbol: "POLY",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1676C3D77ac75741678d6Ca28f288352a57D0973/logo.png",
          resourceId:
            "0x00000000000000000000009992ec3cf6a55b00978cddf2b27bc6882d88d1ec01",
        },
        {
          address: "0xA0e1645A594a3ac2556Ad0707D89B908B1A17d03",
          name: "YFII.finance",
          symbol: "YFII",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xA0e1645A594a3ac2556Ad0707D89B908B1A17d03/logo.png",
          resourceId:
            "0x0000000000000000000000a1d0e215a23d7030842fc67ce582a6afa3ccab8301",
        },
        {
          address: "0x374C62a3B07350de41C4A95c4094474f84d7BF66",
          name: "MATH Token",
          symbol: "MATH",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x374C62a3B07350de41C4A95c4094474f84d7BF66/logo.png",
          resourceId:
            "0x000000000000000000000008d967bb0134f2d07f7cfb6e246680c53927dd3001",
        },
        {
          address: "0xB42F2c83b4ee3C3620789B5603f4bdf01792e0a0",
          name: "Keep3rV1",
          symbol: "KP3R",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xB42F2c83b4ee3C3620789B5603f4bdf01792e0a0/logo.png",
          resourceId:
            "0x00000000000000000000001ceb5cb57c4d4e2b2433641b95dd330a33185a4401",
        },
        {
          address: "0x1c24D4ef397F6F8c80403f52E9D11Bef1D129a93",
          name: "tBTC",
          symbol: "TBTC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1c24D4ef397F6F8c80403f52E9D11Bef1D129a93/logo.png",
          resourceId:
            "0x00000000000000000000008daebade922df735c38c80c7ebd708af50815faa01",
        },
        {
          address: "0x23D7e6Af758883F4976617DAB2641af94FF7CA1F",
          name: "Fetch",
          symbol: "FET",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x23D7e6Af758883F4976617DAB2641af94FF7CA1F/logo.png",
          resourceId:
            "0x0000000000000000000000aea46a60368a7bd060eec7df8cba43b7ef41ad8501",
        },
        {
          address: "0x5E92Fb74d337cd3914E0E48a7E679f87f2585471",
          name: "FARM Reward Token",
          symbol: "FARM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x5E92Fb74d337cd3914E0E48a7E679f87f2585471/logo.png",
          resourceId:
            "0x0000000000000000000000a0246c9032bc3a600820415ae600c6388619a14d01",
        },
        {
          address: "0x5cDAD843078930C8fEB1d50bE474acCf11B7ada1",
          name: "Rocket Pool",
          symbol: "RPL",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x5cDAD843078930C8fEB1d50bE474acCf11B7ada1/logo.png",
          resourceId:
            "0x0000000000000000000000b4efd85c19999d84251304bda99e90b92300bd9301",
        },
        {
          address: "0x40871A08cd7b9751639a0831e5a83808F4c7EBA9",
          name: "Zks",
          symbol: "ZKS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x40871A08cd7b9751639a0831e5a83808F4c7EBA9/logo.png",
          resourceId:
            "0x0000000000000000000000e4815ae53b124e7263f08dcdbbb757d41ed658c601",
        },
        {
          address: "0xfCDf63735c1Cf3203CE64fEf59DcA6A7aC9A6D54",
          name: "ELF Token",
          symbol: "ELF",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xfCDf63735c1Cf3203CE64fEf59DcA6A7aC9A6D54/logo.png",
          resourceId:
            "0x0000000000000000000000bf2179859fc6d5bee9bf9158632dc51678a4100e01",
        },
        {
          address: "0x307A2a7127429f0C24c607E4633d17B6E98E8372",
          name: "Sora Token",
          symbol: "XOR",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x307A2a7127429f0C24c607E4633d17B6E98E8372/logo.png",
          resourceId:
            "0x000000000000000000000040fd72257597aa14c7231a7b1aaa29fce868f67701",
        },
        {
          address: "0x535E15B13f2A82350E8C02d62BDbA385a6307c30",
          name: "E-RADIX",
          symbol: "eXRD",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x535E15B13f2A82350E8C02d62BDbA385a6307c30/logo.png",
          resourceId:
            "0x00000000000000000000006468e79a80c0eab0f9a2b574c8d5bc374af5941401",
        },
        {
          address: "0x254Aa21D2996400b19CeE93623C307D6E973Ea3f",
          name: "Mainframe Token",
          symbol: "MFT",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x254Aa21D2996400b19CeE93623C307D6E973Ea3f/logo.png",
          resourceId:
            "0x0000000000000000000000df2c7238198ad8b389666574f2d8bc411a4b742801",
        },
        {
          address: "0xE1463E8991c8A62e64b77b5Fb6B22F190344C2A9",
          name: "PolkastarterToken",
          symbol: "POLS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xE1463E8991c8A62e64b77b5Fb6B22F190344C2A9/logo.png",
          resourceId:
            "0x000000000000000000000083e6f1e41cdd28eaceb20cb649155049fac3d5aa01",
        },
        {
          address: "0x59Cd8bb3E49930F313eD744585E4067bc45cF85d",
          name: "BarnBridge Governance Token",
          symbol: "BOND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x59Cd8bb3E49930F313eD744585E4067bc45cF85d/logo.png",
          resourceId:
            "0x00000000000000000000000391d2021f89dc339f60fff84546ea23e337750f01",
        },
        {
          address: "0x1830DD37A0ddd3207fFAc9013E4F4D60FEC22036",
          name: "EFFORCE IEO",
          symbol: "WOZX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1830DD37A0ddd3207fFAc9013E4F4D60FEC22036/logo.png",
          resourceId:
            "0x000000000000000000000034950ff2b487d9e5282c5ab342d08a2f712eb79f01",
        },
        {
          address: "0xA29d60Ef9706571bBDa9b505A117e1D36a0D683C",
          name: "SAND",
          symbol: "SAND",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xA29d60Ef9706571bBDa9b505A117e1D36a0D683C/logo.png",
          resourceId:
            "0x00000000000000000000003845badade8e6dff049820680d1f14bd3903a5d001",
        },
        {
          address: "0x17908a369a1884Ce287Bf79c269a16F0Fb84082E",
          name: "TrustSwap Token",
          symbol: "SWAP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x17908a369a1884Ce287Bf79c269a16F0Fb84082E/logo.png",
          resourceId:
            "0x0000000000000000000000cc4304a31d09258b0029ea7fe63d032f52e44efe01",
        },
        {
          address: "0x540641C9B0fcb979496A8c03C711033239C841d5",
          name: "STAKE",
          symbol: "STAKE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x540641C9B0fcb979496A8c03C711033239C841d5/logo.png",
          resourceId:
            "0x00000000000000000000000ae055097c6d159879521c384f1d2123d1f195e601",
        },
        {
          address: "0xdEA3Da33bDee64487358DB66d9AbC9EC256D1BFb",
          name: "Trace Token",
          symbol: "TRAC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xdEA3Da33bDee64487358DB66d9AbC9EC256D1BFb/logo.png",
          resourceId:
            "0x0000000000000000000000aa7a9ca87d3694b5755f213b5d04094b8d0f0a6f01",
        },
        {
          address: "0xfA178938Da2d58e55e52dc6dB92B99d9B2102EaE",
          name: "LoomToken",
          symbol: "LOOM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xfA178938Da2d58e55e52dc6dB92B99d9B2102EaE/logo.png",
          resourceId:
            "0x0000000000000000000000a4e8c3ec456107ea67d3075bf9e3df3a75823db001",
        },
        {
          address: "0xC386282f66c090A1e42c39e83dBD2c2d447dE506",
          name: "Spice",
          symbol: "SFI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xC386282f66c090A1e42c39e83dBD2c2d447dE506/logo.png",
          resourceId:
            "0x0000000000000000000000b753428af26e81097e7fd17f40c88aaa3e04902c01",
        },
        {
          address: "0x1D81360dADf2E1756FaeAe46072dD12997170F46",
          name: "KardiaChain Token",
          symbol: "KAI",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x1D81360dADf2E1756FaeAe46072dD12997170F46/logo.png",
          resourceId:
            "0x0000000000000000000000d9ec3ff1f8be459bb9369b4e79e9ebcf7141c09301",
        },
        {
          address: "0xF40920212A74387387328Db8e30726C0cc62ae33",
          name: "DuckDaoDime",
          symbol: "DDIM",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xF40920212A74387387328Db8e30726C0cc62ae33/logo.png",
          resourceId:
            "0x0000000000000000000000fbeea1c75e4c4465cb2fccc9c6d6afe984558e2001",
        },
        {
          address: "0x086A23685F2A33BfdeDF4dEd738e9afDdfb854Ed",
          name: "Akropolis",
          symbol: "AKRO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x086A23685F2A33BfdeDF4dEd738e9afDdfb854Ed/logo.png",
          resourceId:
            "0x00000000000000000000008ab7404063ec4dbcfd4598215992dc3f8ec853d701",
        },
        {
          address: "0xa9B41c348717F755101189b907F37Ee4ec703E8C",
          name: "QuarkChain Token",
          symbol: "QKC",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xa9B41c348717F755101189b907F37Ee4ec703E8C/logo.png",
          resourceId:
            "0x0000000000000000000000ea26c4ac16d4a5a106820bc8aee85fd0b7b2b66401",
        },
        {
          address: "0xEdd6ce14626B228D90aF0fB126a432e4b2174844",
          name: "AdEx Network",
          symbol: "ADX",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xEdd6ce14626B228D90aF0fB126a432e4b2174844/logo.png",
          resourceId:
            "0x0000000000000000000000ade00c28244d5ce17d72e40330b1c318cd12b7c301",
        },
        {
          address: "0x211960f8260DB1B0171c33931a2aeFd9562592B0",
          name: "BTU Protocol",
          symbol: "BTU",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x211960f8260DB1B0171c33931a2aeFd9562592B0/logo.png",
          resourceId:
            "0x0000000000000000000000b683d83a532e2cb7dfa5275eed3698436371cc9f01",
        },
        {
          address: "0x61EDA5B986b9da6A67a2a128e67ee7CED890DEAb",
          name: "Meta",
          symbol: "MTA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x61EDA5B986b9da6A67a2a128e67ee7CED890DEAb/logo.png",
          resourceId:
            "0x0000000000000000000000a3bed4e1c75d00fa6f4e5e6922db7261b5e9acd201",
        },
        {
          address: "0xd072dEcEb5FD919bF8853CeB1068438652a06c00",
          name: "DIAToken",
          symbol: "DIA",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0xd072dEcEb5FD919bF8853CeB1068438652a06c00/logo.png",
          resourceId:
            "0x000000000000000000000084ca8bc7997272c7cfb4d0cd3d55cd942b3c941901",
        },
        {
          address: "0x182795eE69b458930633A60DA79E8F9787A4828c",
          name: "RAMP DEFI",
          symbol: "RAMP",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x182795eE69b458930633A60DA79E8F9787A4828c/logo.png",
          resourceId:
            "0x000000000000000000000033d0568941c0c64ff7e0fb4fba0b11bd37deed9f01",
        },
        {
          address: "0x2bD2e0C3d39d6c82EaCA300958aa2E4be6740223",
          name: "Melon Token",
          symbol: "MLN",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x2bD2e0C3d39d6c82EaCA300958aa2E4be6740223/logo.png",
          resourceId:
            "0x0000000000000000000000ec67005c4e498ec7f55e092bd1d35cbc47c9189201",
        },
        {
          address: "0x480d6193B2a2Db2702F3ce6FE5Bc1F0c8a95336B",
          name: "DODO bird",
          symbol: "DODO",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x480d6193B2a2Db2702F3ce6FE5Bc1F0c8a95336B/logo.png",
          resourceId:
            "0x000000000000000000000043dfc4159d86f3a37a5a4b3d4580b888ad7d4ddd01",
        },
        {
          address: "0x424587becE1A7436Ae4a38eD9E8686992236618B",
          name: "cVault.finance",
          symbol: "CORE",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x424587becE1A7436Ae4a38eD9E8686992236618B/logo.png",
          resourceId:
            "0x000000000000000000000062359ed7505efc61ff1d56fef82158ccaffa23d701",
        },
        {
          address: "0x860d87C4EE3bf2F001a641e32FbeF8F0342Ba924",
          name: "Axie Infinity Shard",
          symbol: "AXS",
          imageUri:
            "https://raw.githubusercontent.com/ava-labs/bridge-tokens/main/avalanche-tokens/0x860d87C4EE3bf2F001a641e32FbeF8F0342Ba924/logo.png",
          resourceId:
            "0x0000000000000000000000f5d669627376ebd411e34b98f19c868c8aba5ada01",
        },
      ],
    },
  ],
};
