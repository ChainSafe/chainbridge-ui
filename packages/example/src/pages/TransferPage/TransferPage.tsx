import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button from "@mui/material/Button";
import clsx from "clsx";

import {
  useChainbridge,
  useHomeBridge,
  useNetworkManager,
  useWeb3,
} from "@chainsafe/chainbridge-ui-core";
import { showImageUrl } from "../../utils/Helpers";
import { useStyles } from "./styles";

import {
  TransferActiveModal,
  NetworkUnsupportedModal,
  PreflightModalTransfer,
  ChangeNetworkDrawer,
  AboutDrawer,
  NetworkSelectModal,
} from "../../modules";
import {
  AddressInput,
  TokenSelectInput,
  TokenInput,
  Fees,
  SelectDestinationNetwork,
} from "../../components";

import HomeNetworkConnectView from "./HomeNetworkConnectView";

import makeValidationSchema from "./makeValidationSchema";

export type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const TransferPage = () => {
  const classes = useStyles();
  const { walletType, setWalletType } = useWeb3();

  const { dispatcher } = useWeb3();

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

  const transferSchema = makeValidationSchema({
    preflightDetails,
    tokens,
    bridgeFee,
    homeConfig,
    destinationChainConfig,
    checkSupplies,
  });

  const { handleSubmit, control, setValue, watch, formState } =
    useForm<PreflightDetails>({
      resolver: yupResolver(transferSchema),
      defaultValues: {
        token: "",
        tokenAmount: 0,
        receiver: "",
      },
    });

  const watchToken = watch("token", "");
  const watchAmount = watch("tokenAmount", 0);

  const onSubmit: SubmitHandler<PreflightDetails> = (values) => {
    setPreflightDetails({
      ...values,
      tokenSymbol: tokens[values.token].symbol || "",
    });
    setPreflightModalOpen(true);
  };

  return (
    <div className={classes.root}>
      <HomeNetworkConnectView
        isReady={isReady}
        accounts={accounts}
        address={address}
        classes={classes}
        walletConnecting={walletConnecting}
        walletType={walletType}
        homeConfig={homeConfig}
        setWalletType={setWalletType}
        setChangeNetworkOpen={setChangeNetworkOpen}
        selectAccount={selectAccount}
        dispatcher={dispatcher}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <SelectDestinationNetwork
            label="Destination Network"
            disabled={!homeConfig || formState.isSubmitting}
            options={destinationChains.map((dc: any) => ({
              label: dc.name,
              value: dc.domainId,
            }))}
            onChange={(value: number | undefined) => setDestinationChain(value)}
            value={destinationChainConfig?.domainId}
          />
        </section>
        <section className={classes.currencySection}>
          <section>
            <TokenSelectInput
              control={control}
              rules={{ required: true }}
              tokens={tokens ?? []}
              name="token"
              disabled={!destinationChainConfig || formState.isSubmitting}
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
              setValue={setValue}
              options={
                tokens
                  ? Object.keys(tokens).map((t) => ({
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
                    }))
                  : []
              }
            />
          </section>
          <section>
            <div>
              <TokenInput
                classNames={{
                  input: clsx(classes.tokenInput, classes.generalInput),
                  button: classes.maxButton,
                }}
                tokenSelectorKey={watchToken}
                tokens={tokens}
                disabled={
                  !destinationChainConfig ||
                  formState.isSubmitting ||
                  !preflightDetails.token ||
                  preflightDetails.token === ""
                }
                name="tokenAmount"
                label="Amount to send"
                setValue={setValue}
                control={control}
              />
            </div>
          </section>
        </section>
        <section>
          <AddressInput
            disabled={!destinationChainConfig || formState.isSubmitting}
            name="receiver"
            label="Destination Address"
            placeholder="Please enter the receiving address"
            senderAddress={`${address}`}
            sendToSameAccountHelper={
              destinationChainConfig?.type === homeConfig?.type
            }
            setValue={setValue}
            control={control}
          />
        </section>
        <Fees
          amountFormikName="tokenAmount"
          className={classes.fees}
          fee={bridgeFee}
          feeSymbol={homeConfig?.nativeTokenSymbol}
          symbol={
            preflightDetails && !!tokens && tokens[preflightDetails.token]
              ? tokens[preflightDetails.token].symbol
              : undefined
          }
          amount={watchAmount}
        />
        <section>
          <Button
            disabled={!destinationChainConfig || formState.isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#262626",
              color: "#ffffff",
              ":hover": {
                backgroundColor: "#262626",
                opacity: 0.9,
              },
            }}
          >
            Start transfer
          </Button>
        </section>
        <section>
          <HelpOutlineIcon
            onClick={() => setAboutOpen(true)}
            className={classes.faqButton}
          />
        </section>
      </form>
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
      {/* <NetworkUnsupportedModal /> */}
      <NetworkSelectModal />
    </div>
  );
};
export default TransferPage;
