import React, { useState } from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import AboutDrawer from "../../Modules/AboutDrawer";
import ChangeNetworkDrawer from "../../Modules/ChangeNetworkDrawer";
import NetworkUnsupportedModal from "../../Modules/NetworkUnsupportedModal";
import PreflightModalTransfer from "../../Modules/PreflightModalTransfer";
import {
  Button,
  Typography,
  QuestionCircleSvg,
} from "@chainsafe/common-components";
import { Form, Formik } from "formik";
import AddressInput from "../Custom/AddressInput";
import clsx from "clsx";
import TransferActiveModal from "../../Modules/TransferActiveModal";
import { useWeb3 } from "@chainsafe/web3-context";
import { useChainbridge } from "../../Contexts/ChainbridgeContext";
import TokenSelectInput from "../Custom/TokenSelectInput";
import { object, string } from "yup";
import { utils } from "ethers";
import { chainbridgeConfig } from "../../chainbridgeConfig";
import FeesFormikWrapped from "./FormikContextElements/Fees";
import classNames from "classnames";
import DropdownSelect, { OptionType } from "../Custom/DropdownSelector";
import SimpleTokenInput from "../Custom/SimpleTokenInput";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      ...(constants.pageRootStyles as any),
    },
    walletArea: {
      ...(constants.walletArea as any),
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
    tokenInputArea: {
      ...(constants.tokenInputArea as any),
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
    },

    maxButton: {
      ...(constants.maxButton as any),
    },
    currencySelector: {
      ...(constants.currencySelector as any),
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
        minWidth: `calc(100% - 30px)`,
        textAlign: "right",
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
        color: palette.additional["gray"][8],
        marginBottom: constants.generalUnit / 2,
        "&:nth-child(even)": {
          textAlign: "right",
        },
      },
    },
    submit: {
      backgroundColor: "#E84142",
      ...(constants.largeButtonStyle as any),
    },
    submitContainer: {
      display: "flex",
      justifyContent: "center",
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
  const {
    isReady,
    checkIsReady,
    wallet,
    onboard,
    tokens,
    address,
    network,
  } = useWeb3();
  const {
    homeChain,
    destinationChains,
    destinationChain,
    deposit,
    setDestinationChain,
    transactionStatus,
    resetDeposit,
    bridgeFee,
  } = useChainbridge();

  const [aboutOpen, setAboutOpen] = useState<boolean>(false);
  const [walletConnecting, setWalletConnecting] = useState(false);
  const [changeNetworkOpen, setChangeNetworkOpen] = useState<boolean>(false);
  const [preflightModalOpen, setPreflightModalOpen] = useState<boolean>(false);

  const destChains = destinationChains.map((dc) => ({
    label: dc.name,
    value: dc.chainId,
  }));

  const destChain = destChains.find(
    (chain) => chain.value === destinationChain?.chainId
  );

  const [preflightDetails, setPreflightDetails] = useState<PreflightDetails>({
    receiver: "",
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

  const DECIMALS =
    preflightDetails && tokens[preflightDetails.token]
      ? tokens[preflightDetails.token].decimals
      : 18;

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
          return parseFloat(value) <= tokens[preflightDetails.token].balance;
        }
        return false;
      })
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
        return utils.isAddress(value as string);
      })
      .required("Please add a receiving address"),
  });

  // TODO: line 467: How to pull correct HomeChain Symbol

  return (
    <article className={classes.root}>
      <div className={classes.walletArea}>
        {!isReady ? (
          <Button
            className={classes.connectButton}
            fullsize
            onClick={() => {
              handleConnect();
            }}
          >
            Connect Metamask
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
              className={classNames(classes.networkName)}
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
        <Form
          className={clsx(classes.formArea, {
            disabled: !homeChain,
          })}
        >
          <section>
            <DropdownSelect
              label="Destination Network"
              disabled={!homeChain}
              options={destChains}
              onChange={(option: OptionType) =>
                setDestinationChain(option.value)
              }
              value={destChain}
            />
          </section>
          <section className={classes.currencySection}>
            <section>
              <div
                className={clsx(classes.tokenInputArea, classes.generalInput)}
              >
                <SimpleTokenInput
                  name="tokenAmount"
                  label="Amount"
                  max={
                    tokens[preflightDetails.token] &&
                    tokens[preflightDetails.token].balance
                  }
                />
              </div>
            </section>
            <section className={classes.currencySelector}>
              <TokenSelectInput
                tokens={tokens}
                name="token"
                disabled={!destinationChain}
                label={`Balance: `}
                className={classes.generalInput}
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
                    icon: tokens[t]?.imageUri,
                    alt: tokens[t]?.symbol,
                    label: tokens[t]?.symbol || "Unknown",
                  })) || []
                }
              />
            </section>
          </section>
          <section>
            <AddressInput
              disabled={!destinationChain}
              name="receiver"
              label="Destination Address"
              placeholder="Please enter the receiving address"
              className={classes.address}
              classNames={{
                input: classes.addressInput,
              }}
              senderAddress={`${address}`}
            />
          </section>
          <FeesFormikWrapped
            amountFormikName="tokenAmount"
            className={classes.fees}
            fee={bridgeFee}
            feeSymbol={homeChain?.nativeTokenSymbol}
            symbol={
              preflightDetails && tokens[preflightDetails.token]
                ? tokens[preflightDetails.token].symbol
                : undefined
            }
          />
          <section className={classes.submitContainer}>
            <Button
              className={classes.submit}
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
        open={!homeChain && isReady}
        network={network}
        supportedNetworks={chainbridgeConfig.chains.map((bc) => bc.networkId)}
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
        sourceNetwork={homeChain?.name || ""}
        targetNetwork={destinationChain?.name || ""}
        tokenSymbol={preflightDetails?.tokenSymbol || ""}
        value={preflightDetails?.tokenAmount || 0}
      />
      <TransferActiveModal open={!!transactionStatus} close={resetDeposit} />
    </article>
  );
};
export default TransferPage;
