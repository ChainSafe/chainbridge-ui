import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

import { useChainbridge, useNetworkManager } from "@chainsafe/chainbridge-ui-core";
import { showImageUrl } from "../../utils/Helpers";
import { useStyles } from "./styles";
import {
  NetworkUnsupportedModal,
  WrapActiveModal,
  PreflightModalWrap,
  ChangeNetworkDrawer,
  AboutDrawer,
} from "../../modules";
import { ReactComponent as ETHIcon } from "../../media/tokens/eth.svg";
import { TokenConfig } from "../../chainbridgeConfig";
import { forwardTo } from "../../utils/History";
import { ROUTE_LINKS } from "../../routes";

import {
  WrapTokenInput,
  WrapTokenSelectInput,
  TokenBalance,
} from "../../components";

import HomeNetworkConnectView from "./HomeNetworkConnectView";

import makeValidationSchema from "./makeValidationSchema";

export type PreflightDetails = {
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
    console.log(wrapTokenConfig, wrapToken, homeConfig);
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

  const wrapSchema = makeValidationSchema({
    tokens,
    homeChainConfig,
    action,
    nativeTokenBalance,
    wrapTokenConfig,
  });

  const { handleSubmit, control, setValue, watch, formState } =
    useForm<PreflightDetails>({
      resolver: yupResolver(wrapSchema),
      defaultValues: {
        tokenAmount: 0,
      },
    });

  const onSubmit: SubmitHandler<PreflightDetails> = (values) => {
    setPreflightDetails({
      ...values,
    });
    setPreflightModalOpen(true);
  };

  const tokenBalance =
    action === "wrap"
      ? nativeTokenBalance
      : tokens[wrapTokenConfig?.address || "0x"]?.balance;

  return (
    <div className={classes.root}>
      <HomeNetworkConnectView
        isReady={isReady}
        classes={classes}
        walletConnecting={walletConnecting}
        homeConfig={homeConfig}
        setWalletType={setWalletType}
        setChangeNetworkOpen={setChangeNetworkOpen}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ my: 2 }}>
          <Box sx={{ my: 2, display: "flex" }}>
            <WrapTokenSelectInput
              control={control}
              rules={{ required: true }}
              tokens={tokens}
              name="token"
              disabled={formState.isSubmitting}
              className={classes.generalInput}
              onChange={(val: any) => setAction(val)}
              setValue={setValue}
              value={action}
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
                        src={showImageUrl(
                          wrapTokenConfig?.imageUri || "WETHIcon"
                        )}
                        alt={wrapTokenConfig?.symbol}
                      />
                      <span>{wrapTokenConfig?.symbol || "wETH"}</span>
                    </div>
                  ),
                  value: "unwrap",
                },
              ]}
            />
            <TokenBalance balance={tokenBalance} />
          </Box>
          <section>
            <WrapTokenInput
              tokenSelectorKey={wrapTokenConfig?.address ?? "0x"}
              tokens={tokens}
              name="tokenAmount"
              label="I want to convert"
              setValue={setValue}
              control={control}
              max={tokenBalance}
            />
          </section>
        </Box>
        <section>
          <Button
            disabled={formState.isSubmitting}
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
            {action === "wrap" ? "Wrap Token" : "Unwrap token"}
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
    </div>
  );
};
export default MainPage;
