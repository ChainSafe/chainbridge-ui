import React from "react";

import { makeStyles, createStyles } from "@imploy/common-themes";
import CustomDrawer from "../Components/Custom/CustomDrawer";
import { Button, Typography } from "@imploy/common-components";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

interface IAboutDrawerProps {
  open: boolean;
  close: () => void;
}

const AboutDrawer: React.FC<IAboutDrawerProps> = ({
  open,
  close,
}: IAboutDrawerProps) => {
  const classes = useStyles();

  return (
    <CustomDrawer onClose={close} open={open} className={classes.root}>
      <Typography variant="h1" component="h1">
        What is ChainBridge?
      </Typography>
      <Typography component="p">
        ChainBridge is a modular multi-directional blockchain bridge to allow
        data and value transfer between any number of blockchains. This should
        enable users to specify a destination blockchain from their source
        chain, and send data to that blockchain for consumption on the
        destination chain. <br />
        <br />
        This could be a token that is locked on ChainA and redeemed on ChainB,
        or an operation that is executed on a destination chain and initiated on
        the source chain.
      </Typography>
      <section>
        <Button>OK</Button>
        <Button>Ask a question on Discord</Button>
      </section>
    </CustomDrawer>
  );
};

export default AboutDrawer;
