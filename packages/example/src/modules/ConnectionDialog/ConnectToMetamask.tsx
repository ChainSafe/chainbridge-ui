import React, { useEffect } from "react";
import { initializeConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Typography, Button } from "@mui/material";
import { MetamaskIcon } from "@fusion-icons/react/web3";

export const [metaMask, hooks] = initializeConnector<MetaMask>(
  (actions) => new MetaMask(actions)
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

const ConnectToMetamask = ({
  dispatcher,
  handleClose,
  setIsLoading,
  isLoading,
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
        <MetamaskIcon width="32" height="32" strokeWidth="2" stroke="#1976d2" />
      }
      fullWidth
      variant="outlined"
      sx={{ justifyContent: "space-between" }}
      onClick={() => {
        metaMask.activate();
      }}
    >
      {" "}
      metamask
    </Button>
  );
};

export default ConnectToMetamask;
