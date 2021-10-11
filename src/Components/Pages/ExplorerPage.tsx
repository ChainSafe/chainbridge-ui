import React, { useState, useReducer, useEffect } from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import {
  SelectInput,
  TextInput,
  Typography,
  SearchIcon,
  Grid,
  useHistory,
} from "@chainsafe/common-components";
import ExplorerTable from "../Custom/ExplorerTable";
import { getColorSchemaTransferStatus } from "../../Utils/Helpers";
import { useExplorer } from "../../Contexts/ExplorerContext";
import {
  ExplorerPageState,
  transfersReducer,
} from "../../Contexts/Reducers/TransfersReducer";

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
      marginBottom: "100px",
    },
    explorerTable: {
      marginTop: 29,
      borderRadius: 4,
      border: "1px solid #B6B6B6",
      background: "#FAFAFA",
      minWidth: 955,
      width: "100%",
      height: "100%",
    },
  })
);

type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const ExplorerPage = () => {
  const explorerContext = useExplorer();
  const { explorerState } = explorerContext;
  const { chains, transfers } = explorerState;

  const initState: ExplorerPageState = {
    network: { name: "", chainId: 0 },
    transferDetails: {
      id: "",
      formatedTransferDate: "",
      addressShortened: "",
      proposalStatus: 0,
      formatedAmount: "",
      fromNetworkName: "",
      toNetworkName: "",
      depositTxHashShortened: "",
      fromChainId: 0,
      toChainId: 0,
      voteEvents: [],
      proposalEvents: [],
      timelineMessages: [],
      fromIcon: undefined,
      toIcon: undefined,
    },
    timelineButtonClicked: false,
    chains,
  };

  const [explorerPageState, explorerPageDispatcher] = useReducer(
    transfersReducer,
    initState
  );

  const { redirect } = useHistory();

  const classes = useStyles();
  const [active, setActive] = useState(false);
  const [pillColorStatus, setPillColorStatus] = useState({
    borderColor: "",
    background: "",
  });

  const renderOptions = () => {
    return chains.map(({ chainId, name }) => ({
      label: name,
      value: chainId,
    }));
  };

  const handleOpenModal = (txId: string | undefined) => () => {
    const txDetail = transfers.find((tx) => tx.id === txId);

    const colorSchemaForTransferStatus = getColorSchemaTransferStatus(
      txDetail?.status
    );

    setPillColorStatus(colorSchemaForTransferStatus);

    explorerPageDispatcher({
      type: "setTransferDetails",
      payload: txDetail!,
    });
    setActive(true);
    redirect(`/explorer/list/${txDetail?.id}`);
  };

  const handleClose = () => {
    setActive(false);
    explorerPageDispatcher({
      type: "cleanTransferDetails",
    });
    redirect("/explorer/list");
  };

  const handleTimelineButtonClick = () =>
    explorerPageDispatcher({ type: "timelineButtonClick" });

  useEffect(() => {
    const {
      location: { href },
    } = window;

    const activeTx = transfers.find((item) => href.includes(item.id));

    if (activeTx !== undefined) {
      const colorSchemaForTransferStatus = getColorSchemaTransferStatus(
        activeTx?.status
      );
      setPillColorStatus(colorSchemaForTransferStatus);
      explorerPageDispatcher({
        type: "setTransferDetails",
        payload: activeTx,
      });
      setActive(true);
    }
  }, [transfers]);

  return (
    <Grid lg={12} justifyContent="center" flexWrap="wrap">
      <section className={classes.mainContent}>
        <section className={classes.networkInfoContainer}>
          <div className={classes.networkInfo}>
            <div className={classes.networkSelection}>
              <Typography component="h2" variant="h2">
                Transfers on
              </Typography>
              {/* <div className={classes.networkSelectorContainer}>
                <SelectInput
                  className={classes.networkSelector}
                  options={renderOptions()}
                  onChange={(value: any) => {
                    explorerDispatcher({
                      type: "selectNetwork",
                      payload: value,
                    });
                  }}
                  value={network}
                  placeholder="Select network"
                  disabled={!chains.length}
                />
              </div> */}
            </div>
          </div>
          {/* <div className={classes.searchInput}>
            <TextInput
              placeholder={"Search by deposit hash"}
              LeftIcon={SearchIcon}
              onChange={() => {}}
            />
          </div> */}
        </section>
        <div className={classes.explorerTableContainer}>
          <div className={classes.explorerTable}>
            <ExplorerTable
              transactionList={transfers || []}
              active={active}
              setActive={setActive}
              handleOpenModal={handleOpenModal}
              handleClose={handleClose}
              transferDetails={explorerPageState.transferDetails || {}}
              pillColorStatus={pillColorStatus}
              chains={chains}
              handleTimelineButtonClick={handleTimelineButtonClick}
              timelineButtonClicked={explorerPageState.timelineButtonClicked}
            />
          </div>
        </div>
      </section>
    </Grid>
  );
};
export default ExplorerPage;
