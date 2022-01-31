const cereTokenName = "CERE Network";
const cereTokenSymbol = "CERE";
const cereTokenDecimals = 10;

window.__RUNTIME_CONFIG__ = {
  CHAINBRIDGE: {
    chains: [
      // {
      //   chainId: 81,
      //   networkId: 80001,
      //   name: "Polygon Mumbai",
      //   decimals: cereTokenDecimals,
      //   bridgeAddress: "0xBDc040b15561CFC9ED1Ce049DE8bEAbf0b520b33",
      //   erc20HandlerAddress: "0x8Ee8876d13e79b846fb6c3e5Ffe226a2e111387a",
      //   rpcUrl: "",
      //   type: "Ethereum",
      //   nativeTokenSymbol: "MATIC",
      //   tokens: [
      //     {
      //       address: "0xd111d479e23A8342A81ad595Ea1CAF229B3528c3",
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
        name: "Cere Testnet",
        decimals: cereTokenDecimals,
        rpcUrl: "wss://rpc.testnet.cere.network:9945",
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
        chainId: 5,
        networkId: 5,
        name: "Ethereum Goerli",
        decimals: cereTokenDecimals,
        bridgeAddress: "0x4E297d17A3d945Ed96dBbD205317501e92d8D6E8",
        erc20HandlerAddress: "0x92c1576845703089CF6c0788379ED81f75F45dd5",
        rpcUrl: "",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
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
      },
    ],
  },
};
