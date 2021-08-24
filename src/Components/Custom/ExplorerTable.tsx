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
  Button,
  Avatar,
  Blockies,
} from "@chainsafe/common-components";
import dayjs from "dayjs";
import { DepositRecord } from "../../Contexts/Reducers/TransfersReducer";
import { getIcon, getTokenIcon, shortenAddress } from "../../Utils/Helpers";
import { ReactComponent as DirectionalIcon } from "../../media/Icons/directional.svg";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "table",
      width: "100%",
      "& > thead > tr": {
        fontSize: 16,
        fontWeight: 600,
      },
    },
    row: {
      fontWeight: 400,
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
        "& > div > span > svg:last-child": {
          height: "14.44px",
          width: "14.44px",
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
    viewDetailsInfo: {
      "& > button": {
        background: "none",
        color: "black",
        border: "none",
        padding: "0 !important",
        textDecoration: "underline",
      },
    },
    avatar: {
      marginRight: 6,
    },
  })
);

// TODO: just for mocking purposes
type ExplorerTable = {
  transactionList: DepositRecord[];
};

const ExplorerTable: React.FC<ExplorerTable> = ({
  transactionList,
}: ExplorerTable) => {
  const classes = useStyles();

  const renderTransferList = (transferData: DepositRecord[]) =>
    transferData.map((transfer: DepositRecord, idx: number) => {
      const fromAddressShortened = shortenAddress(transfer.fromAddress ?? "");

      const FromChainIcon = getIcon(transfer.fromChainId);
      const ToChainIcon = getIcon(transfer.toChainId);
      const TokenIcon = getTokenIcon();

      // Seed some random string for the Blockies component
      const arr = new Uint8Array(20);
      const randomValues = crypto.getRandomValues(arr);
      const randomString = Array.from(randomValues, (val) =>
        val.toString(16).padStart(2, "0")
      ).join("");

      const transferDateFormated = dayjs(transfer.timestamp).format(
        "MMM D, h:mmA"
      );

      const amount = transfer.amount?.toNumber();
      const formatedAmount = Intl.NumberFormat("es-US").format(amount ?? 0);

      return (
        <TableRow className={classes.row} key={transfer.fromAddress}>
          <TableCell className={classes.cellRow}>
            {transferDateFormated}
          </TableCell>
          <TableCell>
            <div className={classes.accountAddress}>
              <Avatar size="small" className={classes.avatar}>
                <Blockies
                  seed={randomString}
                  size={15}
                  color={"pink"}
                  bgColor={"white"}
                />
              </Avatar>
              <span>{fromAddressShortened}</span>
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
              <span>{formatedAmount} ETH</span>
            </span>
          </TableCell>
          <TableCell className={classes.row}>
            <div className={classes.viewDetailsInfo}>
              <SvgIcon>
                <DirectionalIcon />
              </SvgIcon>
              <Button>View Details</Button>
            </div>
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
