window.__RUNTIME_CONFIG__ = {
  INDEXER__URL: "http://localhost:8000",
  CHAINBRIDGE: {
    chains: [
      {
        domainId: 0,
        networkId: 4,
        name: "Ethereum - Rinkeby",
        decimals: 18,
        bridgeAddress: "0x691DCf269FDb2B9e4229d27fEd2FA7cEeBF660C8",
        erc20HandlerAddress: "0x4051C29d0545923554E3aBae5a31b5fb27e5949f",
        rpcUrl: "http://localhost:4000",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        tokens: [
          {
            address: "0x6829D0dA9f03338703E3d9fcAD6DD308202faf46",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000e389d61c11e5fe32ec1735b3cd38c69500",
          },
        ],
      },
      {
        domainId: 1,
        networkId: 5,
        name: "Ethereum - Goerli",
        decimals: 18,
        bridgeAddress: "0xF014f5c6B88C7D74c846eEEEE29c55d6BB51D9B0",
        erc20HandlerAddress: "0xa52624ac54165113913D37184AA5957DB99CF2C9",
        rpcUrl: "http://localhost:4001",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        tokens: [
          {
            address: "0x3e9a09aBB17509951Ea6F6E221700660017683cb",
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "WETHIcon",
            resourceId:
              "0x000000000000000000000000000000e389d61c11e5fe32ec1735b3cd38c69500",
          },
        ],
      },
    ],
  },
};
