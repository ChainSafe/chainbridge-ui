window.__RUNTIME_CONFIG__ = {
  // Ethereum - Shyft Mainnet Bridge
  CHAINBRIDGE: {
    chains: [
      {
        chainId: 1,
        networkId: 0x1cad,
        name: "Shyft [Native]",
        bridgeAddress: "0x566Ab5072CDB9cBEa216f9f9aB6AE11ee2f53203",
        erc20HandlerAddress: "0x3Bc3f0d31996f26914FFFC261Bd38FbB8A5aD649",
        rpcUrl: "https://rpc.shyft.network:64738",
        type: "Ethereum",
        blockExplorer: "https://bx.shyft.network/tx",
        nativeTokenSymbol: "SHFT",
        decimals: 18,
        tokens: [
          {
            address: "0x8ba95659e89b69506b46b47c232011e9cd754e15",
            name: "SHFT [ Wrapped ]",
            symbol: "SHFT",
            imageUri: "shyftIcon",
            resourceId:
              "0x00000000000000000000008ba95659e89b69506b46b47c232011e9cd754e1501",
            isNativeWrappedToken: true,
          },
        ],
      },
      {
        chainId: 101,
        networkId: 1,
        name: "Shyft [ERC20]",
        bridgeAddress: "0x566Ab5072CDB9cBEa216f9f9aB6AE11ee2f53203",
        erc20HandlerAddress: "0x3Bc3f0d31996f26914FFFC261Bd38FbB8A5aD649",
        rpcUrl: "https://mainnet.infura.io/v3/74934b1a6e0046c1b48f42c4ca6a9c58",
        type: "Ethereum",
        blockExplorer: "https://etherscan.io/tx",
        nativeTokenSymbol: "ETH",
        decimals: 18,
        tokens: [
          {
            address: "0xb17c88bda07d28b3838e0c1de6a30eafbcf52d85",
            name: "Shyft [ Wrapped ]",
            symbol: "SHFT",
            imageUri: "shyftIcon",
            resourceId:
              "0x00000000000000000000008ba95659e89b69506b46b47c232011e9cd754e1501",
          },
        ],
      },
    ],
  },
};
