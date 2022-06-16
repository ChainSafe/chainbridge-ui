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
          </section>
        </>
      )}
    </Dialog>
  );
};

export default NetworkSelectModal;
