import React from "react";

import { makeStyles, createStyles } from "@imploy/common-themes";
import CustomDrawer from "../Components/Custom/CustomDrawer";
import { Button, Typography } from "@imploy/common-components";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

interface ITransactionModalProps {
  open: boolean;
}

const TransactionModal: React.FC<ITransactionModalProps> = ({ open }) => {
  const classes = useStyles();

  return (
    <CustomDrawer open={open} className={classes.root}>
      <Typography variant="h1" component="h2">
        Pre-flight check
      </Typography>
      <Typography component="p">
        Please be advised this is an experimental application:
      </Typography>
      <ul>
        <li>
          You will not be able to cancel the transaction once you submit it.
        </li>
        <li>
          Your transaction could get stuck for an indefinite amount of time
        </li>
        <li>Funds cannot be returned if they are sent to the wrong address.</li>
        <li>The transaction fee may be higher than expected.</li>
      </ul>
      <Typography component="p">
        I agree and want to send 0.25 ETH from
        0xDC6fFC3f404D9dA507735c294f023373079D2B8b on Ethereum to
        0xE6D5C52Cf47B7cDD4b3443D046AB16D249149219 on Celo.
      </Typography>
      <Button fullsize>Start Transfer</Button>
      <Button>Back</Button>
    </CustomDrawer>
  );
};

export default TransactionModal;
