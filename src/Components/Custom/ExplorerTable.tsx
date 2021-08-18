import React from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableHeadCell,
} from "@chainsafe/common-components";

const ExplorerTable: React.FC = (props) => (
  <Table>
    <TableHead>
      <TableHeadCell>Date</TableHeadCell>
      <TableHeadCell>From</TableHeadCell>
      <TableHeadCell>Transfer</TableHeadCell>
      <TableHeadCell>Value</TableHeadCell>
      <TableHeadCell></TableHeadCell>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell>Jan 27, 10:13pm</TableCell>
        <TableCell>0x93b1...3k2a</TableCell>
        <TableCell>Goerli to Celo</TableCell>
        <TableCell>144,435,150.12 DAI</TableCell>
        <TableCell>View details</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

export default ExplorerTable;
