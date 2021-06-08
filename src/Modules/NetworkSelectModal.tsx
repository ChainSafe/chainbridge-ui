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
    slide: {
      borderRadius: constants.generalUnit / 2,
      padding: `${constants.generalUnit}px ${constants.generalUnit * 2}px`,
      "& > p": {
        marginTop: constants.generalUnit * 2,
        marginBottom: constants.generalUnit * 3,
        textAlign: "center",
      },
    },
    buttons: {
      marginBottom: constants.generalUnit * 2,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
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
            <Button onClick={() => setWalletType("Ethereum")}>
              Use Ethereum wallet
            </Button>
            <Button onClick={() => setWalletType("Substrate")}>
              Use Substrate wallet
            </Button>
          </section>
        </>
      )}
      {walletType === "Substrate" && (
        <>
          <Typography variant="h2" component="p">
            Connecting to node
          </Typography>
          <ProgressBar size="small" variant="primary" />
        </>
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
