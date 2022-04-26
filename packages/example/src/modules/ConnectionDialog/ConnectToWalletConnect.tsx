import React, { useEffect } from "react";
import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import { Typography, Button } from "@mui/material";
import { WalletconnectIcon } from "@fusion-icons/react/web3";

function convertToWc() {
  const result = window.__RUNTIME_CONFIG__.CHAINBRIDGE.chains.map((chain) => [
    chain.networkId!,
    chain.rpcUrl,
  ]);
  return Object.fromEntries(result);
}
convertToWc();

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: convertToWc(),
    })
);

const {
  useChainId,
  useAccounts,
  useError,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
  useAccount,
} = hooks;

const ConnectToWallet = ({
  dispatcher,
  handleClose,
  isLoading,
  setIsLoading,
}: {
  dispatcher: any;
  handleClose: any;
  isLoading: boolean;
  setIsLoading: any;
}) => {
  const chainId = useChainId();
  const accounts = useAccounts();
  const account = useAccount();
  const error = useError();
  const isActivating = useIsActivating();
  const provider = useProvider();

  const isActive = useIsActive();

  useEffect(() => {
    setIsLoading(isActivating);
  }, [isActivating]);

  useEffect(() => {
    if (isActive) {
      dispatcher({
        type: "setAll",
        payload: {
          provider,
          accounts,
          isActive,
          chainId,
          address: account,
          walletType: "Ethereum"
        },
      });
      handleClose();
    }
  }, [isActive]);

  return (
    <Button
      size="large"
      endIcon={
        <WalletconnectIcon
          width="32"
          height="32"
          strokeWidth="2"
          stroke="#1976d2"
        />
      }
      fullWidth
      variant="outlined"
      sx={{ justifyContent: "space-between" }}
      onClick={() => {
        walletConnect.activate();
      }}
      disabled={isLoading}
    >
      WalletConnect
    </Button>
  );
};

export default ConnectToWallet;
