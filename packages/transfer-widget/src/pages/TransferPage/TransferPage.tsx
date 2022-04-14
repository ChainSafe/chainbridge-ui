import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Button from "@mui/material/Button";
import clsx from "clsx";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import {
  useChainbridge,
  useHomeBridge,
  useNetworkManager,
  useWeb3
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
    preflightDetails && deposit(
      preflightDetails.tokenAmount,
      preflightDetails.receiver,
      preflightDetails.token
    );
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ flexGrow: 1, mt: 1, mb: 3 }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 2 }}
            sx={{marginLeft: '0 !important'}}
          >
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={6}
              rowSpacing={{ xs: 1, md: 1 }}
              sx={{
                paddingLeft: "16px",
                paddingRight: "16px",
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: "5px",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
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
                />
              </Grid>
              <Grid item xs={12}>
                <SelectDestinationNetwork
                  label="Destination Network"
                  disabled={!homeConfig || formState.isSubmitting}
                  options={destinationChains.map((dc: any) => ({
                    label: dc.name,
                    value: dc.domainId,
                  }))}
                  onChange={(value: number | undefined) =>
                    setDestinationChain(value)
                  }
                  value={destinationChainConfig?.domainId}
                />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={6}
              columnSpacing={1}
              rowSpacing={1}
              sx={{ paddingRight: "16px" }}
            >
              <Grid item xs={12} md={6}>
                {true && <TokenSelectInput
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
                    tokens ? Object.keys(tokens).map((t) => ({
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
                    })) : []
                  }
                />}
              </Grid>
              <Grid item xs={12} md={6}>
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
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Grid container columnSpacing={{ xs: 2, sm: 2, md: 2 }} sx={{marginLeft: "0 !important"}}>
              <Grid item xs={0} sm={9} md={9}></Grid>
              <Grid
                container
                item
                xs={12}
                sm={3}
                md={3}
                sx={{
                  pl: "8px !important",
                  pr: 1,
                }}
              >
                <Button
                  disabled={!destinationChainConfig || formState.isSubmitting}
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="start-transfer"
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
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
      <AboutDrawer open={aboutOpen} close={() => setAboutOpen(false)} />

      <ChangeNetworkDrawer
        open={changeNetworkOpen}
        close={() => setChangeNetworkOpen(false)}
      />
      <TransferActiveModal open={!!transactionStatus} close={resetDeposit} />
      {/* <NetworkUnsupportedModal /> */}
      <NetworkSelectModal />
    </div>
  );
};
export default TransferPage;
