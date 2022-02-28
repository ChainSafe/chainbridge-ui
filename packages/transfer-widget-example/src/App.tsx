import React, { useEffect, useState } from "react";
import Widget from "chainbridge-ui-transfer-widget-unstable";

import "./App.css";

const App: React.FC<{}> = () => {
  const runtimeConfig = {
    INDEXER_URL: "http://localhost:8000",
    UI: {
      // wrapTokenPage: true,
      transactionAutoUpdateInterval: 5000,
    },
    CHAINBRIDGE: {
      chains: [
        {
          domainId: 0,
          networkId: 4,
          name: "Rinkeby",
          decimals: 18,
          bridgeAddress: "0x894E63d6eba8173a291A47979335a745788170Af",
          erc20HandlerAddress: "0xCAe16A9e0ED433C3612A89755e5580a9f0B6C889",
          rpcUrl: "http://35.170.120.58:8545",
          type: "Ethereum",
          nativeTokenSymbol: "ETH",
          tokens: [
            {
              address: "0xcA48E8b753268c67F708C5A95E62092A7b8E2Cae",
              name: "csUSD",
              symbol: "csUSD",
              imageUri: "ETHIcon",
              resourceId:
                "0x0000000000000000000000008EC076FaE5BAe1496BD5F9E685485fD4bEf57C54",
            },
          ],
        },
        {
          domainId: 1,
          networkId: 5,
          name: "Goerli",
          decimals: 18,
          bridgeAddress: "0x537949Ad4d0CBf45E4Bb6B921FF49acD93cd040b",
          erc20HandlerAddress: "0x3c30b56DEd047fe6225f7004Ea4be1ae70C9026a",
          rpcUrl: "http://35.170.120.58:8645",
          type: "Ethereum",
          nativeTokenSymbol: "ETH",
          tokens: [
            {
              address: "0x8EC076FaE5BAe1496BD5F9E685485fD4bEf57C54",
              name: "csUSD",
              symbol: "csUSD",
              imageUri: "ETHIcon",
              resourceId:
                "0x0000000000000000000000008EC076FaE5BAe1496BD5F9E685485fD4bEf57C54",
            },
          ],
        },
        {
          domainId: 2,
          networkId: 44787,
          name: "Alfajores",
          decimals: 18,
          bridgeAddress: "0x7B4ff372ec4159404c6d216C34F6d0B29F080665",
          erc20HandlerAddress: "0x442E7f13AA0cfAbF3FfaEfA4649f5fBe68ff9db2",
          rpcUrl: "https://alfajores-forno.celo-testnet.org",
          type: "Ethereum",
          nativeTokenSymbol: "ETH",
          tokens: [
            {
              address: "0xcA48E8b753268c67F708C5A95E62092A7b8E2Cae",
              name: "csUSD",
              symbol: "csUSD",
              imageUri: "ETHIcon",
              resourceId:
                "0x0000000000000000000000008EC076FaE5BAe1496BD5F9E685485fD4bEf57C54",
            },
          ],
        },
      ],
    },
  };

  return (
    <div className="wrap">
      <div className="header">
        <h1>SURF-SWAP 🏄</h1>
      </div>
      <div className="container">
        <Widget config={runtimeConfig} />
      </div>
    </div>
  );
};

export default App;
