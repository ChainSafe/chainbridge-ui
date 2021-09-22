import dayjs from "dayjs";
import ETHIcon from "../media/tokens/eth.png";
import { ReactComponent as EthTokenIcon } from "../media/tokens/eth.svg";
import WETHIcon, {
  ReactComponent as WETHTokenIcon,
} from "../media/tokens/weth.svg";
import DAIIcon, {
  ReactComponent as DaiTokenIcon,
} from "../media/tokens/dai.svg";
import celoUSD, {
  ReactComponent as CeloTokenIcon,
} from "../media/tokens/cusd.svg";

import { ReactComponent as EthIcon } from "../media/networks/eth.svg";
import { ReactComponent as CeloUSD } from "../media/networks/celo.svg";
import { ReactComponent as EtcIcon } from "../media/networks/etc.svg";
import { ReactComponent as CosmosIcon } from "../media/networks/cosmos.svg";
import { ReactComponent as EthermintIcon } from "../media/networks/ethermint.svg";
import { BigNumber, BigNumberish, ethers } from "ethers";
import {
  DepositRecord,
  TransferDetails,
} from "../Contexts/Reducers/TransfersReducer";
const { decodeAddress, encodeAddress } = require("@polkadot/keyring");
const { hexToU8a, isHex } = require("@polkadot/util");

export const shortenAddress = (address: string) => {
  return `${address.substr(0, 6)}...${address.substr(address.length - 6, 6)}`;
};

export const isValidSubstrateAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));

    return true;
  } catch (error) {
    return false;
  }
};

export const getNetworkName = (id: any) => {
  switch (Number(id)) {
    case 5:
      return "Localhost";
    case 1:
      return "Mainnet";
    case 3:
      return "Ropsten";
    case 4:
      return "Rinkeby";
    // case 5:
    //   return "Goerli";
    case 6:
      return "Kotti";
    case 42:
      return "Kovan";
    case 61:
      return "Ethereum Classic - Mainnet";
    case 42220:
      return "CELO - Mainnet";
    case 44787:
      return "CELO - Alfajores Testnet";
    case 62320:
      return "CELO - Baklava Testnet";
    default:
      return "Other";
  }
};

export const PredefinedIcons: any = {
  ETHIcon: ETHIcon,
  WETHIcon: WETHIcon,
  DAIIcon: DAIIcon,
  celoUSD: celoUSD,
};

export const getIcon = (chainId: number | undefined) => {
  switch (chainId) {
    case 1:
    case 3:
    case 4:
    case 5:
    case 42:
      return EthIcon;
    case 42220:
    case 44787:
    case 62320:
      return CeloUSD;
    case 61:
      return EthIcon;
    default:
      return EthIcon;
  }
};

// TODO: for now just ERC20 token Icon
export const getTokenIcon = () => {
  return EthTokenIcon;
};

export const formatTransferDate = (transferDate: number | undefined) =>
  dayjs(transferDate).format("MMM D, h:mmA");

export const formatAmount = (amount: BigNumberish) =>
  ethers.utils.formatUnits(amount);

export const getRandomSeed = () => {
  const arr = new Uint8Array(20);
  const randomValues = crypto.getRandomValues(arr);
  const randomString = Array.from(randomValues, (val) =>
    val.toString(16).padStart(2, "0")
  ).join("");

  return randomString;
};

export const getProposalStatus = (status: number | undefined) => {
  switch (status) {
    case 0:
      return "Inactive";
    case 1:
      return "Active";
    case 2:
      return "Passed";
    case 3:
      return "Executed";
    case 4:
      return "Cancelled";
    default:
      return "No status";
  }
};

export const getColorSchemaTransferStatus = (status: number | undefined) => {
  //TODO: just for now we have passed and executed as provided in figma mockups
  switch (status) {
    case 1:
    case 2:
      return {
        borderColor: "#69C0FF",
        background: "#E6F7FF",
      };
    case 3:
      return {
        borderColor: "#389E0D",
        background: "#D9F7BE",
      };
    case 0:
    case 4:
      return {
        borderColor: "#FF4D4F",
        background: "#ff9a9b",
      };
    default:
      return {
        borderColor: "#548CA8",
        background: "#EEEEEE",
      };
  }
};

export const computeAndFormatAmount = (amount: string) => {
  const amountParsed = parseInt(amount);
  const toBigInt = BigInt(amountParsed);
  const toBigNumber = BigNumber.from(toBigInt);
  return formatAmount(toBigNumber);
};

const formatDateTimeline = (date: number) => dayjs(date).format("h:mma");

export const computeTransferDetails = (
  txDetails: DepositRecord
): TransferDetails => {
  const {
    timestamp,
    fromAddress,
    proposals,
    amount,
    fromNetworkName,
    toNetworkName,
    depositTransactionHash,
    fromChainId,
    toChainId,
    status: proposalStatus,
    votes,
    id,
  } = txDetails;

  const formatedTransferDate = formatTransferDate(timestamp);

  const addressShortened = shortenAddress(fromAddress!);

  const depositTxHashShortened = shortenAddress(depositTransactionHash!);

  const formatedAmount = computeAndFormatAmount(amount!);

  const timelineMessages =
    proposalStatus !== 1
      ? proposals.map((proposal) => {
          switch (proposal.proposalStatus) {
            case 1:
              return {
                message: "Waiting for more votes...",
                time: formatDateTimeline(proposal.timestamp),
              };
            case 2:
              return {
                message: `Waiting for execution`,
                time: formatDateTimeline(proposal.timestamp),
                votes: votes.map((vote) => ({
                  message: `Confirmed by ${shortenAddress(vote.by)}`,
                  time: formatDateTimeline(vote.timestamp),
                })),
              };
            case 3:
              return {
                message: "Completed!",
                time: formatDateTimeline(proposal.timestamp),
              };
            case 4:
              return {
                message: "Canceled",
                time: formatTransferDate(proposal.timestamp),
              };
          }
        })
      : [
          {
            message: "Proposal submitted",
            time: formatDateTimeline(timestamp!),
          },
        ];

  return {
    id,
    formatedTransferDate,
    addressShortened,
    formatedAmount,
    fromNetworkName,
    toNetworkName,
    depositTxHashShortened,
    fromChainId,
    toChainId,
    votes,
    proposals,
    proposalStatus,
    timelineMessages,
  };
};
