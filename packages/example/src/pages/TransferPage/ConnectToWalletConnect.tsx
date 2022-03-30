import React, { useEffect } from "react";
import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import { Typography, Button } from "@mui/material";

export const [walletConnect, hooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect(actions, {
      rpc: {
        4: [
          "https://eth-rinkeby.alchemyapi.io/v2/Pgb6UvWBwyYNRyn1_19HqhSpbRtK-74W",
        ],
        5: [
          "https://eth-goerli.alchemyapi.io/v2/9jcoyKYv-uf2VMIALqA_ul6qBT5sXMJh",
        ],
      },
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
}: {
  dispatcher: any;
  handleClose: any;
}) => {
  const chainId = useChainId();
  const accounts = useAccounts();
  const account = useAccount();
  const error = useError();
  const isActivating = useIsActivating();
  const provider = useProvider();

  const isActive = useIsActive();

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
        },
      });
      handleClose();
    }
  }, [isActive]);

  return (
    <Button
      fullWidth
      variant="outlined"
      sx={{ textAlign: 'left'}}
      onClick={() => {
        walletConnect.activate();
      }}
    >
      walletConnect
    </Button>
  );
};

export default ConnectToWallet;
