import React from "react";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import { useChainbridge } from "../Contexts/ChainbridgeContext";
import { useNetworkManager } from "../Contexts/NetworkManagerContext";
import {
  Button,
  Modal,
  ProgressBar,
  Typography,
} from "@chainsafe/common-components";

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
      active={walletType !== "unset" && walletType != "Ethereum" && !isReady}
      closePosition="right"
      className={classes.root}
    >
      {walletType === "select" && (
        <article>
          <Button onClick={() => setWalletType("Ethereum")}>
            Use Ethereum wallet
          </Button>
          <Button onClick={() => setWalletType("Substrate")}>
            Use Substrate wallet
          </Button>
        </article>
      )}
      {walletType === "Substrate" && (
        <article>
          <Typography variant="h2" component="h2">
            Connecting to node
          </Typography>
          <ProgressBar size="small" variant="primary" />
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
