const cereTokenName = "CERE Network";
const cereTokenSymbol = "CERE";
const cereTokenDecimals = 10;

window.__RUNTIME_CONFIG__ = {
  CHAINBRIDGE: {
    chains: [
      // ToDo: Uncomment when Polygon will be added
      // {
      //   chainId: 137,
      //   networkId: 137,
      //   name: "Polygon Mainnet",
      //   decimals: cereTokenDecimals,
      //   bridgeAddress: "0x0000000000000000000000000000000000000000",
      //   erc20HandlerAddress: "0x0000000000000000000000000000000000000000",
      //   rpcUrl: "",
      //   type: "Ethereum",
      //   nativeTokenSymbol: "MATIC",
      //   tokens: [
      //     {
      //       address: "0x0000000000000000000000000000000000000000",
      //       name: cereTokenName,
      //       symbol: cereTokenSymbol,
      //       imageUri: "CEREIcon",
      //       resourceId:
      //         "0x000000000000000000000000000000c76ebe4a02bbc34786d860b355f5a5ce00",
      //       decimals: cereTokenDecimals,
      //       isDoubleApproval: false,
      //     },
      //   ],
      // },
      {
        chainId: 1,
        networkId: 2,
        name: "Cere Mainnet",
        decimals: cereTokenDecimals,
        rpcUrl: "wss://rpc.mainnet.cere.network:9945",
        type: "Substrate",
        nativeTokenSymbol: "CERE",
        chainbridgePalletName: "chainBridge",
        bridgeFeeFunctionName: "tokenTransferFee",
        transferPalletName: "palletBridge",
        transferFunctionName: "transferNative",
        typesFileName: "bridgeTypes.json",
        tokens: [
          {
            address: "cere-native",
            name: cereTokenName,
            symbol: cereTokenSymbol,
            imageUri: "CEREIcon",
            resourceId: "cere-native",
            decimals: cereTokenDecimals,
          },
        ],
        destinationChain: true,
      },
      {
        chainId: 1,
        networkId: 1,
        name: "Ethereum Mainnet",
        decimals: cereTokenDecimals,
        bridgeAddress: "0xCaF65AB2eC9B39403966991eb34B1e8B9E44C041",
        erc20HandlerAddress: "0x8fe028Eb002bbc3ec45c5dF8acfFf67eC95B6f88",
        rpcUrl: "",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
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
      },
    ],
  },
};
