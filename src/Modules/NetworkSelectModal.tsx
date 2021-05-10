import React, { useCallback } from "react";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import {
  useNetworkManager,
  WalletType,
} from "../Contexts/NetworkManagerContext";
import { Button, Modal } from "@chainsafe/common-components";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) => {
  return createStyles({
    root: {},
  });
});

const NetworkSelectModal = () => {
  const classes = useStyles();
  const { isReady, connect } = useChainbridge();
  const { walletType, setWalletType } = useNetworkManager();

  const handleConnect = useCallback(
    async (target: WalletType) => {
      setWalletType(target);
      await connect();
    },
    [connect, setWalletType]
  );

  return (
    <Modal
      active={walletType !== "unset" && !isReady}
      closePosition="right"
      className={classes.root}
    >
      <article>
        <Button onClick={() => handleConnect("Ethereum")}>
          Connect to Ethereum
        </Button>
        <Button>Connect to Substrate</Button>
      </article>
      {/* {
        walletType === "select" && (
          <article>
            <Button onClick={() => handleConnect("Ethereum")}>
              Connect to Ethereum
            </Button>
            <Button>
              Connect to Substrate
            </Button>
          </article>
        )
      }
      {
        walletType === "Ethereum" && (
          <article>

          </article>
        )
      }
      {
        walletType === "Substrate" && (
          <article>

          </article>
        )
      } */}
    </Modal>
  );
};

export default NetworkSelectModal;
