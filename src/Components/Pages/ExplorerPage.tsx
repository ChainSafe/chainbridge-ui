import React, { useState } from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import {
  Button,
  SelectInput,
  TextInput,
  Typography,
  SearchIcon,
} from "@chainsafe/common-components";
import ExplorerTable from "../Custom/ExplorerTable";
import { useNetworkManager } from "../../Contexts/NetworkManagerContext";
import { useChainbridge } from "../../Contexts/ChainbridgeContext";
import {
  DepositRecord,
  ProposalStatus,
} from "../../Contexts/Reducers/TransfersReducer";
import { BigNumber } from "ethers";

const useStyles = makeStyles(({ constants }: ITheme) =>
  createStyles({
    root: {
      padding: constants.generalUnit * 6,
      position: "relative",
    },
    mainContent: {
      display: "flex",
      flexDirection: "column",
    },
    networkInfoContainer: {
      display: "flex",
      justifyContent: "center",
    },
    networkInfo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      width: 955,
    },
    networkSelection: {
      display: "flex",
      alignItems: "center",
      "& > h2": {
        color: "#595959",
        fontWeight: 600,
      },
    },
    searchInput: {
      display: "flex",
      justifyContent: "flex-end",
      alignSelf: "flex-start",
      height: 32,
      width: 292,
      borderRadius: "2px",
    },
    networkSelector: {
      marginLeft: 21,
      width: 327,
      "& > div > div": {
        lineHeight: 32,
        color: "#262626",
        "& > div > div": {
          fontSize: 24,
          fontWeight: 600,
        },
      },
    },
    explorerTableContainer: {
      display: "flex",
      justifyContent: "center",
    },
    explorerTable: {
      marginTop: 29,
      borderRadius: 4,
      border: "1px solid #B6B6B6",
      background: "#FAFAFA",
      width: 955,
      height: 685,
    },
  })
);

type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const mockAddres = {
  from: "0xd840...82Ac",
  to: "0x7bA3...1d2b",
};

//TODO: mock data for view purposes. Soon to be removed
const mockedTransactions: DepositRecord[] = Array.from(
  new Array(10).keys()
).map((key) => {
  switch (true) {
    case key % 2 === 0: {
      return {
        fromAddress: mockAddres.from,
        fromChainId: 5,
        fromNetworkName: "Goerli",
        toAddres: mockAddres.to,
        toChainId: 44787,
        toNetworkName: "Celo Testnet",
        tokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
        amount: BigNumber.from("144435150"),
        timestamp: 1629461364,
        depositTransactionHash: "0xcab0...e06e",
        depositBlockNumber: 4043802,
        proposalEvents: [
          {
            proposalStatus: ProposalStatus.Active,
            proposalEventTransactionHash: "0xcab0...e06e",
            proposalEventBlockNumber: 4043802,
            timestamp: 1629461364,
          },
        ],
        votes: [
          {
            voteStatus: true,
            voteTransactionHash: "0xcab0...e06e",
            voteBlockNumber: 4043802,
            timestamp: 1629461364,
            dataHash: "0xcab0...e06e",
          },
        ],
      };
    }
    case key % 3 === 0: {
      return {
        fromAddress: mockAddres.from,
        fromChainId: 5,
        fromNetworkName: "Goerli",
        toAddres: mockAddres.to,
        toChainId: 44787,
        toNetworkName: "Mainnet",
        tokenAddress: "0xe09523d86d9b788BCcb580d061605F31FCe69F51",
        amount: BigNumber.from("144435150"),
        timestamp: 1629461364,
        depositTransactionHash: "0xcab0...e06e",
        depositBlockNumber: 4043802,
        proposalEvents: [
          {
            proposalStatus: ProposalStatus.Executed,
            proposalEventTransactionHash: "0xcab0...e06e",
            proposalEventBlockNumber: 4043802,
            timestamp: 1629461364,
          },
        ],
        votes: [
          {
            voteStatus: true,
            voteTransactionHash: "0xcab0...e06e",
            voteBlockNumber: 4043802,
            timestamp: 1629461364,
            dataHash: "0xcab0...e06e",
          },
        ],
      };
    }
    default: {
      return {
        fromAddress: mockAddres.from,
        fromChainId: 44787,
        fromNetworkName: "Celo",
        toAddres: mockAddres.to,
        toChainId: 5,
        toNetworkName: "Goerli",
        tokenAddress: "0xe09523d86d9b788BCcb580d061605F31FCe69F51",
        amount: BigNumber.from("144435150"),
        timestamp: 1629461364,
        depositTransactionHash: "0xcab0...e06e",
        depositBlockNumber: 4043802,
        proposalEvents: [
          {
            proposalStatus: ProposalStatus.Passed,
            proposalEventTransactionHash: "0xcab0...e06e",
            proposalEventBlockNumber: 4043802,
            timestamp: 1629461364,
          },
        ],
        votes: [
          {
            voteStatus: true,
            voteTransactionHash: "0xcab0...e06e",
            voteBlockNumber: 4043802,
            timestamp: 1629461364,
            dataHash: "0xcab0...e06e",
          },
        ],
      };
    }
  }
});
  const classes = useStyles();
  const { homeChains } = useNetworkManager();
  const { destinationChains } = useChainbridge();

  const [network, setNetwork] = useState({ name: "" });

  const handleNetworkSelection = (evt: React.ChangeEvent) => {};

  const renderOptions = () => {
    if (!homeChains.length) return [];
    return homeChains.map(({ chainId, name }) => ({
      label: name,
      value: chainId,
    }));
  };

  return (
    <section className={classes.mainContent}>
      <section className={classes.networkInfoContainer}>
        <div className={classes.networkInfo}>
          <div className={classes.networkSelection}>
            <Typography component="h2" variant="h2">
              Transfers on
            </Typography>
            <SelectInput
              className={classes.networkSelector}
              options={renderOptions()}
              onChange={(value: any) => {
                setNetwork(value);
              }}
              value={network}
              placeholder="Select network"
              disabled={!homeChains.length}
            />
          </div>
          <div className={classes.searchInput}>
            <TextInput
              placeholder={"Search by deposit hash"}
              LeftIcon={SearchIcon}
              onChange={() => {}}
            />
          </div>
        </div>
      </section>
      <div className={classes.explorerTableContainer}>
        <div className={classes.explorerTable}>
          <ExplorerTable transactionList={mockedTransactions} />
        </div>
      </div>
    </section>
  );
};
export default ExplorerPage;
