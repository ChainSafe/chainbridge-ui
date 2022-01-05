export const runtimeTestingConfig = {
  CHAINBRIDGE: {
    INDEXER_URL: "http://localhost:8000",
    chains: [
      {
        domainId: 0,
        name: "Ethereum - Rinkeby",
        tokens: [
          {
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "EthIcon",
          },
        ],
      },
      {
        domainId: 1,
        name: "Ethereum - Goerli",
        tokens: [
          {
            name: "an ERC20",
            symbol: "ERC20",
            imageUri: "EthIcon",
          },
        ],
      },
    ],
  },
};

export const testResponse = {
  pageInfo: {
    endCursor: "6168369200a6e07500e787dd",
    hasNextPage: true,
    hasPreviousPage: false,
    startCursor: "616836b000a6e07500e787e6",
  },
  transfers: [
    {
      id: "6152885a002365d40040df6d",
      depositNonce: 25,
      resourceId:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      fromDomainId: 0,
      fromNetworkName: "EVM Celo Testnet",
      toDomainId: 1,
      toNetworkName: "Ethereum - Rinkeby",
      fromAddress: "0x284D2Cb760D5A952f9Ea61fd3179F98a2CbF0B3E",
      toAddress: "0x42da3ba8c586f6fe9ef6ed1d09423eb73e4fe25b",
      tokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      amount: "1000000000000000000n",
      timestamp: 1630511631,
      depositTransactionHash:
        "0x6679cc6180fecb446bd9b2f2cba420601e4781dae5c3be681be1ef6c27214da0",
      depositBlockNumber: 7031371,
      status: 3,
      sourceTokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      destinationTokenAddress: "0xe09523d86d9b788BCcb580d061605F31FCe69F51",
      proposalEvents: [
        {
          id: "615288e100e2ebe900a253df",
          proposalStatus: 1,
          dataHash:
            "0x808499ffbc353a1c892ff051e3f2ace42f30c7b7352636988ced15dcddcb758d",
          proposalEventTransactionHash:
            "0x557e71b9d44aeb230d6a4af47002a68c5a0e58f05566b42d20d9302d3eebd0d6",
          proposalEventBlockNumber: 9217370,
          timestamp: 1630511687,
          transferId: "6152885a002365d40040df6d",
          by: "0x42F567FEA3Cf5F27186344F04A5774A753B55b39",
        },
        {
          id: "615288e200e2ebe900a253e0",
          proposalStatus: 2,
          dataHash:
            "0x808499ffbc353a1c892ff051e3f2ace42f30c7b7352636988ced15dcddcb758d",
          proposalEventTransactionHash:
            "0x4d742e070477ec6b05d0288da1f8ba9f8c73323e90bfb8e4d2f9fac023150bfc",
          proposalEventBlockNumber: 9217370,
          timestamp: 1630511687,
          transferId: "6152885a002365d40040df6d",
          by: "0x010f478794f9b1917f9d2d31865f516729Be6208",
        },
        {
          id: "615288e300e2ebe900a253e1",
          proposalStatus: 3,
          dataHash:
            "0x808499ffbc353a1c892ff051e3f2ace42f30c7b7352636988ced15dcddcb758d",
          proposalEventTransactionHash:
            "0xad4d7d7d6dc402cd49e54d8094f817f5b60105ad0f56310568a3318a84751fd7",
          proposalEventBlockNumber: 9217371,
          timestamp: 1630511702,
          transferId: "6152885a002365d40040df6d",
          by: "0x42F567FEA3Cf5F27186344F04A5774A753B55b39",
        },
      ],
      voteEvents: [
        {
          id: "6152899f00e2335800a9b3c4",
          voteBlockNumber: 9217370,
          voteTransactionHash:
            "0x557e71b9d44aeb230d6a4af47002a68c5a0e58f05566b42d20d9302d3eebd0d6",
          dataHash: null,
          timestamp: 1630511687,
          voteStatus: true,
          transferId: "6152885a002365d40040df6d",
          by: "0x42F567FEA3Cf5F27186344F04A5774A753B55b39",
        },
        {
          id: "615289a000e2335800a9b3c5",
          voteBlockNumber: 9217370,
          voteTransactionHash:
            "0x4d742e070477ec6b05d0288da1f8ba9f8c73323e90bfb8e4d2f9fac023150bfc",
          dataHash: null,
          timestamp: 1630511687,
          voteStatus: true,
          transferId: "6152885a002365d40040df6d",
          by: "0x010f478794f9b1917f9d2d31865f516729Be6208",
        },
      ],
    },
    {
      id: "6152885e002365d40040df6e",
      depositNonce: 26,
      resourceId:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      fromDomainId: 0,
      fromNetworkName: "EVM Celo Testnet",
      toDomainId: 1,
      toNetworkName: "Ethereum - Rinkeby",
      fromAddress: "0x6DACDc98FbB776B67278274B508bC76588DeEfC6",
      toAddress: "0x6dacdc98fbb776b67278274b508bc76588deefc6",
      tokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      amount: "1000000000000000000n",
      timestamp: 1630587961,
      depositTransactionHash:
        "0xd6158cf5602f1fa22791e00218d269c7620c82bdcdfdd0f0f309de4784fbb189",
      depositBlockNumber: 7046637,
      status: 3,
      sourceTokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      destinationTokenAddress: "0xe09523d86d9b788BCcb580d061605F31FCe69F51",
      proposalEvents: [
        {
          id: "615288e300e2ebe900a253e2",
          proposalStatus: 1,
          dataHash:
            "0x7150028d5a452d8129da7b30ccfe6870333e44be96859ef6a336ef70d7365241",
          proposalEventTransactionHash:
            "0x6e369fe86006540fc7dacaf84c77922df7ad0f001dbc932a1c4d77f9e0b1b7b3",
          proposalEventBlockNumber: 9222453,
          timestamp: 1630588030,
          transferId: "6152885e002365d40040df6e",
          by: "0xb7d584fE0085fEb275FAc27deaCddA404AdD949A",
        },
        {
          id: "615288e400e2ebe900a253e3",
          proposalStatus: 2,
          dataHash:
            "0x7150028d5a452d8129da7b30ccfe6870333e44be96859ef6a336ef70d7365241",
          proposalEventTransactionHash:
            "0xea290916386de4012fba89239db435c479dc926693dbe7d8c42033bd56ef344f",
          proposalEventBlockNumber: 9222453,
          timestamp: 1630588030,
          transferId: "6152885e002365d40040df6e",
          by: "0x010f478794f9b1917f9d2d31865f516729Be6208",
        },
        {
          id: "615288e500e2ebe900a253e4",
          proposalStatus: 3,
          dataHash:
            "0x7150028d5a452d8129da7b30ccfe6870333e44be96859ef6a336ef70d7365241",
          proposalEventTransactionHash:
            "0x456c4f62437ba4199e9284c95091f55ab028ce8d29df176da1ac6ba8908af61d",
          proposalEventBlockNumber: 9222460,
          timestamp: 1630588136,
          transferId: "6152885e002365d40040df6e",
          by: "0x010f478794f9b1917f9d2d31865f516729Be6208",
        },
      ],
      voteEvents: [
        {
          id: "615289a000e2335800a9b3c6",
          voteBlockNumber: 9222453,
          voteTransactionHash:
            "0x6e369fe86006540fc7dacaf84c77922df7ad0f001dbc932a1c4d77f9e0b1b7b3",
          dataHash: null,
          timestamp: 1630588030,
          voteStatus: true,
          transferId: "6152885e002365d40040df6e",
          by: "0xb7d584fE0085fEb275FAc27deaCddA404AdD949A",
        },
        {
          id: "615289a100e2335800a9b3c7",
          voteBlockNumber: 9222453,
          voteTransactionHash:
            "0xea290916386de4012fba89239db435c479dc926693dbe7d8c42033bd56ef344f",
          dataHash: null,
          timestamp: 1630588030,
          voteStatus: true,
          transferId: "6152885e002365d40040df6e",
          by: "0x010f478794f9b1917f9d2d31865f516729Be6208",
        },
      ],
    },
  ],
};

export const canceledTransfer = {
  id: "61528856002365d40040df6c",
  depositNonce: 24,
  resourceId:
    "0x0000000000000000000000000000000000000000000000000000000000000000",
  fromDomainId: 0,
  fromNetworkName: "EVM Celo Testnet",
  toDomainId: 1,
  toNetworkName: "Ethereum - Rinkeby",
  fromAddress: "0x284D2Cb760D5A952f9Ea61fd3179F98a2CbF0B3E",
  toAddress: "0x42da3ba8c586f6fe9ef6ed1d09423eb73e4fe25b",
  tokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  amount: "1000000000000000000n",
  timestamp: 1630328891,
  depositTransactionHash:
    "0x8a36da16a46d52b856121f581415e4c7e1d21de4a9521c345d9d2a5df8f8b255",
  depositBlockNumber: 6994823,
  status: 4,
  sourceTokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
  destinationTokenAddress: "0xe09523d86d9b788BCcb580d061605F31FCe69F51",
  proposalEvents: [
    {
      id: "615288e100e2ebe900a253df",
      proposalStatus: 1,
      dataHash:
        "0x808499ffbc353a1c892ff051e3f2ace42f30c7b7352636988ced15dcddcb758d",
      proposalEventTransactionHash:
        "0x557e71b9d44aeb230d6a4af47002a68c5a0e58f05566b42d20d9302d3eebd0d6",
      proposalEventBlockNumber: 9217370,
      timestamp: 1630511687,
      transferId: "6152885a002365d40040df6d",
      by: "0x42F567FEA3Cf5F27186344F04A5774A753B55b39",
    },
    {
      id: "615288e200e2ebe900a253e0",
      proposalStatus: 2,
      dataHash:
        "0x808499ffbc353a1c892ff051e3f2ace42f30c7b7352636988ced15dcddcb758d",
      proposalEventTransactionHash:
        "0x4d742e070477ec6b05d0288da1f8ba9f8c73323e90bfb8e4d2f9fac023150bfc",
      proposalEventBlockNumber: 9217370,
      timestamp: 1630511687,
      transferId: "6152885a002365d40040df6d",
      by: "0x010f478794f9b1917f9d2d31865f516729Be6208",
    },
  ],
  voteEvents: [],
};
