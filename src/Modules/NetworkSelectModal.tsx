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
import styles from "../Constants/constants";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) => {
  return createStyles({
    root: {
      borderRadius: 5,
    },
    title: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 28,
      fontFamily: styles.primaryFont,
      paddingTop: constants.generalUnit * 3,
      paddingBottom: constants.generalUnit * 4,
    },
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
    ethButton: {
      fontFamily: styles.secondaryFont,
      background: "linear-gradient(105.79deg, #6300E1 1.84%, #DD00E1 92.41%)",
      fontWeight: "bold",
      borderRadius: 5,
      letterSpacing: 1,
      "&:hover": {
        color: "white",
      },
    },
    substrateButton: {
      fontFamily: styles.secondaryFont,
      background: "linear-gradient(105.79deg, #9A1AFF 38.7%, #0028FB 102.94%)",
      fontWeight: "bold",
      borderRadius: 5,
      letterSpacing: 1,
      "&:hover": {
        color: "white",
      },
    },
  });
});

const NetworkSelectModal = () => {
  const classes = useStyles();
  const { isReady, chains } = useChainbridge();
  const { walletType, setWalletType } = useNetworkManager();

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
          <div className={classes.title}>Please select a wallet type</div>
          <section className={classes.buttons}>
            {chains?.every((item) => item.type === "Ethereum") ? (
              <Button
                variant="primary"
                className={classes.ethButton}
                onClick={() => setWalletType("Ethereum")}
              >
                Use Ethereum wallet
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  className={classes.ethButton}
                  onClick={() => setWalletType("Ethereum")}
                >
                  Use Ethereum wallet
                </Button>
                <Button
                  variant="primary"
                  className={classes.substrateButton}
                  onClick={() => setWalletType("Substrate")}
                >
                  Use Substrate wallet
                </Button>
              </>
            )}
          </section>
        </>
      )}
      {walletType === "Substrate" && (
        <>
          <div className={classes.title}>Connecting to node</div>
          <ProgressBar size="small" variant="primary" />
        </>
      )}
    </Modal>
  );
};

export default NetworkSelectModal;
