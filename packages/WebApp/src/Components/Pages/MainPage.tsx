import React, { useEffect, useState } from "react";

import { makeStyles, createStyles, ITheme } from "@imploy/common-themes";
import AboutDrawer from "../../Modules/AboutDrawer";
import ChangeNetworkDrawer from "../../Modules/ChangeNetworkDrawer";
import NetworkUnsupportedModal from "../../Modules/NetworkUnsupportedModal";
import TransactionModal from "../../Modules/TransactionModal";
import {
  Button,
  Typography,
  FormikSelectInput,
  Grid,
  FormikTextInput,
} from "@imploy/common-components";
import { Form, Formik } from "formik";
import AddressInput from "../Custom/AddressInput";
import { useWallet } from "use-wallet";

const useStyles = makeStyles(({ breakpoints }: ITheme) =>
  createStyles({
    root: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: breakpoints.values["sm"],
      display: "flex",
      flexDirection: "column",
    },
    walletArea: {
      minHeight: 200,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    connectButton: {},
    connecting: {},
    connected: {},
    formArea: {},
    maxButton: {},
    token: {},
  })
);

enum WALLET_STATE {
  Disconnected = "disconnected",
  Connecting = "connecting",
  Connected = "connected",
}

const MainPage = () => {
  const classes = useStyles();

  const [walletState, setWalletState] = useState<WALLET_STATE>(
    WALLET_STATE.Disconnected
  );

  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [changeNetworkOpen, setChangeNetworkOpen] = useState<boolean>(false);
  const [networkUnsupportedOpen, setnetworkUnsupportedOpen] = useState<boolean>(
    false
  );
  const [transactionModalOpen, setTransactionModalOpen] = useState<boolean>(
    false
  );

  const [sendingAddress, setSendingAddress] = useState("");
  const evmWallet = useWallet();

  useEffect(() => {
    if (evmWallet.account && walletState !== WALLET_STATE.Connected) {
      setWalletState(WALLET_STATE.Connected);
    }
  }, [evmWallet]);

  return (
    <article className={classes.root}>
      <div className={classes.walletArea}>
        {walletState === WALLET_STATE.Disconnected ? (
          <Button
            className={classes.connectButton}
            fullsize
            onClick={() => {
              evmWallet.connect("injected");
              setWalletState(WALLET_STATE.Connecting);
            }}
          >
            Connect Metamask
          </Button>
        ) : walletState === WALLET_STATE.Connecting ? (
          <section className={classes.connecting}>
            <Typography component="p" variant="body2">
              This app requires access to your wallet, please login and
              authorize access to continue.
            </Typography>
          </section>
        ) : (
          <section className={classes.connected}>
            <Typography variant="body2">Home network</Typography>
          </section>
        )}
      </div>
      <Formik
        initialValues={{
          tokenAmount: 0,
          token: {},
          receiver: "",
          destinationNetwork: "",
        }}
        onSubmit={(values: any) => {
          console.log("Transfer");
        }}
      >
        <Form className={classes.formArea}>
          <Grid container flexDirection="column" fullWidth>
            <Grid item xs={12}>
              <FormikSelectInput
                label="Destination Network"
                name="destinationNetwork"
                options={[
                  { label: "a", value: "a" },
                  { label: "b", value: "b" },
                  { label: "c", value: "c" },
                ]}
              />
            </Grid>
            <Grid item sm={10} xs={12}>
              <FormikTextInput name="tokenAmount" type="number" />
              <Button className={classes.maxButton} variant="primary">
                MAX
              </Button>
            </Grid>
            <Grid item sm={2} xs={12}>
              {/* TODO Wire up to approved tokens */}
              <FormikSelectInput
                name="token"
                options={[
                  {
                    label: <div className={classes.token}>ETH</div>,
                    value: "a",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <AddressInput name="receiver" senderAddress={"0xasdas"} />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullsize variant="primary">
                Start transfer
              </Button>
            </Grid>
            <Grid item xs={12}>
              Question mark
            </Grid>
          </Grid>
        </Form>
      </Formik>
      <AboutDrawer open={aboutOpen} close={() => setAboutOpen(false)} />
      <ChangeNetworkDrawer
        open={changeNetworkOpen}
        close={() => setChangeNetworkOpen(false)}
      />
      <NetworkUnsupportedModal open={networkUnsupportedOpen} />
      <TransactionModal open={transactionModalOpen} />
    </article>
  );
};

export default MainPage;
