import React from "react";
import { Form, Formik } from "formik";
import clsx from "clsx";
import {
  NetworkUnsupportedModal,
  WrapActiveModal,
  PreflightModalWrap,
  ChangeNetworkDrawer,
  AboutDrawer,
} from "../../modules";
import {
  Button,
  Typography,
  QuestionCircleSvg,
  SelectInput,
} from "@chainsafe/common-components";
import { SimpleTokenInput } from "../../components";
import { ReactComponent as ETHIcon } from "../../media/tokens/eth.svg";
import { WalletType } from "../../contexts/NetworkManagerContext/NetworkManagerContext";
import { BridgeConfig, TokenConfig } from "../../chainbridgeConfig";
import { PreflightDetails } from "./WrapperPage";
import { forwardTo } from "../../utils/History";
import { ROUTE_LINKS } from "../../routes";

type WrapperPageView = {
  isReady: boolean | undefined;
  classes: Record<
    | "root"
    | "walletArea"
    | "blurb"
    | "connectButton"
    | "connecting"
    | "connected"
    | "changeButton"
    | "networkName"
    | "formArea"
    | "currencySection"
    | "tokenInputArea"
    | "tokenInput"
    | "maxButton"
    | "tokenIndicator"
    | "generalInput"
    | "faqButton"
    | "token"
    | "tokenItem"
    | "submitButtonArea",
    string
  >;
  setWalletType: (walletType: WalletType) => void;
  walletConnecting: boolean;
  setChangeNetworkOpen: React.Dispatch<React.SetStateAction<boolean>>;
  homeConfig: BridgeConfig | undefined;
  setPreflightDetails: React.Dispatch<React.SetStateAction<PreflightDetails>>;
  setPreflightModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  preflightModalOpen: boolean;
  tokens: any;
  showImageUrl: (url: string | undefined) => string;
  preflightDetails: PreflightDetails;
  address: string | undefined;
  aboutOpen: any;
  setAboutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  changeNetworkOpen: any;
  wrapSchema: any;
  nativeTokenBalance: number | undefined;
  wrapTokenConfig: TokenConfig | undefined;
  action: "wrap" | "unwrap";
  setAction: React.Dispatch<React.SetStateAction<"wrap" | "unwrap">>;
  handleWrapToken: () => void;
  handleUnwrapToken: () => void;
  txDetails:
    | {
        txState?: "inProgress" | "done";
        value: number;
        tokenInfo: TokenConfig;
        txHash?: string;
        action: "wrap" | "unwrap";
      }
    | undefined;
  setTxDetails: React.Dispatch<
    React.SetStateAction<
      | {
          txState?: "inProgress" | "done" | undefined;
          value: number;
          tokenInfo: TokenConfig;
          txHash?: string | undefined;
          action: "wrap" | "unwrap";
        }
      | undefined
    >
  >;
};

export default function WrapperPageView({
  isReady,
  classes,
  setWalletType,
  walletConnecting,
  setChangeNetworkOpen,
  homeConfig,
  setPreflightDetails,
  setPreflightModalOpen,
  preflightModalOpen,
  tokens,
  showImageUrl,
  preflightDetails,
  address,
  aboutOpen,
  setAboutOpen,
  changeNetworkOpen,
  wrapSchema,
  nativeTokenBalance,
  wrapTokenConfig,
  action,
  setAction,
  handleWrapToken,
  handleUnwrapToken,
  txDetails,
  setTxDetails,
}: WrapperPageView) {
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
        onSubmit={(values: any) => {
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
                          src={showImageUrl(wrapTokenConfig?.imageUri)}
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
}
