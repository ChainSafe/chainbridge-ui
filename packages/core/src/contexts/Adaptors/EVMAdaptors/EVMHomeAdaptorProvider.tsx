import React, { useCallback, useEffect, useReducer } from "react";
import { IHomeBridgeProviderProps } from "../interfaces";
import { HomeBridgeContext } from "../../HomeBridgeContext";
import { getNetworkName } from "../../../utils/Helpers";
import { useWeb3 as useLocalWeb3 } from "../../index";
import { evmHomeReducer } from "../../../reducers/EvmHomeReducer";

import makeDeposit from "./makeDeposit";
import makeWrappedToken from "./makeWrappedToken";
import makeUnwrappedToken from "./makeUnwrappedToken";
import makeHandleCheckSupplies from "./makeHandleCheckSupplies";
import { useSetBridgeSettingsHook } from "./useSetBridgeSettingsHook";
import { useConnectWallet } from "./useConnectWallet";

export const EVMHomeAdaptorProvider = ({
  children,
}: IHomeBridgeProviderProps) => {
  const {
    isReady,
    network,
    provider,
    gasPrice,
    address,
    tokens,
    wallet,
    ethBalance,
    onboard,
    resetOnboard,
    dispatcher,
    savedWallet,
    homeChainConfig,
    setTransactionStatus,
    setDepositNonce,
    handleSetHomeChain,
    homeChains,
  } = useLocalWeb3();

  const { homeBridge, wrapper, wrapTokenConfig } = useConnectWallet(
    isReady,
    homeChainConfig,
    provider,
    network,
  );

  const [evmHomeState, dispatch] = useReducer(evmHomeReducer, {
    depositAmount: undefined,
    selectedToken: "",
    networkId: 0,
    homeTransferTxHash: "",
  });
  const { depositAmount, networkId, selectedToken, homeTransferTxHash } =
    evmHomeState;

  const setDepositAmount = (depositAmount?: number) =>
    dispatch({ type: "setDepositAmount", depositAmount });
  const setSelectedToken = (selectedToken: string) =>
    dispatch({ type: "setSelectedToken", selectedToken });
  const setNetworkId = (networkId: number) =>
    dispatch({ type: "setNetworkId", networkId });
  const setHomeTransferTxHash = (homeTransferTxHash: string) =>
    dispatch({ type: "setHomeTransferTxHash", homeTransferTxHash });

  useEffect(() => {
    if (network) {
      const chain = homeChains.find((chain) => chain.networkId === network);
      setNetworkId(network);
      if (chain) {
        handleSetHomeChain(chain.domainId);
      }
    }
  }, [handleSetHomeChain, homeChains, network]);

  const [bridgeFee, relayerThreshold] = useSetBridgeSettingsHook(homeBridge);

  const handleConnect = useCallback(async () => {
    if (wallet && wallet.connect && network) {
      await onboard?.walletSelect(savedWallet);
      await wallet.connect();
    }
  }, [wallet, network, onboard]);

  const handleCheckSupplies = makeHandleCheckSupplies(homeChainConfig);

  const deposit = makeDeposit(
    setTransactionStatus,
    setDepositNonce,
    setHomeTransferTxHash,
    setDepositAmount,
    setSelectedToken,
    gasPrice,
    homeChainConfig,
    homeBridge,
    provider,
    address,
    bridgeFee
  );

  const wrapToken = makeWrappedToken(
    gasPrice,
    homeChainConfig,
    wrapTokenConfig,
    wrapper,
    provider
  );

  const unwrapToken = makeUnwrappedToken(
    gasPrice,
    homeChainConfig,
    wrapTokenConfig,
    wrapper,
    provider
  );

  return (
    <HomeBridgeContext.Provider
      value={{
        connect: handleConnect,
        disconnect: async () => {
          await resetOnboard(dispatcher, onboard!);
        },
        getNetworkName,
        networkId,
        homeTransferTxHash,
        bridgeFee,
        deposit,
        depositAmount,
        selectedToken,
        setDepositAmount,
        setSelectedToken,
        tokens,
        relayerThreshold,
        wrapTokenConfig,
        wrapper,
        wrapToken,
        unwrapToken,
        isReady,
        chainConfig: homeChainConfig,
        address,
        nativeTokenBalance: ethBalance,
        handleCheckSupplies,
      }}
    >
      {children}
    </HomeBridgeContext.Provider>
  );
};
