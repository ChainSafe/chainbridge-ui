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
  FormikTextInput,
  QuestionCircleSvg,
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
      overflow: "hidden",
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
      "& > *:last-child": {
        height: 32,
        "& input": {
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          borderRight: 0,
        },
      },
    },
    maxButton: {
      height: 32,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      left: -1,
      color: palette.additional["gray"][8],
      backgroundColor: palette.additional["gray"][3],
      borderColor: palette.additional["gray"][6],
      "&:hover": {
        borderColor: palette.additional["gray"][6],
        backgroundColor: palette.additional["gray"][7],
        color: palette.common.white.main,
      },
    },
    currencySelector: {
      width: 120,
    },
    token: {},
    address: {
      margin: 0,
      marginBottom: constants.generalUnit * 3,
    },
    addressInput: {},
    generalInput: {
      "& > span": {
        marginBottom: constants.generalUnit,
      },
    },
    faqButton: {
      cursor: "pointer",
      height: 20,
      width: 20,
      marginTop: constants.generalUnit * 5,
    },
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
      setSendingAddress(evmWallet.account);
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
                onClick={() => setChangeNetworkOpen(true)}
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
              className={classes.generalInput}
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
              <div
                className={clsx(classes.tokenInputArea, classes.generalInput)}
              >
                <FormikTextInput
                  className={clsx(classes.tokenInput, classes.generalInput)}
                  disabled={walletState !== WALLET_STATE.Connected}
                  name="tokenAmount"
                  label="I want to send"
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
            <section className={classes.currencySelector}>
              {/* TODO Wire up to approved tokens */}
              <FormikSelectInput
                name="token"
                disabled={walletState !== WALLET_STATE.Connected}
                value={"ETH"}
                label={`Balance: 0.00 ETH`}
                className={classes.generalInput}
                options={[
                  {
                    label: <div className={classes.token}>ETH</div>,
                    value: "ETH",
                  },
                ]}
              />
            </section>
          </section>
          <section>
            <AddressInput
              disabled={walletState !== WALLET_STATE.Connected}
              name="receiver"
              label="Destination Address"
              placeholder="Please enter the receiving address"
              className={classes.address}
              classNames={{
                input: classes.addressInput,
              }}
              senderAddress={`${sendingAddress}`}
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
          <section>
            <QuestionCircleSvg
              onClick={() => setAboutOpen(true)}
              className={classes.faqButton}
            />
          </section>
        </Form>
      </Formik>
      <AboutDrawer open={aboutOpen} close={() => setAboutOpen(false)} />
      <ChangeNetworkDrawer
        open={changeNetworkOpen}
        close={() => setChangeNetworkOpen(false)}
      />
      <NetworkUnsupportedModal
        open={!networkUnsupportedOpen}
        close={() => setnetworkUnsupportedOpen(false)}
        network={`Ropsten`}
      />
      <TransactionModal
        open={transactionModalOpen}
        close={() => setTransactionModalOpen(false)}
        receiver={"0xDC6fFC3f404D9dA507735c294f023373079D2B8b"}
        sender={`0xDC6fFC3f404D9dA507735c294f023373079D2B8b`}
        // sender={`${evmWallet.account}`}
        start={() => {
          console.log("start");
          setTransactionModalOpen(false);
        }}
        sourceNetwork={"Ethereum"}
        targetNetwork={"Celo"}
        token="ETH"
        value={0.02}
      />
    </article>
  );
};
export default MainPage;
