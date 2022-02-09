import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import AboutDrawer from "../../Modules/AboutDrawer";
import ChangeNetworkDrawer from "../../Modules/ChangeNetworkDrawer";
import PreflightModalTransfer from "../../Modules/PreflightModalTransfer";
import {
  Button,
  Typography,
  // QuestionCircleSvg,
  SelectInput,
  NavLink,
} from "@chainsafe/common-components";
import { Form, Formik } from "formik";
import AddressInput from "../Custom/AddressInput";
import clsx from "clsx";
import TransferActiveModal from "../../Modules/TransferActiveModal";
import { useChainbridge } from "../../Contexts/ChainbridgeContext";
import TokenSelectInput from "../Custom/TokenSelectInput";
import TokenInput from "../Custom/TokenInput";
import { object, string } from "yup";
import { utils } from "ethers";
import FeesFormikWrapped from "./FormikContextElements/Fees";
import { useNetworkManager } from "../../Contexts/NetworkManagerContext";
import NetworkUnsupportedModal from "../../Modules/NetworkUnsupportedModal";
import { isValidSubstrateAddress } from "../../Utils/Helpers";
import { useHomeBridge } from "../../Contexts/HomeBridgeContext";
import { ReactComponent as ETHIcon } from "../../media/tokens/eth.svg";
import WETHIcon from "../../media/tokens/weth.svg";
import DAIIcon from "../../media/tokens/dai.svg";
import celoUSD from "../../media/tokens/cusd.svg";
import { ReactComponent as CEREIcon } from "../../media/tokens/cere-token.svg";
import styles from "../../Constants/constants";

const PredefinedIcons: any = {
  ETHIcon: ETHIcon,
  WETHIcon: WETHIcon,
  DAIIcon: DAIIcon,
  celoUSD: celoUSD,
  CEREIcon: CEREIcon,
};

const showImageUrl = (url?: string) =>
  url && PredefinedIcons[url] ? PredefinedIcons[url] : url;

const borderColor = "#C4C4C4";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      fontFamily: styles.primaryFont,
      padding: constants.generalUnit * 3,
      position: "relative",
      backgroundColor: "white",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: "black",
      textAlign: "center",
      paddingBottom: constants.generalUnit * 3.75,
    },
    walletArea: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginBottom: constants.generalUnit * 3,
    },
    connectButton: {
      background: "linear-gradient(105.79deg, #A700E1 1.84%, #0024E2 102.94%)",
      fontWeight: "bold",
      borderRadius: 5,
      "&:hover": {
        color: "white",
      },
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
      color: styles.primaryTextColor,
      fontSize: 11,
      fontFamily: `${styles.secondaryFont} !important`,
    },
    networkName: {
      padding: `${constants.generalUnit / 1.5}px ${constants.generalUnit}px`,
      border: `1px solid ${borderColor}`,
      borderRadius: 2,
      color: palette.additional["gray"][9],
      marginTop: constants.generalUnit,
      fontSize: 11,
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
    },
    tokenInputSection: {
      width: "60%",
    },
    tokenInput: {
      margin: 0,
      "& > div": {
        height: 32,
        "& input": {
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          borderRight: 0,
          border: `1px solid ${borderColor}`,
          "&:hover": {
            border: `1px solid ${borderColor}`,
            borderRight: 0,
          },
        },
      },
      "& span:last-child.error": {
        position: "absolute",
        width: "calc(100% + 62px)",
      },
    },
    maxButton: {
      height: 32,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      left: -1,
      color: styles.primaryTextColor,
      borderLeft: 0,
      backgroundColor: "white",
      borderColor: `${borderColor} !important`,
      "&:hover": {
        borderColor: `${borderColor} !important`,
        backgroundColor: "white",
        color: styles.primaryTextColor,
        borderLeft: 0,
      },
    },
    currencySelector: {
      width: "40%",
      paddingLeft: constants.generalUnit,
      "& *": {
        cursor: "pointer",
      },
    },
    token: {},
    address: {
      margin: 0,
      marginBottom: constants.generalUnit * 3,
      fontSize: 8,
    },
    addressInput: {
      "& > div > input": {
        fontSize: "11px !important",
      },
    },
    generalInput: {
      "& > span": {
        marginBottom: constants.generalUnit,
      },
      "& > div > div > div > div": {
        fontSize: "11px !important",
      },
    },
    faqButton: {
      cursor: "pointer",
      height: 20,
      width: 20,
      marginTop: constants.generalUnit * 5,
      fill: `${palette.additional["transferUi"][1]} !important`,
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
        minWidth: `calc(100% - 20px)`,
        textAlign: "left",
      },
    },
    fees: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: constants.generalUnit,
      fontFamily: styles.secondaryFont,
      color: styles.greyColor,
      "& > *": {
        display: "block",
        width: "50%",
        marginBottom: constants.generalUnit / 2,
        "&:nth-child(even)": {
          textAlign: "right",
        },
      },
    },
    accountSelector: {
      marginBottom: constants.generalUnit * 3,
    },
    transferButton: {
      background: "linear-gradient(105.79deg, #A700E1 1.84%, #0024E2 102.94%)",
      fontWeight: "bold",
      borderRadius: 5,
      "&:hover": {
        color: "white",
      },
    },
    footer: {
      color: styles.primaryTextColor,
      fontSize: 12,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: constants.generalUnit * 2,
      fontFamily: styles.secondaryFont,
      fontStyle: "normal",
      fontWeight: "bold",
    },
    footerText: {
      color: styles.primaryTextColor,
      fontSize: 12,
      fontStyle: "normal",
      fontWeight: "bold",
    },
    inputBorder: {
      border: `1px solid ${borderColor}`,
    },
    inputLabel: {
      fontSize: 12,
      fontWeight: "normal",
      fontStyle: "normal",
      color: "black",
    },
    networkIcon: {
      width: constants.generalUnit * 1.5,
      height: constants.generalUnit * 1.5,
      marginRight: constants.generalUnit / 2,
    },
  })
);

type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const TransferPage = () => {
  const classes = useStyles();
  const { walletType, setWalletType } = useNetworkManager();

  const {
    deposit,
    setDestinationChain,
    transactionStatus,
    resetDeposit,
    bridgeFee,
    tokens,
    isReady,
    homeConfig,
    destinationChainConfig,
    destinationChains,
    address,
    checkSupplies,
  } = useChainbridge();

  const { accounts, selectAccount } = useHomeBridge();
  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [changeNetworkOpen, setChangeNetworkOpen] = useState<boolean>(false);
  const [preflightModalOpen, setPreflightModalOpen] = useState<boolean>(false);

  const [preflightDetails, setPreflightDetails] = useState<PreflightDetails>({
    receiver: "",
    token: "",
    tokenAmount: 0,
    tokenSymbol: "",
  });

  useEffect(() => {
    if (walletType !== "select" && walletConnecting === true) {
      setWalletConnecting(false);
    } else if (walletType === "select") {
      setWalletConnecting(true);
    }
  }, [walletType, walletConnecting]);

  const selectedToken = homeConfig?.tokens.find(
    (token) => token.address === preflightDetails.token
  );

  const DECIMALS =
    selectedToken && selectedToken.decimals ? selectedToken.decimals : 18;

  const REGEX =
    DECIMALS > 0
      ? new RegExp(`^[0-9]{1,18}(.[0-9]{1,${DECIMALS}})?$`)
      : new RegExp(`^[0-9]{1,18}?$`);

  const transferSchema = object().shape({
    tokenAmount: string()
      .test("Token selected", "Please select a token", (value) => {
        if (
          !!value &&
          preflightDetails &&
          tokens[preflightDetails.token] &&
          tokens[preflightDetails.token].balance !== undefined
        ) {
          return true;
        } else {
          return false;
        }
      })
      .test("InputValid", "Input invalid", (value) => {
        try {
          return REGEX.test(`${value}`);
        } catch (error) {
          console.error(error);
          return false;
        }
      })
      .test("Max", "Insufficent funds", (value) => {
        if (
          value &&
          preflightDetails &&
          tokens[preflightDetails.token] &&
          tokens[preflightDetails.token].balance
        ) {
          if (homeConfig?.type === "Ethereum") {
            return parseFloat(value) <= tokens[preflightDetails.token].balance;
          } else {
            return (
              parseFloat(value) + (bridgeFee || 0) <=
              tokens[preflightDetails.token].balance
            );
          }
        }
        return false;
      })
      .test(
        "Bridge Supplies",
        "Not enough tokens on the destination chain. Please contact support.",
        async (value) => {
          if (checkSupplies && destinationChainConfig && value) {
            const supplies = await checkSupplies(
              parseFloat(value),
              preflightDetails.token,
              destinationChainConfig.chainId
            );
            // As the handleCheckSupplies function is undefined in substrateAdaptor
            if (supplies === undefined) {
              return true;
            } else {
              return Boolean(supplies);
            }
          }
          return false;
        }
      )
      .test("Min", "Less than minimum", (value) => {
        if (value) {
          return parseFloat(value) > 0;
        }
        return false;
      })
      .required("Please set a value"),
    token: string().required("Please select a token"),
    receiver: string()
      .test("Valid address", "Please add a valid address", (value) => {
        if (destinationChainConfig?.type === "Substrate") {
          return isValidSubstrateAddress(value as string);
        }
        return utils.isAddress(value as string);
      })
      .required("Please add a receiving address"),
  });

  return (
    <article className={classes.root}>
      <div className={classes.title}>
        {walletType === "Ethereum" ? (
          <>Transfer Tokens (ERC20 to Native)</>
        ) : walletType === "Substrate" ? (
          <>Transfer Tokens (Native to ERC20)</>
        ) : (
          <>Transfer Tokens</>
        )}
      </div>
      <div className={classes.walletArea}>
        {!isReady ? (
          <Button
            className={classes.connectButton}
            fullsize
            onClick={() => {
              setWalletType("select");
            }}
          >
            Connect to Wallet
          </Button>
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
              <div className={classes.inputLabel}>Home Network</div>
              {/* ToDo: uncomment after enabling Cere -> Eth flow */}
              {/*<Typography*/}
              {/*  className={classes.changeButton}*/}
              {/*  variant="body1"*/}
              {/*  onClick={() => setChangeNetworkOpen(true)}*/}
              {/*>*/}
              {/*  Change*/}
              {/*</Typography>*/}
            </div>
            <div className={classes.networkName}>
              {walletType === "Ethereum" ? (
                <ETHIcon className={classes.networkIcon} />
              ) : (
                <CEREIcon className={classes.networkIcon} />
              )}
              {homeConfig?.name}
            </div>
          </section>
        )}
      </div>
      {isReady &&
        walletType === "Substrate" &&
        accounts &&
        accounts.length > 0 && (
          <div>
            <section className={classes.accountSelector}>
              <SelectInput
                label="Select account"
                className={classes.generalInput}
                options={accounts.map((acc, i) => ({
                  label: acc.address,
                  value: i,
                }))}
                onChange={(value) => selectAccount && selectAccount(value)}
                value={accounts.findIndex((v) => v.address === address)}
                placeholder="Select an account"
              />
            </section>
          </div>
        )}
      <Formik
        initialValues={{
          tokenAmount: 0,
          token: "",
          receiver: "",
        }}
        validateOnChange={false}
        validationSchema={transferSchema}
        onSubmit={(values) => {
          setPreflightDetails({
            ...values,
            tokenSymbol: tokens[values.token].symbol || "",
          });
          setPreflightModalOpen(true);
        }}
      >
        {(props) => (
          <Form
            className={clsx(classes.formArea, {
              disabled: !homeConfig || !address || props.isValidating,
            })}
          >
            {console.log(destinationChainConfig)}
            <section>
              <SelectInput
                label="Destination Network"
                className={classes.generalInput}
                disabled={!homeConfig}
                options={destinationChains.map((dc) => ({
                  label: dc.name,
                  value: dc.chainId,
                }))}
                onChange={(value) => setDestinationChain(value)}
                value={destinationChainConfig?.chainId}
              />
            </section>
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
                    disabled={
                      !destinationChainConfig ||
                      !preflightDetails.token ||
                      preflightDetails.token === ""
                    }
                    name="tokenAmount"
                    label="I want to send"
                  />
                </div>
              </section>
              <section className={classes.currencySelector}>
                <TokenSelectInput
                  tokens={tokens}
                  name="token"
                  disabled={!destinationChainConfig}
                  label={`Balance: `}
                  className={classes.generalInput}
                  placeholder=""
                  sync={(tokenAddress) => {
                    setPreflightDetails({
                      ...preflightDetails,
                      token: tokenAddress,
                      receiver: "",
                      tokenAmount: 0,
                      tokenSymbol: "",
                    });
                  }}
                  options={
                    Object.keys(tokens).map((t) => ({
                      value: t,
                      label: (
                        <div className={classes.tokenItem}>
                          <span>{tokens[t]?.symbol || t}</span>
                        </div>
                      ),
                    })) || []
                  }
                />
              </section>
            </section>
            <section>
              <AddressInput
                disabled={!destinationChainConfig}
                name="receiver"
                label="Destination Address"
                placeholder="Please enter the receiving address..."
                className={classes.address}
                classNames={{
                  input: classes.addressInput,
                }}
                senderAddress={`${address}`}
                sendToSameAccountHelper={
                  destinationChainConfig?.type === homeConfig?.type
                }
              />
            </section>
            <FeesFormikWrapped
              amountFormikName="tokenAmount"
              className={classes.fees}
              fee={bridgeFee}
              feeSymbol={homeConfig?.nativeTokenSymbol}
              symbol={
                preflightDetails && tokens[preflightDetails.token]
                  ? tokens[preflightDetails.token].symbol
                  : undefined
              }
            />
            <section>
              <Button
                type="submit"
                fullsize
                variant="primary"
                className={classes.transferButton}
              >
                Start Transfer
              </Button>
            </section>
          </Form>
        )}
      </Formik>
      <section className={classes.footer}>
        <NavLink
          style={{ textDecoration: "none" }}
          className={classes.footerText}
          to={{ pathname: "https://cere.network/" }}
          target="_blank"
        >
          Cere Homepage
        </NavLink>
        <NavLink
          style={{ textDecoration: "none" }}
          className={classes.footerText}
          to={{
            pathname:
              "https://explorer.cere.network/?rpc=wss%3A%2F%2Frpc.mainnet.cere.network%3A9945#/staking",
          }}
          target="_blank"
        >
          Cere Staking
        </NavLink>
      </section>
      <AboutDrawer open={aboutOpen} close={() => setAboutOpen(false)} />
      <ChangeNetworkDrawer
        open={changeNetworkOpen}
        close={() => setChangeNetworkOpen(false)}
      />
      <PreflightModalTransfer
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
        sourceNetwork={homeConfig?.name || ""}
        targetNetwork={destinationChainConfig?.name || ""}
        tokenSymbol={preflightDetails?.tokenSymbol || ""}
        value={preflightDetails?.tokenAmount || 0}
      />
      <TransferActiveModal open={!!transactionStatus} close={resetDeposit} />
      {/* This is here due to requiring router */}
      <NetworkUnsupportedModal />
    </article>
  );
};
export default TransferPage;
