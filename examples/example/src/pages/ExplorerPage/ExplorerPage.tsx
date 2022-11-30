import React, { useState, useReducer, useEffect } from "react";

import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

import { useExplorer, useChainbridge } from "@chainsafe/chainbridge-ui-core";
import { ExplorerTable } from "../../components";
import MyAllSwitch from "./MyAllSwitch";
import SelectNetwork from "./SelectNetwork";

import { useStyles } from "./styles";

type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const ExplorerPage = () => {
  const explorerContext = useExplorer();
  const {
    explorerState,
    loadMore,
    setExplorerStateContext,
    explorerPageState,
    explorerPageDispatcher,
  } = explorerContext;
  const { chains, transfers, pageInfo, isLoading } = explorerState;

  const history = useHistory();

  const classes = useStyles();
  const [active, setActive] = useState(false);
  const [myAllSwitchValue, setMyAllSwitchValue] = useState("all");

  const { isReady, address } = useChainbridge();
  useEffect(() => {
    if (isReady) {
      setMyAllSwitchValue("my");
    }
  }, [isReady, address]);

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
    <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
      <section className={classes.mainContent}>
        <section className={classes.networkInfoContainer}>
          <div className={classes.networkInfo}>
            <div className={classes.networkSelection}>
              <Typography
                component="h5"
                variant="h5"
                noWrap
                sx={{ flexShrink: 0 }}
              >
                Transfers from
              </Typography>
              <SelectNetwork
                className={classes.networkSelector}
                onChange={(val: number) => {
                  explorerPageDispatcher({
                    type: "selectFromDomainId",
                    payload: val,
                  });
                }}
                chains={chains}
                value={explorerPageState.fromDomainId?.toString() ?? ""}
              />
              <Typography
                component="h5"
                variant="h5"
                sx={{ marginLeft: "15px" }}
              >
                to
              </Typography>
              <SelectNetwork
                className={classes.networkSelector}
                onChange={(val: number) => {
                  explorerPageDispatcher({
                    type: "selectToDomainId",
                    payload: val,
                  });
                }}
                chains={chains}
                value={explorerPageState.toDomainId?.toString() ?? ""}
              />
            </div>
          </div>
          <Box sx={{ display: "grid", gridRow: "1", width: "50ch" }}>
            <TextField
              placeholder="Search by deposit hash"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={explorerPageState.depositTransactionHash}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                explorerPageDispatcher({
                  type: "setDepositTransactionHash",
                  payload: e.target.value,
                });
              }}
            />
          </Box>
          {isReady && address && (
            <Box
              sx={{
                ml: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <MyAllSwitch
                switchValue={myAllSwitchValue}
                onSwitchChange={(e: any, newSwitchValue: string) => {
                  setMyAllSwitchValue(newSwitchValue);
                  explorerPageDispatcher({
                    type: "setMyAddress",
                    payload: newSwitchValue === "my" ? address : "",
                  });
                }}
              />
            </Box>
          )}
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
