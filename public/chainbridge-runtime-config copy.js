window.__RUNTIME_CONFIG__ = {
  INDEXER_URL: "http://localhost:8000",
  UI: {
    wrapTokenPage: true,
    transactionAutoUpdateInterval: 5000,
  },
  CHAINBRIDGE: {
    chains: [
      {
        domainId: 1,
        networkId: 4,
        name: "Rinkeby",
        decimals: 18,
        bridgeAddress: "0x53a1A0AC57888e8b3D21D90da0b25B27B4aDcf0f",
        erc20HandlerAddress: "0x098dB450bB9168e94a8e4119eb9A93AA175D3141",
        rpcUrl: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        tokens: [
          {
            address: "0x4A9E299b2156fddb12AaCeD6038001eA31610BFF",
            name: "TestTokenRinkeby",
            symbol: "ERC20",
            imageUri: "ETHIcon",
            resourceId:
              "0x000000000000000000000000000000e389d61c11e5fe32ec1735b3cd38c69500",
          },
        ],
      },
      {
        domainId: 0,
        networkId: 3,
        name: "Ropsten",
        decimals: 18,
        bridgeAddress: "0x62a7239863e5924aCC7426BbBcb0FEeCF2E197B5",
        erc20HandlerAddress: "0xA7FE0d387b64bE12283342e432dAA7A4A3f4772f",
        rpcUrl: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        type: "Ethereum",
        nativeTokenSymbol: "ETH",
        tokens: [
          {
            address: "0xF954708Bfdb4c6459d40195e035Be37085C0F79a",
            name: "TestTokenRopsten",
            symbol: "ERC20",
            imageUri: "ETHIcon",
            resourceId:
              "0x000000000000000000000000000000e389d61c11e5fe32ec1735b3cd38c69500",
          },
        ],
      },
    ],
  },
};
