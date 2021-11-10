import React, { useEffect, useState } from "react";
import { useChainbridge, useHomeBridge } from "../../contexts";
import { object, string } from "yup";
import { useHistory } from "@chainsafe/common-components";
import { utils } from "ethers";
import { useNetworkManager } from "../../contexts/NetworkManagerContext/NetworkManagerContext";
import { isValidSubstrateAddress } from "../../utils/Helpers";
import { showImageUrl } from "../../utils/Helpers";
import { useStyles } from "./styles";
import TransferPageView from "./TransferPageView";

export type PreflightDetails = {
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

  const { redirect } = useHistory();

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
              destinationChainConfig.domainId
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

  const handleClick = (txHash: string) => {
    const url = `/explorer/transaction/${txHash}`;

    redirect(url);
  };

  return (
    <TransferPageView
      isReady={isReady}
      classes={classes}
      setWalletType={setWalletType}
      walletType={walletType}
      walletConnecting={walletConnecting}
      setChangeNetworkOpen={setChangeNetworkOpen}
      homeConfig={homeConfig}
      accounts={accounts}
      selectAccount={selectAccount}
      transferSchema={transferSchema}
      setPreflightDetails={setPreflightDetails}
      setPreflightModalOpen={setPreflightModalOpen}
      preflightModalOpen={preflightModalOpen}
      tokens={tokens}
      destinationChains={destinationChains}
      setDestinationChain={setDestinationChain}
      destinationChainConfig={destinationChainConfig}
      showImageUrl={showImageUrl}
      preflightDetails={preflightDetails}
      bridgeFee={bridgeFee}
      address={address}
      aboutOpen={aboutOpen}
      setAboutOpen={setAboutOpen}
      changeNetworkOpen={changeNetworkOpen}
      deposit={deposit}
      transactionStatus={transactionStatus}
      resetDeposit={resetDeposit}
      handleClick={handleClick}
    />
  );
};
export default TransferPage;
