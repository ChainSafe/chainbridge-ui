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
import ETHIcon from "../../media/tokens/eth.svg";
import WETHIcon from "../../media/tokens/weth.svg";
import DAIIcon from "../../media/tokens/dai.svg";
import celoUSD from "../../media/tokens/cusd.svg";
import CEREIcon from "../../media/tokens/cere-token.svg";

const PredefinedIcons: any = {
  ETHIcon: ETHIcon,
  WETHIcon: WETHIcon,
  DAIIcon: DAIIcon,
  celoUSD: celoUSD,
  CEREIcon: CEREIcon,
};

const showImageUrl = (url?: string) =>
  url && PredefinedIcons[url] ? PredefinedIcons[url] : url;

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      fontFamily: "Sora, sans-serif",
      padding: 25,
      position: "relative",
      backgroundColor: "#FFFFFF",
    },
    title: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#000000",
      textAlign: "center",
      paddingBottom: "30px",
    },
    walletArea: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginBottom: 24,
    },
    connectButton: {
      background: "linear-gradient(105.79deg, #A700E1 1.84%, #0024E2 102.94%)",
      borderRadius: "5px",
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
      color: "#5C4DCF",
      fontSize: "11px",
    },
    networkName: {
      padding: "5px 8px",
      border: `1px solid #C4C4C4`,
      borderRadius: 2,
      color: palette.additional["gray"][9],
      marginTop: constants.generalUnit,
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
          border: "1px solid #C4C4C4",
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
      color: "#5C4DCF",
      borderLeft: "none",
      backgroundColor: "white",
      borderColor: palette.additional["gray"][6],
      "&:hover": {
        borderColor: palette.additional["gray"][6],
        backgroundColor: "white",
        color: "#5C4DCF",
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
      "& > *": {
        display: "block",
        width: "50%",
        color: "#000000",
        marginBottom: constants.generalUnit / 2,
        "&:nth-child(even)": {
          textAlign: "right",
          color: "#AFAFAF",
        },
      },
    },
    accountSelector: {
      marginBottom: 24,
    },
    transferButton: {
      background: "linear-gradient(105.79deg, #A700E1 1.84%, #0024E2 102.94%)",
      borderRadius: "5px",
    },
    footerText: {
      color: "#5C4DCF",
      fontSize: "12px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: "15px",
      fontFamily: "SF Pro Display, sans-serif",
      fontStyle: "normal",
      fontWeight: "bold",
    },
    inputBorder: {
      border: "1px solid #C4C4C4",
    },
    inputLabel: {
      fontSize: 12,
      fontWeight: "normal",
      fontStyle: "normal",
      color: "#000000",
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
              parseFloat(value + (bridgeFee || 0)) <=
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
            return Boolean(supplies);
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
      <div className={classes.title}>Transfer Tokens (ERC20 to Native)</div>
      <div className={classes.walletArea}>
        {!isReady ? (
          <Button
            className={classes.connectButton}
            fullsize
            onClick={() => {
              setWalletType("Ethereum");
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
              <Typography
                className={classes.changeButton}
                variant="body1"
                onClick={() => setChangeNetworkOpen(true)}
              >
                Change
              </Typography>
            </div>
            <div className={classes.networkName}>{homeConfig?.name}</div>
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
                    label="I want to send:"
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
                          {tokens[t]?.imageUri && (
                            <img
                              src={showImageUrl(tokens[t]?.imageUri)}
                              alt={tokens[t]?.symbol}
                            />
                          )}
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
                label="Destination Address:"
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
      <section className={classes.footerText}>
        <div>Cere Homepage</div>
        <div>Cere Staking</div>
        <div>Cere Wiki</div>
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
