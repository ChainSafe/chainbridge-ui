import React, { useState } from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import AboutDrawer from "../../Modules/AboutDrawer";
import ChangeNetworkDrawer from "../../Modules/ChangeNetworkDrawer";
import NetworkUnsupportedModal from "../../Modules/NetworkUnsupportedModal";
import {
  Button,
  Typography,
  QuestionCircleSvg,
} from "@chainsafe/common-components";
import { Form, Formik } from "formik";
import clsx from "clsx";
import { useWeb3 } from "@chainsafe/web3-context";
import { useChainbridge } from "../../Contexts/ChainbridgeContext";
import { object, string } from "yup";
import { chainbridgeConfig, TokenConfig } from "../../chainbridgeConfig";
import PreflightModalWrap from "../../Modules/PreflightModalWrap";
import WrapActiveModal from "../../Modules/WrapActiveModal";
import { parseUnits } from "ethers/lib/utils";
import { forwardTo } from "../../Utils/History";
import { ROUTE_LINKS } from "../Routes";
import { BigNumber, utils } from "ethers";
import SimpleTokenInput from "../Custom/SimpleTokenInput";
import TokenSelectInput from "../Custom/TokenSelectInput";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      ...(constants.pageRootStyles as any),
    },
    walletArea: {
      ...(constants.walletArea as any),
    },
    blurb: {
      color: palette.common.black.main,
      padding: "10px 0",
    },
    connectButton: {
      margin: `0px 0px 38px`,
      ...(constants.largeButtonStyle as any),
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
    homeNetworkTitle: {
      ...(constants.headerTitleStyle as any),
    },
    networkName: {
      ...(constants.networkNameStyle as any),
    },
    formArea: {
      "&.disabled": {
        opacity: 0.4,
      },
    },
    currencySection: {
      ...(constants.currencySection as any),
      justifyContent: "space-evenly",
      maxWidth: "100%",
    },
    tokenInputArea: {
      ...(constants.tokenInputArea as any),
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
      ...(constants.maxButton as any),
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
    submitButtonArea: {
      display: "flex",
      justifyContent: "center",
    },
    submitButton: {
      backgroundColor: "#E84142",
      margin: `0px 0px 38px`,
      ...(constants.largeButtonStyle as any),
    },
    currencySelector: {
      ...(constants.currencySelector as any),
    },
  })
);

type PreflightDetails = {
  tokenAmount: number;
};

const MainPage = () => {
  const classes = useStyles();
  const {
    isReady,
    checkIsReady,
    wallet,
    onboard,
    tokens,
    ethBalance,
    network,
    address,
    gasPrice,
  } = useWeb3();
  const {
    homeChain,
    wrapTokenConfig,
    wrapToken,
    unwrapToken,
    destinationChain,
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

  const handleConnect = async () => {
    setWalletConnecting(true);
    !wallet && (await onboard?.walletSelect());
    await checkIsReady();
    setWalletConnecting(false);
  };

  const handleWrapToken = async () => {
    if (!wrapTokenConfig || !wrapToken || !homeChain) return;

    try {
      setTxDetails({
        tokenInfo: wrapTokenConfig,
        value: preflightDetails.tokenAmount,
        txState: "inProgress",
        action: action,
      });
      const tx = await wrapToken({
        value: parseUnits(`${preflightDetails.tokenAmount}`, DECIMALS),
        gasPrice: BigNumber.from(
          utils.parseUnits(
            (homeChain.defaultGasPrice || gasPrice).toString(),
            9
          )
        ).toString(),
      });

      await tx?.wait();
      setTxDetails({
        tokenInfo: wrapTokenConfig,
        value: preflightDetails.tokenAmount,
        txHash: tx?.hash,
        txState: "done",
        action: action,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnwrapToken = async () => {
    if (!wrapTokenConfig || !unwrapToken || !homeChain) return;

    try {
      setTxDetails({
        tokenInfo: wrapTokenConfig,
        value: preflightDetails.tokenAmount,
        txState: "inProgress",
        action: action,
      });
      const tx = await unwrapToken(
        parseUnits(`${preflightDetails.tokenAmount}`, DECIMALS),
        {
          gasPrice: utils
            .parseUnits((homeChain.defaultGasPrice || gasPrice).toString(), 9)
            .toString(),
        }
      );

      await tx?.wait();
      setTxDetails({
        tokenInfo: wrapTokenConfig,
        value: preflightDetails.tokenAmount,
        txHash: tx?.hash,
        txState: "done",
        action: action,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const DECIMALS = 18;
  const REGEX =
    DECIMALS > 0
      ? new RegExp(`^[0-9]{1,18}(.[0-9]{1,${DECIMALS}})?$`)
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
          ? ethBalance && value && parseFloat(value) <= ethBalance
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

  const options = [
    {
      imageUri: wrapTokenConfig?.imageUri,
      symbol: "AVAX",
      label: "AVAX",
      value: "wrap",
    },
    {
      imageUri: wrapTokenConfig?.imageUri,
      symbol: wrapTokenConfig?.symbol || "wETH",
      label: wrapTokenConfig?.symbol || "wETH",
      value: "unwrap",
    },
  ];

  const tokensForSelector = {
    [options[0].value]: {
      ...options[0],
      get balance() {
        return ethBalance ? ethBalance.toFixed(2) : 0.0;
      },
    },
    [options[1].value]: {
      ...options[1],
      get balance() {
        return tokens[wrapTokenConfig?.address || "0x"].balance;
      },
    },
  };

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
              <Typography className={classes.homeNetworkTitle} variant="body1">
                Home network
              </Typography>
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
            disabled: !homeChain,
          })}
        >
          <section className={classes.currencySection}>
            <div className={clsx(classes.tokenInputArea, classes.generalInput)}>
              <SimpleTokenInput
                name="tokenAmount"
                label="Amount"
                max={tokensForSelector[action].balance as number}
              />
            </div>

            <section className={classes.currencySelector}>
              <TokenSelectInput
                tokens={tokensForSelector as any}
                name="token"
                value={options[0]}
                disabled={!destinationChain}
                label={`Balance: `}
                className={classes.generalInput}
                sync={(action) => setAction(action as any)}
                options={
                  options.map((t) => ({
                    value: t.value,
                    icon: t.imageUri,
                    alt: t.symbol,
                    label: t.symbol || "Unknown",
                  })) || []
                }
              />
            </section>
          </section>
          <section className={classes.submitButtonArea}>
            <Button
              className={classes.submitButton}
              type="submit"
              fullsize
              variant="primary"
            >
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
      <NetworkUnsupportedModal
        open={!wrapTokenConfig && isReady}
        network={network}
        supportedNetworks={chainbridgeConfig.chains
          .filter((bc) => bc.tokens.find((t) => t.isNativeWrappedToken))
          .map((bc) => bc.networkId)}
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
        sourceNetwork={homeChain?.name || ""}
        tokenSymbol={
          action === "wrap"
            ? homeChain?.nativeTokenSymbol || "ETH"
            : wrapTokenConfig?.symbol || "wETH"
        }
        value={preflightDetails?.tokenAmount || 0}
        wrappedTitle={
          action === "wrap"
            ? `${wrapTokenConfig?.name} (${wrapTokenConfig?.symbol})`
            : homeChain?.nativeTokenSymbol || "ETH"
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
    </article>
  );
};
export default MainPage;
