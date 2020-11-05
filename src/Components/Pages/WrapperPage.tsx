import React, { useState } from "react";
import { makeStyles, createStyles, ITheme } from "@imploy/common-themes";
import AboutDrawer from "../../Modules/AboutDrawer";
import ChangeNetworkDrawer from "../../Modules/ChangeNetworkDrawer";
import NetworkUnsupportedModal from "../../Modules/NetworkUnsupportedModal";
import {
  Button,
  Typography,
  QuestionCircleSvg,
} from "@imploy/common-components";
import { Form, Formik } from "formik";
import clsx from "clsx";
import { useWeb3 } from "@chainsafe/web3-context";
import { useChainbridge } from "../../Contexts/ChainbridgeContext";
import TokenInput from "../Custom/TokenInput";
import { number, object, string } from "yup";
import ETHIcon from "../../media/tokens/eth.svg";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      minHeight: constants.generalUnit * 69,
    },
    walletArea: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    blurb: {
      color: palette.common.black.main,
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
      "& > div": {
        height: 32,
        "& input": {
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          borderRight: 0,
        },
      },
      "& span:last-child.error": {
        position: "absolute",
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
      "&:focus": {
        borderColor: palette.additional["gray"][6],
      },
    },
    tokenIndicator: {
      width: 120,
      textAlign: "right",
      "& p": {
        marginBottom: constants.generalUnit,
      },
      "& *": {
        cursor: "pointer",
      },
    },
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
      fill: `${palette.additional["transferUi"][1]} !important`,
    },
    token: {
      backgroundColor: palette.additional["gray"][1],
      borderRadius: 2,
      border: `1px solid ${palette.additional["gray"][6]}`,
      padding: `${constants.generalUnit * 1}px ${
        constants.generalUnit * 1.5
      }px`,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      cursor: "pointer",
      height: constants.generalUnit * 4,
      "& img": {
        display: "block",
        height: 14,
        width: 14,
        marginLeft: 10,
      },
      "& span": {
        minWidth: `calc(100% - 14px)`,
        textAlign: "right",
        color: palette.additional["gray"][9],
      },
    },
    submitButtonArea: {},
  })
);

type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
};

const MainPage = () => {
  const classes = useStyles();
  const {
    isReady,
    checkIsReady,
    wallet,
    onboard,
    tokens,
    address,
    ethBalance,
  } = useWeb3();
  const { homeChain, destinationChain } = useChainbridge();

  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [changeNetworkOpen, setChangeNetworkOpen] = useState<boolean>(false);
  const [networkUnsupportedOpen, setNetworkUnsupportedOpen] = useState<boolean>(
    false
  );
  const [preflightModalOpen, setPreflightModalOpen] = useState<boolean>(false);

  const [preflightDetails, setPreflightDetails] = useState<PreflightDetails>({
    token: "",
    tokenAmount: 0,
    tokenSymbol: "",
  });

  const handleConnect = async () => {
    setWalletConnecting(true);
    !wallet && (await onboard?.walletSelect());
    await checkIsReady();
    setWalletConnecting(false);
  };

  const DECIMALS = 18;
  const transferSchema = object().shape({
    tokenAmount: number()
      .typeError("Not a valid number")
      .min(
        tokens[preflightDetails.token]
          ? 1 / 10 ** tokens[preflightDetails.token].decimals
          : 1,
        "Please provide a value"
      )
      .test("Decimals", `Maximum of ${DECIMALS} decimals`, (value) => {
        // console.log(value);
        if (value && `${value}`.indexOf(".") >= 0) {
          // TODO improve Decimal validation
          // console.log(`${value}`.split(".")[1])
          // console.log(`${value}`.split(".")[1].length)
          // console.log(`${value}`.split(".")[1].length <= DECIMALS )
          return `${value}`.split(".")[1].length <= DECIMALS;
        }
        return true;
      })
      .test("Max", "Insufficent funds", (value) => {
        return ethBalance && (value as number) <= ethBalance ? true : false;
      })
      .required("Please set a value"),
    token: string()
      .test("sync", "", (value) => {
        setPreflightDetails({
          ...preflightDetails,
          token: value as string,
          tokenAmount: 0,
          tokenSymbol: "",
        });
        return true;
      })
      .required("Please select a token"),
  });

  return (
    <article className={classes.root}>
      <div className={classes.walletArea}>
        {!isReady ? (
          <>
            <Typography className={classes.blurb} component="p" variant="h5">
              To convert a token that needs to be wrapped, please connect to the
              network that the token exists natively for. For example, to
              convert ETH into wrapped ETH (WETH), your wallet must be connected
              to an Ethereum network.
            </Typography>
            <Button
              className={classes.connectButton}
              fullsize
              onClick={() => {
                handleConnect();
              }}
            >
              Connect Metamask
            </Button>
          </>
        ) : walletConnecting ? (
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
              {homeChain?.name}
            </Typography>
          </section>
        )}
      </div>
      <Formik
        initialValues={{
          tokenAmount: 0,
          token: "",
        }}
        validationSchema={transferSchema}
        onSubmit={(values) => {
          setPreflightDetails({
            ...values,
            tokenSymbol: tokens[values.token].symbol || "",
          });
          setPreflightModalOpen(true);
        }}
      >
        <Form
          className={clsx(classes.formArea, {
            disabled: !homeChain,
          })}
        >
          <section className={classes.currencySection}>
            <section>
              <div
                className={clsx(classes.tokenInputArea, classes.generalInput)}
              >
                <TokenInput
                  classNames={{
                    input: clsx(classes.tokenInput, classes.generalInput),
                    button: classes.maxButton,
                  }}
                  tokenSelectorKey="token"
                  tokens={tokens}
                  disabled={!destinationChain}
                  name="tokenAmount"
                  // min={
                  //   tokens[preflightDetails.token]
                  //   ? 1 / (10 ** tokens[preflightDetails.token].decimals)
                  //   : 1
                  // }
                  max={ethBalance ? ethBalance : 1}
                  // step={
                  //   tokens[preflightDetails.token]
                  //   ? 1 / (10 ** tokens[preflightDetails.token].decimals)
                  //   : 1
                  // }
                  precision={DECIMALS}
                  // formatter={(value) => {
                  //   console.log("Format", value)
                  //   // do mod check
                  //   const split = `${value}`.split('.')
                  //   if (split[1]) {
                  //     for(let i = split[1].length; i > 0; i--){
                  //       if (split[1][i] != "0"){
                  //         const temp = `${split[0]}.${split[1].substr(0, i)}`
                  //         console.log(temp)
                  //         return  temp
                  //       }
                  //     }
                  //   }

                  //   return `${value}`
                  // }}
                  label="I want to convert"
                />
              </div>
            </section>
            <section className={classes.tokenIndicator}>
              <Typography component="p">
                Balance: {ethBalance ? ethBalance.toFixed(2) : 0.0}
              </Typography>
              <div className={classes.token}>
                <img src={ETHIcon} />
                <Typography>ETH</Typography>
              </div>
            </section>
          </section>
          <section className={classes.submitButtonArea}>
            <Button type="submit" fullsize variant="primary">
              Convert to Wrapped Token
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
        open={networkUnsupportedOpen}
        close={() => setNetworkUnsupportedOpen(false)}
        network={`Ropsten`}
      />
      {/* <PreflightModal
        open={preflightModalOpen}
        close={() => setPreflightModalOpen(false)}
        receiver={preflightDetails?.receiver || ""}
        sender={address || ""}
        start={() => {
          setPreflightModalOpen(false);
          preflightDetails &&
            deposit(
              preflightDetails.tokenAmount,
              preflightDetails.receiver,
              preflightDetails.token
            );
        }}
        sourceNetwork={homeChain?.name || ""}
        targetNetwork={destinationChain?.name || ""}
        tokenSymbol={preflightDetails?.tokenSymbol || ""}
        value={preflightDetails?.tokenAmount || 0}
      />
      <TransactionActiveModal open={!!transactionStatus} close={resetDeposit} /> */}
    </article>
  );
};
export default MainPage;