import React from "react";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import { useNetworkManager } from "../Contexts/NetworkManagerContext";
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

  return (
    <Modal
      active={walletType !== "unset" && !isReady}
      closePosition="right"
      className={classes.root}
    >
      {walletType === "select" && (
        <article>
          <Button onClick={() => setWalletType("Ethereum")}>
            Use Ethereum wallet
          </Button>
          <Button>Use Substrate wallet</Button>
        </article>
      )}
      {walletType === "Ethereum" && (
        <article>
          <Button onClick={() => connect()}>Connect</Button>
        </article>
      )}
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
