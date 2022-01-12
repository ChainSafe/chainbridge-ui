import React, { useState, useReducer, useEffect } from "react";

import {
  useHistory,
} from "react-router-dom"
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";


import { ExplorerTable } from "../../components";
import {
  useExplorer,
  ExplorerPageState,
  transfersReducer,
} from "@chainsafe/chainbridge-ui-core";
import { useStyles } from "./styles";

type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const ExplorerPage = () => {
  const explorerContext = useExplorer();
  const { explorerState, loadMore, setExplorerStateContext } = explorerContext;
  const { chains, transfers, pageInfo, isLoading } = explorerState;

  const initState: ExplorerPageState = {
    network: { name: "", domainId: 0 },
    transferDetails: {
      id: "",
      formatedTransferDate: "",
      fromAddress: "",
      proposalStatus: 0,
      formatedAmount: "",
      fromNetworkName: "",
      toNetworkName: "",
      depositTransactionHash: "",
      fromDomainId: 0,
      toDomainId: 0,
      voteEvents: [],
      proposalEvents: [],
      timelineMessages: [],
      fromChain: undefined,
      toChain: undefined,
      pillColorStatus: { borderColor: "", background: "" },
    },
    timelineButtonClicked: false,
    chains,
  };

  const [explorerPageState, explorerPageDispatcher] = useReducer(
    transfersReducer,
    initState
  );

  const history = useHistory();

  const classes = useStyles();
  const [active, setActive] = useState(false);

  const handleOpenModal = (txId: string | undefined) => () => {
    const txDetail = transfers.find((tx) => tx.id === txId);

    explorerPageDispatcher({
      type: "setTransferDetails",
      payload: txDetail!,
    });
    setActive(true);
    setExplorerStateContext({
      ...explorerState,
      transferDetails: txDetail,
    });
    history.push(`/explorer/transaction/detail-view/${txDetail?.id}`);
  };

  const handleClose = () => {
    setActive(false);
    explorerPageDispatcher({
      type: "cleanTransferDetails",
    });
    history.push("/explorer/transaction/list");
  };

  const handleTimelineButtonClick = () =>
    explorerPageDispatcher({ type: "timelineButtonClick" });

  useEffect(() => {
    const {
      location: { href },
    } = window;

    const activeTx = transfers.find((item) => href.includes(item.id));

    if (activeTx !== undefined) {
      explorerPageDispatcher({
        type: "setTransferDetails",
        payload: activeTx,
      });
      setActive(true);
    }
  }, [transfers]);

  return (
    <Box sx={{ display: 'flex',justifyContent: 'center', flexWrap: 'wrap'}}>
      <section className={classes.mainContent}>
        <section className={classes.networkInfoContainer}>
          <div className={classes.networkInfo}>
            <div className={classes.networkSelection}>
              <Typography component="h5" variant="h5">
                Transfers on
              </Typography>
              <div className={classes.networkSelectorContainer}>
                <Select
                  className={classes.networkSelector}
                  onChange={(e: SelectChangeEvent) => {
                    console.log("e", e)
                    explorerPageDispatcher({
                      type: "selectNetwork",
                      payload: Number(e.target.value)
                    })
                  }}
                  value={explorerPageState.network.domainId.toString()}
                  placeholder="Select network"
                  disabled={!chains.length}
                >
                  {chains.map(({ domainId, name }) => (
                    <MenuItem key={domainId} value={domainId}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
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
              chains={chains}
              handleTimelineButtonClick={handleTimelineButtonClick}
              timelineButtonClicked={explorerPageState.timelineButtonClicked}
            />
            <div className={classes.paginationPanel}>
              <Button
                onClick={() =>
                  loadMore({
                    before: pageInfo?.startCursor,
                    last: "10",
                  })
                }
                className={classes.paginationButtons}
                disabled={!pageInfo?.hasPreviousPage || isLoading}
              >
                ← Previous
              </Button>
              <Button
                onClick={() =>
                  loadMore({
                    after: pageInfo?.endCursor,
                    first: "10",
                  })
                }
                className={classes.paginationButtons}
                disabled={!pageInfo?.hasNextPage || isLoading}
              >
                Next →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Box>
  );
};
export default ExplorerPage;
