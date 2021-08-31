import React, { useState } from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import {
  SelectInput,
  TextInput,
  Typography,
  SearchIcon,
  Grid,
} from "@chainsafe/common-components";
import ExplorerTable from "../Custom/ExplorerTable";
import {
  DepositRecord,
  ProposalStatus,
} from "../../Contexts/Reducers/TransfersReducer";
import { BigNumber } from "ethers";

const useStyles = makeStyles(({ constants, breakpoints }: ITheme) =>
  createStyles({
    root: {
      padding: constants.generalUnit * 6,
      position: "relative",
    },
    mainContent: {
      display: "grid",
      gridTemplateRows: "repeat(1, 1fr)",
      width: "70%",
      [breakpoints.down("lg")]: {
        width: "80%",
      },
    },
    networkInfoContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    networkInfo: {
      display: "grid",
      gridColumn: "1/5",
      gridRow: "1",
    },
    networkSelection: {
      display: "flex",
      alignItems: "center",
      "& > h2": {
        color: "#595959",
        fontWeight: 600,
        marginRight: 26,
        [breakpoints.down("md")]: {
          fontSize: 20,
        },
      },
    },
    networkSelectorContainer: {
      display: "flex",
      width: 372,
    },
    searchInput: {
      display: "grid",
      gridColumn: "3/4",
      gridRow: "1",
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
      minWidth: 955,
      width: "100%",
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

const mockAddress = {
  odd: {
    from: "0x2116B3669d0BEA25aA3050F167266Cd21dA04839",
    to: "0xFb422cF8A06Aab21428F943C251758155Cd5f87D",
  },
  even: {
    from: "0xe8A65847fc8341C45917Eb054191Db0f674182Ed",
    to: "0x259103715496CcF80c6e2b5d9500e3918eC7a4c8",
  },
  toDefault: {
    from: "0xEAe8cFbD2cc1c8C0c530Fb30f359078D3a1d02DD",
    to: "0x3d83a581c2a5819635847756A41bD7aB8dDBD9B9",
  },
};

//TODO: mock data for view purposes. Soon to be removed
const mockedTransactions: DepositRecord[] = Array.from(
  new Array(10).keys()
).map((key) => {
  switch (true) {
    case key % 2 === 0: {
      return {
        fromAddress: mockAddress.even.from,
        fromChainId: 5,
        fromNetworkName: "Goerli",
        toAddress: mockAddress.even.to,
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
        fromAddress: mockAddress.odd.from,
        fromChainId: 5,
        fromNetworkName: "Goerli",
        toAddress: mockAddress.odd.to,
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
        fromAddress: mockAddress.toDefault.from,
        fromChainId: 44787,
        fromNetworkName: "Celo",
        toAddress: mockAddress.toDefault.to,
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

const ExplorerPage = () => {
  // TODO: delete this, is provisional
  const {
    __RUNTIME_CONFIG__: {
      CHAINBRIDGE: { chains },
    },
  } = window;

  const classes = useStyles();
  const [network, setNetwork] = useState({ name: "" });
  const [active, setActive] = useState(false);

  const renderOptions = () => {
    return chains.map(({ chainId, name }) => ({
      label: name,
      value: chainId,
    }));
  };

  const handleOpenModal = (fromAddress: string | undefined) => () => {
    const transferDetails = mockedTransactions.find(
      (item) => item.fromAddress === fromAddress
    );
    setTransferDetails(transferDetails);
    setActive(true);
  };

  const handleClose = () => {
    setActive(false);
    setTransferDetails(null);
  };

  return (
    <Grid lg={12} justifyContent="center" flexWrap="wrap">
      <section className={classes.mainContent}>
        <section className={classes.networkInfoContainer}>
          <div className={classes.networkInfo}>
            <div className={classes.networkSelection}>
              <Typography component="h2" variant="h2">
                Transfers on
              </Typography>
              <div className={classes.networkSelectorContainer}>
                <SelectInput
                  className={classes.networkSelector}
                  options={renderOptions()}
                  onChange={(value: any) => {
                    setNetwork(value);
                  }}
                  value={network}
                  placeholder="Select network"
                  disabled={!chains.length}
                />
              </div>
            </div>
          </div>
          <div className={classes.searchInput}>
            <TextInput
              placeholder={"Search by deposit hash"}
              LeftIcon={SearchIcon}
              onChange={() => {}}
            />
          </div>
        </section>
        <div className={classes.explorerTableContainer}>
          <div className={classes.explorerTable}>
            <ExplorerTable
              transactionList={mockedTransactions}
              active={active}
              setActive={setActive}
              handleOpenModal={handleOpenModal}
              handleClose={handleClose}
              transferDetails={transferDetails}
            />
          </div>
        </div>
      </section>
    </Grid>
  );
};
export default ExplorerPage;
