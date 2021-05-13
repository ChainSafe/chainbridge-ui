import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import AboutDrawer from "../../Modules/AboutDrawer";
import ChangeNetworkDrawer from "../../Modules/ChangeNetworkDrawer";
import {
  Button,
  Typography,
  QuestionCircleSvg,
  SelectInput,
} from "@chainsafe/common-components";
import { Form, Formik } from "formik";
import clsx from "clsx";
import { useChainbridge } from "../../Contexts/ChainbridgeContext";
import { object, string } from "yup";
import { ReactComponent as ETHIcon } from "../../media/tokens/eth.svg";
import { TokenConfig } from "../../chainbridgeConfig";
import PreflightModalWrap from "../../Modules/PreflightModalWrap";
import WrapActiveModal from "../../Modules/WrapActiveModal";
import { forwardTo } from "../../Utils/History";
import { ROUTE_LINKS } from "../Routes";
import SimpleTokenInput from "../Custom/SimpleTokenInput";
import { useNetworkManager } from "../../Contexts/NetworkManagerContext";
import NetworkUnsupportedModal from "../../Modules/NetworkUnsupportedModal";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      minHeight: constants.generalUnit * 69,
      padding: constants.generalUnit * 6,
      overflow: "hidden",
      position: "relative",
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
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      height: constants.generalUnit * 4,
      "& img, & svg": {
        display: "block",
        height: 14,
        width: 14,
        marginLeft: 10,
      },
      "& span": {
        minWidth: `calc(100% - 30px)`,
        textAlign: "right",
        color: palette.additional["gray"][9],
      },
    },
    tokenItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      "& img, & svg": {
        display: "block",
        height: 14,
        width: 14,
        marginRight: 10,
      },
      "& span": {
        minWidth: `calc(100% - 30px)`,
        textAlign: "right",
      },
    },
    submitButtonArea: {},
  })
);

type PreflightDetails = {
  tokenAmount: number;
};

const MainPage = () => {
  const classes = useStyles();
  const { walletType, setWalletType, homeChainConfig } = useNetworkManager();
  const {
    wrapTokenConfig,
    wrapToken,
    unwrapToken,
    homeConfig,
    isReady,
    tokens,
    nativeTokenBalance,
    address,
  } = useChainbridge();

  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [changeNetworkOpen, setChangeNetworkOpen] = useState<boolean>(false);
  const [preflightModalOpen, setPreflightModalOpen] = useState<boolean>(false);
  const [preflightDetails, setPreflightDetails] = useState<PreflightDetails>({
    tokenAmount: 0,
  });
  const [action, setAction] = useState<"wrap" | "unwrap">("wrap");

  const [txDetails, setTxDetails] = useState<
    | {
        txState?: "inProgress" | "done";
        value: number;
        tokenInfo: TokenConfig;
        txHash?: string;
        action: "wrap" | "unwrap";
      }
    | undefined
  >(undefined);

  useEffect(() => {
    if (walletType !== "select" && walletConnecting === true) {
      setWalletConnecting(false);
    } else if (walletType === "select") {
      setWalletConnecting(true);
    }
  }, [walletType, walletConnecting]);

  const handleWrapToken = async () => {
    if (!wrapTokenConfig || !wrapToken || !homeConfig) return;

    try {
      setTxDetails({
        tokenInfo: wrapTokenConfig,
        value: preflightDetails.tokenAmount,
        txState: "inProgress",
        action: action,
      });
      const txHash = await wrapToken(preflightDetails.tokenAmount);

      if (txHash === "") {
        setTxDetails(undefined);
        throw Error("Wrap Transaction failed");
      }

      setTxDetails({
        tokenInfo: wrapTokenConfig,
        value: preflightDetails.tokenAmount,
        txHash: txHash,
        txState: "done",
        action: action,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnwrapToken = async () => {
    if (!wrapTokenConfig || !unwrapToken || !homeConfig) return;

    try {
      setTxDetails({
        tokenInfo: wrapTokenConfig,
        value: preflightDetails.tokenAmount,
        txState: "inProgress",
        action: action,
      });

      const txHash = await unwrapToken(preflightDetails.tokenAmount);

      if (txHash === "") {
        setTxDetails(undefined);
        throw Error("Unwrap Transaction failed");
      }

      setTxDetails({
        tokenInfo: wrapTokenConfig,
        value: preflightDetails.tokenAmount,
        txHash: txHash,
        txState: "done",
        action: action,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const REGEX =
    homeChainConfig?.decimals && homeChainConfig.decimals > 0
      ? new RegExp(`^[0-9]{1,18}(.[0-9]{1,${homeChainConfig.decimals}})?$`)
      : new RegExp(`^[0-9]{1,18}?$`);

  const wrapSchema = object().shape({
    tokenAmount: string()
      .matches(REGEX, "Input invalid")
      .test("Min", "Less than minimum", (value) => {
        if (value) {
          return parseFloat(value) > 0;
        }
        return false;
      })
      .test("Max", "Insufficent funds", (value) => {
        return action === "wrap"
          ? nativeTokenBalance &&
            value &&
            parseFloat(value) <= nativeTokenBalance
            ? true
            : false
          : tokens[wrapTokenConfig?.address || "0x"].balance &&
            value &&
            parseFloat(value) <=
              tokens[wrapTokenConfig?.address || "0x"]?.balance
          ? true
          : false;
      })
      .required("Please set a value"),
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
                setWalletType("select");
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
              {homeConfig?.name}
            </Typography>
          </section>
        )}
      </div>
      <Formik
        initialValues={{
          tokenAmount: 0,
        }}
        validationSchema={wrapSchema}
        validateOnChange={false}
        onSubmit={(values) => {
          setPreflightDetails({
            ...values,
          });
          setPreflightModalOpen(true);
        }}
      >
        <Form
          className={clsx(classes.formArea, {
            disabled: !homeConfig,
          })}
        >
          <section className={classes.currencySection}>
            <section>
              <div
                className={clsx(classes.tokenInputArea, classes.generalInput)}
              >
                <SimpleTokenInput
                  classNames={{
                    input: clsx(classes.tokenInput, classes.generalInput),
                    button: classes.maxButton,
                  }}
                  name="tokenAmount"
                  label="I want to convert"
                  max={
                    action === "wrap"
                      ? nativeTokenBalance
                      : tokens[wrapTokenConfig?.address || "0x"]?.balance
                  }
                />
              </div>
            </section>
            <section className={classes.tokenIndicator}>
              <Typography component="p">
                Balance:{" "}
                {action === "wrap"
                  ? nativeTokenBalance
                    ? nativeTokenBalance.toFixed(2)
                    : 0.0
                  : tokens[wrapTokenConfig?.address || "0x"].balance}
              </Typography>
              <SelectInput
                options={[
                  {
                    label: (
                      <div className={classes.tokenItem}>
                        <ETHIcon />
                        <span>ETH</span>
                      </div>
                    ),
                    value: "wrap",
                  },
                  {
                    label: (
                      <div className={classes.tokenItem}>
                        <img
                          src={wrapTokenConfig?.imageUri}
                          alt={wrapTokenConfig?.symbol}
                        />
                        <span>{wrapTokenConfig?.symbol || "wETH"}</span>
                      </div>
                    ),
                    value: "unwrap",
                  },
                ]}
                onChange={(val) => setAction(val)}
                value={action}
              />
            </section>
          </section>
          <section className={classes.submitButtonArea}>
            <Button type="submit" fullsize variant="primary">
              {action === "wrap" ? "Wrap Token" : "Unwrap token"}
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
      <PreflightModalWrap
        open={preflightModalOpen}
        close={() => setPreflightModalOpen(false)}
        sender={address || ""}
        start={() => {
          if (action === "wrap") {
            handleWrapToken();
            setPreflightModalOpen(false);
          } else {
            handleUnwrapToken();
            setPreflightModalOpen(false);
          }
        }}
        sourceNetwork={homeConfig?.name || ""}
        tokenSymbol={
          action === "wrap"
            ? homeConfig?.nativeTokenSymbol || "ETH"
            : wrapTokenConfig?.symbol || "wETH"
        }
        value={preflightDetails?.tokenAmount || 0}
        wrappedTitle={
          action === "wrap"
            ? `${wrapTokenConfig?.name} (${wrapTokenConfig?.symbol})`
            : homeConfig?.nativeTokenSymbol || "ETH"
        }
        action={action}
      />
      {txDetails && (
        <WrapActiveModal
          {...txDetails}
          close={() => {
            setTxDetails(undefined);
            forwardTo(ROUTE_LINKS.Transfer);
          }}
        />
      )}
      {/* This is here due to requiring router */}
      <NetworkUnsupportedModal />
    </article>
  );
};
export default MainPage;
