export const runtimeTestingConfig = {
  CHAINBRIDGE: {
    INDEXER_URL: "http://localhost:8000",
    chains: [
      {
        chainId: 0,
        name: "Ethereum - Rinkeby",
      },
      {
        chainId: 1,
        name: "Ethereum - Goerli",
      },
    ],
  },
};

export const testResponse = [
  {
    id: "613f5e2900257e94008970da",
    depositNonce: 24,
    resourceId:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    fromChainId: 0,
    fromNetworkName: "EVM Celo Testnet",
    toChainId: 1,
    toNetworkName: "Ethereum - Rinkeby",
    fromAddress: "0x284D2Cb760D5A952f9Ea61fd3179F98a2CbF0B3E",
    toAddress: "0x42da3ba8c586f6fe9ef6ed1d09423eb73e4fe25b",
    tokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    amount: "1000000000000000000n",
    timestamp: 1630328891,
    depositTransactionHash:
      "0x8a36da16a46d52b856121f581415e4c7e1d21de4a9521c345d9d2a5df8f8b255",
    depositBlockNumber: 6994823,
    proposals: [],
    votes: [],
  },
  {
    id: "613f5ea500257e94008970db",
    depositNonce: 25,
    resourceId:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    fromChainId: 0,
    fromNetworkName: "EVM Celo Testnet",
    toChainId: 1,
    toNetworkName: "Ethereum - Rinkeby",
    fromAddress: "0x284D2Cb760D5A952f9Ea61fd3179F98a2CbF0B3E",
    toAddress: "0x42da3ba8c586f6fe9ef6ed1d09423eb73e4fe25b",
    tokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    amount: "1000000000000000000n",
    timestamp: 1630511631,
    depositTransactionHash:
      "0x6679cc6180fecb446bd9b2f2cba420601e4781dae5c3be681be1ef6c27214da0",
    depositBlockNumber: 7031371,
    proposals: [
      {
        id: "613f5ebd0031b2a60060772c",
        proposalStatus: 1,
        dataHash:
          "0x808499ffbc353a1c892ff051e3f2ace42f30c7b7352636988ced15dcddcb758d",
        proposalEventTransactionHash:
          "0x557e71b9d44aeb230d6a4af47002a68c5a0e58f05566b42d20d9302d3eebd0d6",
        proposalEventBlockNumber: 9217370,
        timestamp: 1630511687,
        transferId: "613f5ea500257e94008970db",
      },
      {
        id: "613f5ebd0031b2a60060772d",
        proposalStatus: 2,
        dataHash:
          "0x808499ffbc353a1c892ff051e3f2ace42f30c7b7352636988ced15dcddcb758d",
        proposalEventTransactionHash:
          "0x4d742e070477ec6b05d0288da1f8ba9f8c73323e90bfb8e4d2f9fac023150bfc",
        proposalEventBlockNumber: 9217370,
        timestamp: 1630511687,
        transferId: "613f5ea500257e94008970db",
      },
      {
        id: "613f5ebe0031b2a60060772e",
        proposalStatus: 3,
        dataHash:
          "0x808499ffbc353a1c892ff051e3f2ace42f30c7b7352636988ced15dcddcb758d",
        proposalEventTransactionHash:
          "0xad4d7d7d6dc402cd49e54d8094f817f5b60105ad0f56310568a3318a84751fd7",
        proposalEventBlockNumber: 9217371,
        timestamp: 1630511702,
        transferId: "613f5ea500257e94008970db",
      },
    ],
    votes: [
      {
        id: "613f5ec0000601930005be6c",
        voteBlockNumber: 9217370,
        voteTransactionHash:
          "0x557e71b9d44aeb230d6a4af47002a68c5a0e58f05566b42d20d9302d3eebd0d6",
        dataHash: null,
        timestamp: 1630511687,
        voteStatus: true,
        transferId: "613f5ea500257e94008970db",
      },
      {
        id: "613f5ec0000601930005be6d",
        voteBlockNumber: 9217370,
        voteTransactionHash:
          "0x4d742e070477ec6b05d0288da1f8ba9f8c73323e90bfb8e4d2f9fac023150bfc",
        dataHash: null,
        timestamp: 1630511687,
        voteStatus: true,
        transferId: "613f5ea500257e94008970db",
      },
    ],
  },
  {
    id: "613f5ea800257e94008970dc",
    depositNonce: 26,
    resourceId:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    fromChainId: 0,
    fromNetworkName: "EVM Celo Testnet",
    toChainId: 1,
    toNetworkName: "Ethereum - Rinkeby",
    fromAddress: "0x6DACDc98FbB776B67278274B508bC76588DeEfC6",
    toAddress: "0x6dacdc98fbb776b67278274b508bc76588deefc6",
    tokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    amount: "1000000000000000000n",
    timestamp: 1630587961,
    depositTransactionHash:
      "0xd6158cf5602f1fa22791e00218d269c7620c82bdcdfdd0f0f309de4784fbb189",
    depositBlockNumber: 7046637,
    proposals: [
      {
        id: "613f5ebe0031b2a60060772f",
        proposalStatus: 1,
        dataHash:
          "0x7150028d5a452d8129da7b30ccfe6870333e44be96859ef6a336ef70d7365241",
        proposalEventTransactionHash:
          "0x6e369fe86006540fc7dacaf84c77922df7ad0f001dbc932a1c4d77f9e0b1b7b3",
        proposalEventBlockNumber: 9222453,
        timestamp: 1630588030,
        transferId: "613f5ea800257e94008970dc",
      },
      {
        id: "613f5ebe0031b2a600607730",
        proposalStatus: 2,
        dataHash:
          "0x7150028d5a452d8129da7b30ccfe6870333e44be96859ef6a336ef70d7365241",
        proposalEventTransactionHash:
          "0xea290916386de4012fba89239db435c479dc926693dbe7d8c42033bd56ef344f",
        proposalEventBlockNumber: 9222453,
        timestamp: 1630588030,
        transferId: "613f5ea800257e94008970dc",
      },
      {
        id: "613f5ebe0031b2a600607731",
        proposalStatus: 3,
        dataHash:
          "0x7150028d5a452d8129da7b30ccfe6870333e44be96859ef6a336ef70d7365241",
        proposalEventTransactionHash:
          "0x456c4f62437ba4199e9284c95091f55ab028ce8d29df176da1ac6ba8908af61d",
        proposalEventBlockNumber: 9222460,
        timestamp: 1630588136,
        transferId: "613f5ea800257e94008970dc",
      },
    ],
    votes: [
      {
        id: "613f5ec0000601930005be6e",
        voteBlockNumber: 9222453,
        voteTransactionHash:
          "0x6e369fe86006540fc7dacaf84c77922df7ad0f001dbc932a1c4d77f9e0b1b7b3",
        dataHash: null,
        timestamp: 1630588030,
        voteStatus: true,
        transferId: "613f5ea800257e94008970dc",
      },
      {
        id: "613f5ec1000601930005be6f",
        voteBlockNumber: 9222453,
        voteTransactionHash:
          "0xea290916386de4012fba89239db435c479dc926693dbe7d8c42033bd56ef344f",
        dataHash: null,
        timestamp: 1630588030,
        voteStatus: true,
        transferId: "613f5ea800257e94008970dc",
      },
    ],
  },
  {
    id: "613f5eab00257e94008970dd",
    depositNonce: 27,
    resourceId:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    fromChainId: 0,
    fromNetworkName: "EVM Celo Testnet",
    toChainId: 1,
    toNetworkName: "Ethereum - Rinkeby",
    fromAddress: "0x284D2Cb760D5A952f9Ea61fd3179F98a2CbF0B3E",
    toAddress: "0x42da3ba8c586f6fe9ef6ed1d09423eb73e4fe25b",
    tokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
    amount: "2000000000000000000n",
    timestamp: 1631266522,
    depositTransactionHash:
      "0xb5fe642492c5dc58074ddbb66be69ea361598597b6e210afde41af8095d7bb6b",
    depositBlockNumber: 7182332,
    proposals: [
      {
        id: "613f5ebf0031b2a600607732",
        proposalStatus: 1,
        dataHash:
          "0x5f1df35a94bcf98c767b3ad5f41c904c2fbd20b4ce6b8cbbca3c1f3a275cf6a5",
        proposalEventTransactionHash:
          "0x336de264a1d0befb2093558412adf5d1be37ab8ffefd2af634cca99e2fcf897d",
        proposalEventBlockNumber: 9267476,
        timestamp: 1631266580,
        transferId: "613f5eab00257e94008970dd",
      },
      {
        id: "613f5ebf0031b2a600607733",
        proposalStatus: 2,
        dataHash:
          "0x5f1df35a94bcf98c767b3ad5f41c904c2fbd20b4ce6b8cbbca3c1f3a275cf6a5",
        proposalEventTransactionHash:
          "0x3b40db3cb95d770180602fd0119831e87c597c685f33c2a1a07fcd081a49bb7b",
        proposalEventBlockNumber: 9267476,
        timestamp: 1631266580,
        transferId: "613f5eab00257e94008970dd",
      },
      {
        id: "613f5ebf0031b2a600607734",
        proposalStatus: 3,
        dataHash:
          "0x5f1df35a94bcf98c767b3ad5f41c904c2fbd20b4ce6b8cbbca3c1f3a275cf6a5",
        proposalEventTransactionHash:
          "0x400f4d1bf2eb627317cb3dfb2bdf720b8a9f32429030f00d60c88ee98d138dcb",
        proposalEventBlockNumber: 9267478,
        timestamp: 1631266611,
        transferId: "613f5eab00257e94008970dd",
      },
    ],
    votes: [
      {
        id: "613f5ec1000601930005be70",
        voteBlockNumber: 9267476,
        voteTransactionHash:
          "0x336de264a1d0befb2093558412adf5d1be37ab8ffefd2af634cca99e2fcf897d",
        dataHash: null,
        timestamp: 1631266580,
        voteStatus: true,
        transferId: "613f5eab00257e94008970dd",
      },
      {
        id: "613f5ec1000601930005be71",
        voteBlockNumber: 9267476,
        voteTransactionHash:
          "0x3b40db3cb95d770180602fd0119831e87c597c685f33c2a1a07fcd081a49bb7b",
        dataHash: null,
        timestamp: 1631266580,
        voteStatus: true,
        transferId: "613f5eab00257e94008970dd",
      },
    ],
  },
  {
    id: "613f5eae0031b2a600607724",
    depositNonce: 29,
    resourceId:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    fromChainId: 1,
    fromNetworkName: "Ethereum - Rinkeby",
    toChainId: 0,
    toNetworkName: "EVM Celo Testnet",
    fromAddress: "0x42Da3Ba8c586F6fe9eF6ed1d09423eB73E4fe25b",
    toAddress: "0x284d2cb760d5a952f9ea61fd3179f98a2cbf0b3e",
    tokenAddress: "0xe09523d86d9b788BCcb580d061605F31FCe69F51",
    amount: "2000000000000000000n",
    timestamp: 1630410424,
    depositTransactionHash:
      "0xf79a8331c195513f478e7ecf8d76ac49fb544d159ea5088cc6b93a8bd0f36f17",
    depositBlockNumber: 9211212,
    proposals: [
      {
        id: "613f5eae0031b2a600607725",
        proposalStatus: 1,
        dataHash:
          "0x9b1270722c349b0831172bb8e5e8d501d5adb01d24b7297a2ed803f279822ca2",
        proposalEventTransactionHash:
          "0x6ba443db4961d9b2ad696a6d551f0da1b4eb6955d7266a283e36097590890a69",
        proposalEventBlockNumber: 7011161,
        timestamp: 1630410581,
        transferId: "613f5eae0031b2a600607724",
      },
      {
        id: "613f5eaf0031b2a600607726",
        proposalStatus: 2,
        dataHash:
          "0x9b1270722c349b0831172bb8e5e8d501d5adb01d24b7297a2ed803f279822ca2",
        proposalEventTransactionHash:
          "0x7e5eded9a48eb6eafe2ef00298f055723bbc082a93beb5a49452c0d1d5c674be",
        proposalEventBlockNumber: 7011161,
        timestamp: 1630410581,
        transferId: "613f5eae0031b2a600607724",
      },
      {
        id: "613f5eb00031b2a600607727",
        proposalStatus: 3,
        dataHash:
          "0x9b1270722c349b0831172bb8e5e8d501d5adb01d24b7297a2ed803f279822ca2",
        proposalEventTransactionHash:
          "0x6594a2afaab35f6e6e296b2d5fe616257d8e61d3144e7ecde26c3c2bbcf6ee1c",
        proposalEventBlockNumber: 7011162,
        timestamp: 1630410586,
        transferId: "613f5eae0031b2a600607724",
      },
    ],
    votes: [
      {
        id: "613f5eb6000601930005be68",
        voteBlockNumber: 7011161,
        voteTransactionHash:
          "0x6ba443db4961d9b2ad696a6d551f0da1b4eb6955d7266a283e36097590890a69",
        dataHash: null,
        timestamp: 1630410581,
        voteStatus: true,
        transferId: "613f5eae0031b2a600607724",
      },
      {
        id: "613f5eb7000601930005be69",
        voteBlockNumber: 7011161,
        voteTransactionHash:
          "0x7e5eded9a48eb6eafe2ef00298f055723bbc082a93beb5a49452c0d1d5c674be",
        dataHash: null,
        timestamp: 1630410581,
        voteStatus: true,
        transferId: "613f5eae0031b2a600607724",
      },
    ],
  },
  {
    id: "613f5eb10031b2a600607728",
    depositNonce: 30,
    resourceId:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    fromChainId: 1,
    fromNetworkName: "Ethereum - Rinkeby",
    toChainId: 0,
    toNetworkName: "EVM Celo Testnet",
    fromAddress: "0x42Da3Ba8c586F6fe9eF6ed1d09423eB73E4fe25b",
    toAddress: "0x284d2cb760d5a952f9ea61fd3179f98a2cbf0b3e",
    tokenAddress: "0xe09523d86d9b788BCcb580d061605F31FCe69F51",
    amount: "1000000000000000000n",
    timestamp: 1630413699,
    depositTransactionHash:
      "0x7b62890f02114d55edc5e6f54c78bc1f232c2768d1e2ca27f1a9e3cf1634d9dc",
    depositBlockNumber: 9211430,
    proposals: [
      {
        id: "613f5eb10031b2a600607729",
        proposalStatus: 1,
        dataHash:
          "0xc83fd43db2f31453628017304da0f981ba9717f948757c7a9ae7d60417ea3ffc",
        proposalEventTransactionHash:
          "0xa43884180db23a86fe9d76e096954155df1cc3f71f566305ba245ccea1dcc149",
        proposalEventBlockNumber: 7011816,
        timestamp: 1630413856,
        transferId: "613f5eb10031b2a600607728",
      },
      {
        id: "613f5eb20031b2a60060772a",
        proposalStatus: 2,
        dataHash:
          "0xc83fd43db2f31453628017304da0f981ba9717f948757c7a9ae7d60417ea3ffc",
        proposalEventTransactionHash:
          "0xc5bf46e61cca947c107cfca4313c42fadf9531d6ba88dbaa9794f2858437de73",
        proposalEventBlockNumber: 7011816,
        timestamp: 1630413856,
        transferId: "613f5eb10031b2a600607728",
      },
      {
        id: "613f5eb30031b2a60060772b",
        proposalStatus: 3,
        dataHash:
          "0xc83fd43db2f31453628017304da0f981ba9717f948757c7a9ae7d60417ea3ffc",
        proposalEventTransactionHash:
          "0x8b616d2ea4a9d98fe3706e8126023c8aca035ad190088e6db170bb9b245bfbc3",
        proposalEventBlockNumber: 7011817,
        timestamp: 1630413861,
        transferId: "613f5eb10031b2a600607728",
      },
    ],
    votes: [
      {
        id: "613f5eb8000601930005be6a",
        voteBlockNumber: 7011816,
        voteTransactionHash:
          "0xa43884180db23a86fe9d76e096954155df1cc3f71f566305ba245ccea1dcc149",
        dataHash: null,
        timestamp: 1630413856,
        voteStatus: true,
        transferId: "613f5eb10031b2a600607728",
      },
      {
        id: "613f5eba000601930005be6b",
        voteBlockNumber: 7011816,
        voteTransactionHash:
          "0xc5bf46e61cca947c107cfca4313c42fadf9531d6ba88dbaa9794f2858437de73",
        dataHash: null,
        timestamp: 1630413856,
        voteStatus: true,
        transferId: "613f5eb10031b2a600607728",
      },
    ],
  },
  {
    id: "613f5ebd00257e94008970de",
    depositNonce: 31,
    resourceId:
      "0x0000000000000000000000000000000000000000000000000000000000000000",
    fromChainId: 1,
    fromNetworkName: "Ethereum - Rinkeby",
    toChainId: 0,
    toNetworkName: "EVM Celo Testnet",
    fromAddress: "0x42Da3Ba8c586F6fe9eF6ed1d09423eB73E4fe25b",
    toAddress: "0x284d2cb760d5a952f9ea61fd3179f98a2cbf0b3e",
    tokenAddress: "0xe09523d86d9b788BCcb580d061605F31FCe69F51",
    amount: "1000000000000000000n",
    timestamp: 1631266008,
    depositTransactionHash:
      "0xb5ce4e5b7b639ac7237b393993dc339bf8338a8199311a529a195534511f8eae",
    depositBlockNumber: 9267438,
    proposals: [],
    votes: [],
  },
];
