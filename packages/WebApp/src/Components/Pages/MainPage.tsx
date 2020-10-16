import React, { useState } from "react";

import { makeStyles, ITheme, createStyles } from "@imploy/common-themes";
import AboutDrawer from "../../Modules/AboutDrawer";
import ChangeNetworkDrawer from "../../Modules/ChangeNetworkDrawer";
import NetworkUnsupportedModal from "../../Modules/NetworkUnsupportedModal";
import TransactionModal from "../../Modules/TransactionModal";
import { Button, Typography } from "@imploy/common-components";
import { Formik } from "formik/dist/Formik";
import { Form } from "formik/dist/Form";

const useStyles = makeStyles(
  ({ palette, constants, typography, breakpoints }: ITheme) =>
    createStyles({
      root: {},
      connectButton: {},
      connecting: {},
      connected: {},
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

  return (
    <article className={classes.root}>
      {walletState == WALLET_STATE.Disconnected ? (
        <Button className={classes.connectButton}>Connect Wallet</Button>
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
        <Form>
          <FormikSelectInput
            name="select"
            options={[
              { label: "a", value: "a" },
              { label: "b", value: "b" },
              { label: "c", value: "c" },
            ]}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Formik>
      <AboutDrawer />
      <ChangeNetworkDrawer />
      <NetworkUnsupportedModal />
      <TransactionModal />
    </article>
  );
};

export default MainPage;
