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
import clsx from "clsx";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: 460,
      display: "flex",
      flexDirection: "column",
      padding: constants.generalUnit * 6,
      border: `1px solid ${palette.additional["gray"][7]}`,
      borderRadius: 4,
      color: palette.additional["gray"][8],
    },
    walletArea: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    connectButton: {
      margin: `${constants.generalUnit * 3}px 0 ${constants.generalUnit * 6}px`,
    },
    connecting: {
      textAlign: "center",
      marginBottom: constants.generalUnit * 2,
    },
    connected: {
      width: "100%",
      "& > *:first-child": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      },
    },
    changeButton: {
      cursor: "pointer",
    },
    networkName: {
      padding: `${constants.generalUnit * 2}px ${
        constants.generalUnit * 1.5
      }px`,
      border: `1px solid ${palette.additional["gray"][6]}`,
      borderRadius: 2,
      color: palette.additional["gray"][9],
      marginTop: constants.generalUnit,
      marginBottom: constants.generalUnit * 3,
    },
    formArea: {
      "&.disabled": {
        opacity: 0.4,
      },
    },
    currencySection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      margin: `${constants.generalUnit * 3}px 0`,
    },
    tokenInputArea: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-around",
      paddingRight: constants.generalUnit,
    },
    tokenInput: {
      margin: 0,
    },
    currencySelector: {},
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
            <Typography component="p" variant="h5">
              This app requires access to your wallet, <br />
              please login and authorize access to continue.
            </Typography>
          </section>
        ) : (
          <section className={classes.connected}>
            <div>
              <Typography variant="body1">Home network</Typography>
              <Typography
                className={classes.changeButton}
                variant="body1"
                onClick={() => console.log("change network")}
              >
                Change
              </Typography>
            </div>
            <Typography
              component="h2"
              variant="h2"
              className={classes.networkName}
            >
              {`Ethereum - ${evmWallet.networkName}`}
            </Typography>
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
        <Form
          className={clsx(classes.formArea, {
            ["disabled"]: walletState !== WALLET_STATE.Connected,
          })}
        >
          <section>
            <FormikSelectInput
              label="Destination Network"
              name="destinationNetwork"
              disabled={walletState !== WALLET_STATE.Connected}
              options={[
                { label: "a", value: "a" },
                { label: "b", value: "b" },
                { label: "c", value: "c" },
              ]}
            />
          </section>
          <section className={classes.currencySection}>
            <section>
              <div className={classes.tokenInputArea}>
                <FormikTextInput
                  className={classes.tokenInput}
                  disabled={walletState !== WALLET_STATE.Connected}
                  name="tokenAmount"
                  type="number"
                />
                <Button
                  disabled={walletState !== WALLET_STATE.Connected}
                  className={classes.maxButton}
                  variant="outline"
                >
                  MAX
                </Button>
              </div>
            </section>
            <section>
              {/* TODO Wire up to approved tokens */}
              <FormikSelectInput
                name="token"
                disabled={walletState !== WALLET_STATE.Connected}
                options={[
                  {
                    label: <div className={classes.token}>ETH</div>,
                    value: "a",
                  },
                ]}
              />
            </section>
          </section>
          <section>
            <AddressInput
              disabled={walletState !== WALLET_STATE.Connected}
              name="receiver"
              senderAddress={"0xasdas"}
            />
          </section>
          <section>
            <Button
              disabled={walletState !== WALLET_STATE.Connected}
              type="submit"
              fullsize
              variant="primary"
            >
              Start transfer
            </Button>
          </section>
          <section>Question mark</section>
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
