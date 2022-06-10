import React from "react";
import { useNetworkManager, useChainbridge, useWeb3 } from "@chainsafe/chainbridge-ui-core";
import {
  Button,
  Modal,
  ProgressBar,
  Typography,
} from "@chainsafe/common-components";
import { useStyles } from "./styles";

const NetworkSelectModal = () => {
  const classes = useStyles();
  const { isReady, chains } = useChainbridge();
  const { walletType, setWalletType } = useWeb3();

  return (
    <Modal
      active={walletType !== "unset" && walletType !== "Ethereum" && !isReady}
      closePosition="right"
      className={classes.root}
      injectedClass={{
        inner: classes.slide,
      }}
    >
      {walletType === "select" && (
        <>
          <Typography variant="h3" component="p">
            Please select a wallet type
          </Typography>
          <section className={classes.buttons}>
            {chains?.every((item) => item.type === "Ethereum") ? (
              <Button onClick={() => setWalletType("Ethereum")}>
                Use Ethereum wallet
              </Button>
            ) : (
              <>
                <Button onClick={() => setWalletType("Ethereum")}>
                  Use Ethereum wallet
                </Button>
              </>
            )}
          </section>
        </>
      )}
    </Modal>
  );
};

export default NetworkSelectModal;
