import React from "react";
import {
  useNetworkManager,
  useChainbridge,
  useWeb3,
} from "@chainsafe/chainbridge-ui-core";
import { useStyles } from "./styles";
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  LinearProgress,
} from "@mui/material";

const NetworkSelectModal = () => {
  const classes = useStyles();
  const { isReady, chains } = useChainbridge();
  const { walletType, setWalletType } = useWeb3();
  const { savedWallet } = useWeb3();

  const color = {
    color: "white",
    backgroundColor: "black",
    "&:hover": { backgroundColor: "black" },
  };

  return (
    <Dialog
      open={walletType !== "unset" && walletType !== "Ethereum" && !isReady}
      fullWidth
      maxWidth="sm"
    >
      {walletType === "select" && (
        <>
          <DialogTitle
            sx={{
              display: "flex",
              justifySelf: "center",
              alignSelf: "center",
            }}
          >
            {
              savedWallet === "" ? "Please select a wallet type" : ""
            }
          </DialogTitle>
          <section className={classes.buttons}>
            {chains?.every((item) => item.type === "Ethereum") ? (
              <Button
                sx={{ color }}
                variant="contained"
                onClick={() => {
                  // console.log("SELECTING WALLET TYPE ETHEREUM");
                  setWalletType("Ethereum");
                }}
              >
                {savedWallet !== ""
                  ? `Connect to ${savedWallet}`
                  : "Use Ethereum wallet"}
              </Button>
            ) : (
              <>
                <Button
                  sx={{ color }}
                  onClick={() => setWalletType("Ethereum")}
                  variant="contained"
                >
                  Use Ethereum wallet
                </Button>
                <Button
                  sx={{ color }}
                  onClick={() => setWalletType("Substrate")}
                  variant="contained"
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
          <Typography variant="h2" component="p">
            Connecting to node
          </Typography>
          <LinearProgress variant="determinate" />
        </>
      )}
    </Dialog>
  );
};

export default NetworkSelectModal;
