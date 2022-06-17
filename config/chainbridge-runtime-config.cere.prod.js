const cereTokenName = "CERE Network";
const cereTokenSymbol = "CERE";
const cereTokenDecimals = 10;

window.__RUNTIME_CONFIG__ = {
  CHAINBRIDGE: {
    ga: {
      trackingId: "G-EVYKNM010Y",
      appName: "chainbridge-ui",
    },
    chains: [
      {
        chainId: 2,
        networkId: 137,
        name: "Polygon Mainnet",
        decimals: cereTokenDecimals,
        bridgeAddress: "0xCaF65AB2eC9B39403966991eb34B1e8B9E44C041",
        erc20HandlerAddress: "0x8fe028Eb002bbc3ec45c5dF8acfFf67eC95B6f88",
        rpcUrl:
          "https://polygon-mainnet.infura.io/v3/0aca1499facc499bb195d2d437f78603",
        blockExplorer: "https://polygonscan.com/tx",
        type: "Ethereum",
        nativeTokenSymbol: "MATIC",
        defaultGasPrice: 800,
        gasPriceSuggestionEnabled: true,
        defaultGasPriceIncreaseInPercents: 10,
        availableAsHomeNetwork: true,
        tokens: [
          {
            address: "0x2da719db753dfa10a62e140f436e1d67f2ddb0d6",
            name: cereTokenName,
            symbol: cereTokenSymbol,
            imageUri: "CEREIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
            decimals: cereTokenDecimals,
            isDoubleApproval: false,
          },
        ],
        transferFallback: [
          {
            chainId: 1,
            delayMs: 4 * 60 * 1000,
            blockTimeMs: 6000,
            pollingMinIntervalMs: 15000,
            pollingMaxIntervalMs: 30000,
          },
        ],
      },
      {
        chainId: 1,
        networkId: 2,
        name: "Cere Mainnet",
        decimals: cereTokenDecimals,
        rpcUrl: "wss://rpc.v2.mainnet.cere.network/ws",
        blockExplorer:
          "https://explorer.cere.network/?rpc=wss%3A%2F%2Farchive.v2.mainnet.cere.network%2Fws#/explorer/query",
        rpcFallbackUrls: ["wss://archive.v2.mainnet.cere.network/ws"],
        type: "Substrate",
        nativeTokenSymbol: "CERE",
        availableAsHomeNetwork: true,
        chainbridgePalletName: "chainBridge",
        bridgeFeeValue: 0,
        transferPalletName: "erc20",
        transferFunctionName: "transferNative",
        typesFileName: "bridgeTypes.json",
        existentialDepositPlusNetworkFee: "1.03",
        bridgeAccountId: "5EYCAe5g7bGpFHagwe26HiRHdHdE3hobrwV6hq1UD2BPAiZb",
        tokens: [
          {
            address: "cere-native",
            name: cereTokenName,
            symbol: cereTokenSymbol,
            imageUri: "CEREIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
            decimals: cereTokenDecimals,
          },
        ],
        transferFallback: [
          {
            chainId: 2,
            delayMs: 3 * 60 * 1000,
            blockTimeMs: 3000,
            pollingMinIntervalMs: 15000,
            pollingMaxIntervalMs: 30000,
          },
        ],
      },
      {
        chainId: 0,
        networkId: 1,
        name: "Ethereum Mainnet",
        decimals: cereTokenDecimals,
        bridgeAddress: "0xCaF65AB2eC9B39403966991eb34B1e8B9E44C041",
        erc20HandlerAddress: "0x8fe028Eb002bbc3ec45c5dF8acfFf67eC95B6f88",
        rpcUrl: "https://mainnet.infura.io/v3/0aca1499facc499bb195d2d437f78603",
        blockExplorer: "https://etherscan.io/tx",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        defaultGasPrice: 400,
        availableAsHomeNetwork: true,
        tokens: [
          {
            address: "0x2da719db753dfa10a62e140f436e1d67f2ddb0d6",
            name: cereTokenName,
            symbol: cereTokenSymbol,
            imageUri: "CEREIcon",
            resourceId:
              "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
            decimals: cereTokenDecimals,
            isDoubleApproval: false,
          },
        ],
        transferFallback: [
          {
            chainId: 1,
            delayMs: 6 * 60 * 1000,
            blockTimeMs: 6000,
            pollingMinIntervalMs: 15000,
            pollingMaxIntervalMs: 30000,
          },
        ],
      },
    ],
  },
};
