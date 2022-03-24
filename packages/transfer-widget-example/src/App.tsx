import React, { useEffect, useState } from "react";
import Widget from "chainbridge-ui-transfer-widget-unstable";


import "./App.css";

import "./widget.css"

const App: React.FC<{}> = () => {
  const [isConnected, setIsConnected] = useState(window.ethereum.isConnected())
  const [provider, setProvider] = useState()
  const runtimeConfig = {
      INDEXER_URL: 'http://localhost:8000',
      UI: {
        transactionAutoUpdateInterval: 5000
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
            rpcUrl: "https://eth-rinkeby.alchemyapi.io/v2/Pgb6UvWBwyYNRyn1_19HqhSpbRtK-74W",
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
            rpcUrl: "https://eth-goerli.alchemyapi.io/v2/9jcoyKYv-uf2VMIALqA_ul6qBT5sXMJh",
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
          {
            domainId: 3,
            networkId: 80001,
            name: "Mumbai",
            decimals: 18,
            bridgeAddress: "0xd1BB2D0f09E35d47d06e62c9c25421BB2Be77DAE",
            erc20HandlerAddress: "0x97E3650BB89025cB1cDda3aB8A77BD702f0aBFb6",
            rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/NVK896meM89QkTJi7AmkHc8MaRa0z1PL",
            type: "Ethereum",
            nativeTokenSymbol: "ETH",
            tokens: [
              {
                address: "0x800c15a950eC2D1db82a78B7eC9576dC17CcD679",
                name: "csUSD",
                symbol: "csUSD",
                imageUri: "ETHIcon",
                resourceId:
                  "0x0000000000000000000000008EC076FaE5BAe1496BD5F9E685485fD4bEf57C54",
              },
            ],
          },
        ],
      }
    };


  return (
    <div className="wrap">
      <div className="header">
        <div></div>
        <h1>SURF-SWAP 🏄</h1>
        <button onClick={() => {
          setProvider(window.ethereum)
          setIsConnected(true)
        }} className={`${isConnected ? 'connected' : null} topbar-connect-button`} >{isConnected ? "Connected" : "Connect"}</button>
      </div>
      <div className="container">
        <Widget config={runtimeConfig} externalProviderSource={provider} useExternalProvider={true} />
      </div>
    </div>
  );
};

export default App;
