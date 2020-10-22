import React from "react";

import { makeStyles, createStyles } from "@imploy/common-themes";
import CustomDrawer from "../Components/Custom/CustomDrawer";
import { Button, Typography } from "@imploy/common-components";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

interface IChangeNetworkDrawerProps {
  open: boolean;
  close: () => void;
}

const ChangeNetworkDrawer: React.FC<IChangeNetworkDrawerProps> = ({ open }) => {
  const classes = useStyles();

  return (
    <CustomDrawer open={open} className={classes.root}>
      <Typography variant="h1" component="h2">
        Changing Networks
      </Typography>
      <Typography component="p">
        To change networks, please open your browser wallet and change networks
        there. If your wallet does not support your desired home network, please
        connect a different wallet. <br />
        <br />
        Note: your transfer settings will be reset.
      </Typography>
      <section>
        <Button>OK</Button>
        <Button>Connect different wallet</Button>
        <Button>Ask a question on Discord</Button>
      </section>
    </CustomDrawer>
  );
};

export default ChangeNetworkDrawer;
