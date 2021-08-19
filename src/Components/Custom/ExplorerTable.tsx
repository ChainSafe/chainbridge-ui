import React from "react";
import { makeStyles, createStyles } from "@chainsafe/common-theme";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableHeadCell,
} from "@chainsafe/common-components";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "table",
    },
    row: {
      "& > td:nth-child(1)": {
        paddingLeft: 26,
        textAlign: "left",
      },
      "& > td": {
        textAlign: "left",
      },
    },
  })
);

const ExplorerTable: React.FC = () => {
  const classes = useStyles();
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
      <TableBody>
        <TableRow className={classes.row}>
          <TableCell>Jan 27, 10:13pm</TableCell>
          <TableCell>0x93b1...3k2a</TableCell>
          <TableCell>Goerli to Celo</TableCell>
          <TableCell>144,435,150.12 DAI</TableCell>
          <TableCell>View details</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ExplorerTable;
