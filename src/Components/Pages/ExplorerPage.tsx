import React from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import {
  Button,
  SelectInput,
  TextInput,
  Typography,
  SearchIcon,
} from "@chainsafe/common-components";
import ExplorerTable from "../Custom/ExplorerTable";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      padding: constants.generalUnit * 6,
      position: "relative",
    },
    mainContent: {
      display: "flex",
      flexDirection: "column",
    },
    networkInfo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "baseline",
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
      height: 32,
      width: 292,
      borderRadius: "2px",
    },
    networkSelector: {
      marginLeft: 21,
      width: 327,
      "& > div > div": {
        height: 43,
        lineHeight: 32,
        color: "#262626",
        "& > div > div": {
          fontSize: 24,
          fontWeight: 600,
        },
      },
    },
  })
);

type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const networks = [{ name: "Ethereum Mainnet" }];

const ExplorerPage = (props: any) => {
  const classes = useStyles();

  const [network, setNetwork] = useState({ name: "" });

  return (
    <div className={classes.mainContent}>
      <div className={classes.networkInfo}>
        <div className={classes.networkSelection}>
          <Typography component="h2" variant="h2">
            Transfers on
          </Typography>
          <SelectInput
            className={classes.networkSelector}
            options={networks.map((network, idx) => ({
              label: network.name,
              value: idx,
            }))}
            onChange={(value: any) => {
              setNetwork(value);
            }}
            value={network}
            placeholder="Select network"
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
      <div>
        <ExplorerTable />
      </div>
    </div>
  );
};
export default ExplorerPage;
