window.__RUNTIME_CONFIG__ = {
  // Goerli - Shyft Testnet Bridge
  CHAINBRIDGE: {
    chains: [
      {
        chainId: 10,
        networkId: 0x2cad,
        name: "Shyft [ v5 Testnet ]",
        bridgeAddress: "0x566Ab5072CDB9cBEa216f9f9aB6AE11ee2f53203",
        erc20HandlerAddress: "0x3Bc3f0d31996f26914FFFC261Bd38FbB8A5aD649",
        rpcUrl: "http://rpc.testnet.shyft.network:64738",
        type: "Ethereum",
        blockExplorer: "https://bx.shyft.network/tx",
        nativeTokenSymbol: "SHFT [ TestNet5 ]",
        decimals: 18,
        tokens: [
          {
            address: "0x8ba95659e89b69506b46b47c232011e9cd754e15",
            name: "SHFT [ Wrapped ]",
            symbol: "SHFT",
            imageUri: "ShyftIcon",
            resourceId:
              "0x00000000000000000000008ba95659e89b69506b46b47c232011e9cd754e1500",
            isNativeWrappedToken: true,
          },
        ],
      },
      {
        chainId: 110,
        networkId: 5,
        name: "Goerli [ Ethereum Testnet ]",
        bridgeAddress: "0x566Ab5072CDB9cBEa216f9f9aB6AE11ee2f53203",
        erc20HandlerAddress: "0x3Bc3f0d31996f26914FFFC261Bd38FbB8A5aD649",
        rpcUrl: "http://goerli.bu.shyftnetwork.org:8545",
        type: "Ethereum",
        blockExplorer: "https://goerli.etherscan.io/tx",
        nativeTokenSymbol: "ETH [ Goerli ]",
        decimals: 18,
        tokens: [
          {
            address: "0xb17c88bda07d28b3838e0c1de6a30eafbcf52d85",
            name: "Shyft [ Wrapped ]",
            symbol: "SHFT",
            imageUri: "ShyftIcon",
            resourceId:
              "0x00000000000000000000008ba95659e89b69506b46b47c232011e9cd754e1500",
          },
        ],
      },
    ],
  },
};
