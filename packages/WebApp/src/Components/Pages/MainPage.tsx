import React, { useState } from "react";

import { makeStyles, ITheme, createStyles } from "@imploy/common-themes";
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

const useStyles = makeStyles(
  ({ palette, constants, typography, breakpoints }: ITheme) =>
    createStyles({
      root: {},
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

  const evmWallet = useWallet();

  return (
    <article className={classes.root}>
      {walletState == WALLET_STATE.Disconnected ? (
        <Button
          className={classes.connectButton}
          onClick={() => evmWallet.connect("injected")}
        >
          Connect Metamask
        </Button>
      ) : walletState === WALLET_STATE.Connecting ? (
        <section className={classes.connecting}>
          <Typography component="p" variant="body2">
            This app requires access to your wallet, please login and authorize
            access to continue.
          </Typography>
        </section>
      ) : (
        <section className={classes.connected}>
          <Typography variant="body2">Home network</Typography>
        </section>
      )}
      <Formik
        initialValues={{}}
        onSubmit={(values: any) => {
          console.log("Transfer");
        }}
      >
        <Form className={classes.formArea}>
          <Grid container flexDirection="column" fullWidth>
            <Grid item xs={12}>
              <FormikSelectInput
                label="Destination Network"
                name="select"
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
