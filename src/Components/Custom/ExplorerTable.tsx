import React from "react";
import { makeStyles, createStyles } from "@chainsafe/common-theme";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableHeadCell,
  SvgIcon,
} from "@chainsafe/common-components";
import { DepositRecord } from "../../Contexts/Reducers/TransfersReducer";
import { getIcon, getTokenIcon } from "../../Utils/Helpers";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "table",
    },
    row: {
      verticalAlign: "middle",
      "& > td:nth-child(1)": {
        paddingLeft: 26,
        textAlign: "left",
      },
      "& > td": {
        textAlign: "left",
        "& > div": {
          display: "flex",
          "& > span:nth-child(1)": {
            marginRight: 3,
          },
          "& > span": {
            display: "flex",
            alignItems: "center",
            "& > span": {
              marginLeft: 2,
            },
          },
        },
        "& > div > span > svg": {
          height: 21,
          width: 21,
        },
      },
    },
    elipsisIcon: {
      borderRadius: "50%",
    },
    accountAddress: {
      display: "flex",
    },
    cellRow: {
      verticalAlign: "middle",
    },
    tokenIcon: {
      height: 14,
      width: 14,
    },
    amountInfo: {
      display: "flex",
      alignItems: "center",
    },
  })
);

// TODO: just for mocking purposes
type ExplorerTable = {
  transactionList: DepositRecord[];
};

const ExplorerTable: React.FC<ExplorerTable> = ({ transactionList }) => {
  const classes = useStyles();

  const renderTransferList = (transferData: DepositRecord[]) =>
    transferData.map((transfer: DepositRecord, idx: number) => {
      const FromChainIcon = getIcon(transfer.fromChainId);
      const ToChainIcon = getIcon(transfer.toChainId);
      const TokenIcon = getTokenIcon();

      return (
        <TableRow className={classes.row} key={transfer.fromAddress}>
          <TableCell className={classes.cellRow}>
            {transfer.timestamp}
          </TableCell>
          <TableCell>
            <div className={classes.accountAddress}>
              <span>{transfer.fromAddress}</span>
            </div>
          </TableCell>
          <TableCell className={classes.row}>
            <div>
              <span>
                <SvgIcon>
                  <FromChainIcon />
                </SvgIcon>
                <span>{transfer.fromNetworkName} to</span>
              </span>
              <span>
                <SvgIcon>
                  <ToChainIcon />
                </SvgIcon>{" "}
                <span>{transfer.toNetworkName}</span>
              </span>
            </div>
          </TableCell>
          <TableCell className={classes.row}>
            <span className={classes.amountInfo}>
              <SvgIcon>
                <TokenIcon className={classes.tokenIcon} />
              </SvgIcon>
              <span>{transfer.amount?.toString()}</span>
            </span>
          </TableCell>
          <TableCell>
            <span>View Details</span>
          </TableCell>
        </TableRow>
      );
    });

  return (
    <Table fullWidth={true} className={classes.root}>
      <TableHead>
        <TableRow className={classes.row}>
          <TableHeadCell>Date</TableHeadCell>
          <TableHeadCell>From</TableHeadCell>
          <TableHeadCell>Transfer</TableHeadCell>
          <TableHeadCell>Value</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>{renderTransferList(transactionList)}</TableBody>
    </Table>
  );
};

export default ExplorerTable;
