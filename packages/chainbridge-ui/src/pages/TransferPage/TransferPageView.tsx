import React from "react";
import {
  Button,
  Typography,
  QuestionCircleSvg,
  SelectInput,
} from "@chainsafe/common-components";
import clsx from "clsx";
import { Form, Formik } from "formik";
import {
  TransferActiveModal,
  NetworkUnsupportedModal,
  PreflightModalTransfer,
  ChangeNetworkDrawer,
  AboutDrawer,
} from "../../modules";
import {
  AddressInput,
  TokenSelectInput,
  TokenInput,
  Fees,
} from "../../components";
import { WalletType } from "../../contexts/NetworkManagerContext/NetworkManagerContext";
import { BridgeConfig } from "../../chainbridgeConfig";
import { PreflightDetails } from "./TransferPage";

type TransferPageView = {
  isReady: boolean | undefined;
  classes: any;
  setWalletType: (walletType: WalletType) => void;
  walletType: string;
  walletConnecting: boolean;
  setChangeNetworkOpen: React.Dispatch<React.SetStateAction<boolean>>;
  homeConfig: BridgeConfig | undefined;
  accounts: Array<any> | undefined;
  selectAccount: any;
  transferSchema: object;
  setPreflightDetails: React.Dispatch<React.SetStateAction<PreflightDetails>>;
  setPreflightModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  preflightModalOpen: boolean;
  tokens: any;
  destinationChains: any;
  setDestinationChain: (domainId: number | undefined) => void;
  destinationChainConfig: any;
  showImageUrl: (url: string | undefined) => string;
  preflightDetails: PreflightDetails;
  bridgeFee: any;
  address: string | undefined;
  aboutOpen: any;
  setAboutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  changeNetworkOpen: any;
  deposit: any;
  transactionStatus: string | undefined;
  resetDeposit: () => void;
  handleClick: (txHash: string) => void;
};

export default function TransferPageView({
  isReady,
  classes,
  setWalletType,
  walletType,
  walletConnecting,
  setChangeNetworkOpen,
  homeConfig,
  accounts,
  selectAccount,
  transferSchema,
  setPreflightDetails,
  setPreflightModalOpen,
  preflightModalOpen,
  tokens,
  destinationChains,
  setDestinationChain,
  destinationChainConfig,
  showImageUrl,
  preflightDetails,
  bridgeFee,
  address,
  aboutOpen,
  setAboutOpen,
  changeNetworkOpen,
  deposit,
  transactionStatus,
  resetDeposit,
  handleClick,
}: TransferPageView) {
  return (
    <article className={classes.root}>
      <div className={classes.walletArea}>
        {!isReady ? (
          <Button
            className={classes.connectButton}
            fullsize
            onClick={() => {
              setWalletType("select");
            }}
          >
            Connect
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
            <section>
              <SelectInput
                label="Destination Network"
                className={classes.generalInput}
                disabled={!homeConfig}
                options={destinationChains.map((dc: any) => ({
                  label: dc.name,
                  value: dc.domainId,
                }))}
                onChange={(value) => setDestinationChain(value)}
                value={destinationChainConfig?.domainId}
              />
            </section>
            <section className={classes.currencySection}>
              {/* <section>
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
            </sectionbridgeFee> */}
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
              <section className={classes.tokenInputSection}>
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
            </section>
            <section>
              <AddressInput
                disabled={!destinationChainConfig}
                name="receiver"
                label="Destination Address"
                placeholder="Please enter the receiving address"
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
            <Fees
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
              <Button type="submit" fullsize variant="primary">
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
        )}
      </Formik>
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
      <TransferActiveModal
        open={!!transactionStatus}
        close={resetDeposit}
        handleClick={handleClick}
      />
      {/* This is here due to requiring router */}
      <NetworkUnsupportedModal />
    </article>
  );
}
