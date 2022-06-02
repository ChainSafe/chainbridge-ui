import React, { createContext, useContext } from "react";
import { useWeb3 } from "../localWeb3Context";
import { BridgeData, Chainbridge} from '@chainsafe/chainbridge-sdk-core'

interface IBridgeContext {
  children: React.ReactNode | React.ReactNode[];
}

const BridgeContext = createContext(undefined);

const BridgeProvider = ({ children }: IBridgeContext) => {
  const { homeChains } = useWeb3()
  console.log("homechains", homeChains)

  const bridgeSetup: BridgeData = homeChains.reduce((acc, chain, idx) => {
    const { bridgeAddress, erc20HandlerAddress, tokens, rpcUrl, domainId, decimals } = chain

    // NOTE: ASUMPTION HERE IS THAT WE HAVE ONLY ONE TOKEN
    const [{ address, resourceId }] = tokens

    acc = {
      ...acc,
      [`chain${idx + 1}`]: {
        bridgeAddress,
        erc20Address: address,
        erc20HandlerAddress,
        rpcURL: rpcUrl,
        domainId,
        erc20ResourceID: resourceId,
        decimals
      }
    }

    return acc
  }, {} as BridgeData)

  console.log("peo", bridgeSetup);
  return (
    <BridgeContext.Provider value={undefined}>
      {children}
    </BridgeContext.Provider>
  );
};

const useBridge = () => {
  const context = useContext(BridgeContext)
  if(context === undefined){
    throw new Error(
      "useBridge must be called within a BridgeProvider"
    );
  }

  return context
}

export { BridgeProvider, useBridge };
