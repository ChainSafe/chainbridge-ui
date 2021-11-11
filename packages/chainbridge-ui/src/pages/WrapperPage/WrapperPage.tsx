import React, { useEffect, useState } from "react";
import { useChainbridge, useNetworkManager } from "../../contexts";
import { object, string } from "yup";
import { TokenConfig } from "../../chainbridgeConfig";
import { showImageUrl } from "../../utils/Helpers";
import { useStyles } from "./styles";
import WrapperPageView from "./WrapperPageView";

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
    <WrapperPageView
      isReady={isReady}
      classes={classes}
      setWalletType={setWalletType}
      walletConnecting={walletConnecting}
      setChangeNetworkOpen={setChangeNetworkOpen}
      homeConfig={homeConfig}
      setPreflightDetails={setPreflightDetails}
      setPreflightModalOpen={setPreflightModalOpen}
      preflightModalOpen={preflightModalOpen}
      tokens={tokens}
      showImageUrl={showImageUrl}
      preflightDetails={preflightDetails}
      address={address}
      aboutOpen={aboutOpen}
      setAboutOpen={setAboutOpen}
      changeNetworkOpen={changeNetworkOpen}
      wrapSchema={wrapSchema}
      nativeTokenBalance={nativeTokenBalance}
      wrapTokenConfig={wrapTokenConfig}
      action={action}
      setAction={setAction}
      handleWrapToken={handleWrapToken}
      handleUnwrapToken={handleUnwrapToken}
      txDetails={txDetails}
      setTxDetails={setTxDetails}
    />
  );
};
export default MainPage;
