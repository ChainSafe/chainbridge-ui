import React, { useState, useReducer, useEffect } from "react";
import {
  SelectInput,
  TextInput,
  Typography,
  SearchIcon,
  Grid,
  useHistory,
  Button,
} from "@chainsafe/common-components";
import { ExplorerTable } from "../../components";
import { useExplorer } from "../../contexts";
import {
  ExplorerPageState,
  transfersReducer,
} from "../../reducers/TransfersReducer";
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

  const { redirect } = useHistory();

  const classes = useStyles();
  const [active, setActive] = useState(false);

  const renderOptions = () => {
    return chains.map(({ domainId, name }) => ({
      label: name,
      value: domainId,
    }));
  };

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
    redirect(`/explorer/transaction/detail-view/${txDetail?.id}`);
  };

  const handleClose = () => {
    setActive(false);
    explorerPageDispatcher({
      type: "cleanTransferDetails",
    });
    redirect("/explorer/transaction/list");
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
    </Grid>
  );
};
export default ExplorerPage;
