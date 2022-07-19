import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  BridgeConfig,
  chainbridgeConfig,
  ChainType,
} from "../../chainbridgeConfig";
import { useWeb3 } from "../localWeb3Context";
import { BridgeData, Chainbridge } from "@chainsafe/chainbridge-sdk-core";
import { chainbridgeReducer, ChainbridgeState } from '../../reducers'

interface IBridgeContext {
  children: React.ReactNode | React.ReactNode[];
}

type BridgeContext = ChainbridgeState

const BridgeContext = createContext<BridgeContext | undefined>(undefined);

const BridgeProvider = ({ children }: IBridgeContext) => {
  const { homeChains, ...rest } = useWeb3();
  const initState: ChainbridgeState = {
    chainbridgeInstance: undefined,
    // chainbridgeData: undefined,
    bridgeSetup: undefined
  }
  const [bridgeState, bridgeDispatcher] = useReducer(
    chainbridgeReducer,
    initState
  );

  useEffect(() => {
    if (homeChains.length) {
      const bridgeSetup: BridgeData = homeChains.reduce((acc, chain, idx) => {
        const {
          bridgeAddress,
          erc20HandlerAddress,
          tokens,
          rpcUrl,
          domainId,
          decimals,
          feeSettings,
          name,
          networkId
        } = chain;

        // NOTE: ASUMPTION HERE IS THAT WE HAVE ONLY ONE TOKEN
        const [{ address, resourceId }] = tokens;

        acc = {
          ...acc,
          [`chain${idx + 1}`]: {
            bridgeAddress,
            erc20Address: address,
            erc20HandlerAddress,
            rpcURL: rpcUrl,
            domainId,
            erc20ResourceID: resourceId,
            decimals,
            feeSettings,
            name,
            networkId
          },
        };

        return acc;
      }, {} as BridgeData);

      const { feeOracleSetup } = chainbridgeConfig()
      let isMounted = true;
      const chainbridgeInstance = new Chainbridge({ bridgeSetup, feeOracleSetup });
      chainbridgeInstance.initializeConnectionFromWeb3Provider(window.ethereum).then((res) => {
        // console.log("🚀 ~ file: Bridge.tsx ~ line 71 ~ chainbridgeInstance.initializeConnectionFromWeb3Provider ~ res", res)
        if (isMounted) {
          // console.log(this)
          bridgeDispatcher({
            type: "setInstanceAndData",
            payload: {
              bridgeSetup,
              feeOracleSetup,
              chainbridgeInstance: res
            }
          })
        }

      })
      return () => { isMounted = false }
    }
  }, [homeChains]);


  return (
    <BridgeContext.Provider value={{ ...bridgeState }}>
      {children}
    </BridgeContext.Provider>
  );
};

const useBridge = () => {
  const context = useContext(BridgeContext);
  if (context === undefined) {
    throw new Error("useBridge must be called within a BridgeProvider");
  }

  return context;
};

export { BridgeProvider, useBridge };
