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
        networkId: 80001,
        name: "Polygon Mumbai",
        decimals: cereTokenDecimals,
        bridgeAddress: "0xBDc040b15561CFC9ED1Ce049DE8bEAbf0b520b33",
        erc20HandlerAddress: "0x8Ee8876d13e79b846fb6c3e5Ffe226a2e111387a",
        rpcUrl:
          "https://polygon-mumbai.infura.io/v3/178b87e860404572bc217ca53fe594bd",
        blockExplorer: "https://mumbai.polygonscan.com/tx",
        type: "Ethereum",
        nativeTokenSymbol: "MATIC",
        defaultGasPrice: 800,
        gasPriceSuggestionEnabled: true,
        defaultGasPriceIncreaseInPercents: 10,
        availableAsHomeNetwork: true,
        tokens: [
          {
            address: "0xd111d479e23A8342A81ad595Ea1CAF229B3528c3",
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
        name: "Cere Testnet",
        decimals: cereTokenDecimals,
        rpcUrl: "wss://rpc.testnet.cere.network/ws",
        blockExplorer:
          "https://explorer.cere.network/?rpc=wss%3A%2F%2Farchive.testnet.cere.network%3A9945#/explorer/query",
        rpcFallbackUrls: ["wss://archive.testnet.cere.network/ws"],
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
        networkId: 5,
        name: "Ethereum Goerli",
        decimals: cereTokenDecimals,
        rpcUrl: "https://goerli.infura.io/v3/0aca1499facc499bb195d2d437f78603",
        blockExplorer: "https://goerli.etherscan.io/tx",
        bridgeAddress: "0x4E297d17A3d945Ed96dBbD205317501e92d8D6E8",
        erc20HandlerAddress: "0x92c1576845703089CF6c0788379ED81f75F45dd5",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        defaultGasPrice: 400,
        availableAsHomeNetwork: true,
        tokens: [
          {
            address: "0x0b10e304088b2BA2B2acfD2f72573FAaD31a13A5",
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
