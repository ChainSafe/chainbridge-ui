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
  FormikCheckboxInput,
} from "@imploy/common-components";
import { Formik } from "formik/dist/Formik";
import { Form } from "formik/dist/Form";

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
              <FormikTextInput
                name="destination"
                label="Destination Address"
                placeholder="Please enter the recieving address"
              />
            </Grid>
            <Grid item xs={12}>
              <FormikCheckboxInput
                name="sendToSelf"
                label="I want to send funds to my address"
              />
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
      <AboutDrawer />
      <ChangeNetworkDrawer />
      <NetworkUnsupportedModal />
      <TransactionModal />
    </article>
  );
};

export default MainPage;
