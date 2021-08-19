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

const ExplorerPage = (props: any) => {
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
          <ExplorerTable />
        </div>
      </div>
    </section>
  );
};
export default ExplorerPage;
