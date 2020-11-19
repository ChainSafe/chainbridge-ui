import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import CustomDrawer from "../Components/Custom/CustomDrawer";
import { Button, Typography } from "@chainsafe/common-components";
import { useWeb3 } from "@chainsafe/web3-context";

const useStyles = makeStyles(({ constants }: ITheme) =>
  createStyles({
    root: {},
    buttons: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      "& > *": {
        marginTop: constants.generalUnit * 2,
        marginRight: constants.generalUnit,
        textDecoration: "none",
      },
    },
    paragraph: {
      margin: `${constants.generalUnit * 3}px 0`,
    },
  })
);

interface IChangeNetworkDrawerProps {
  open: boolean;
  close: () => void;
}

const ChangeNetworkDrawer: React.FC<IChangeNetworkDrawerProps> = ({
  open,
  close,
}) => {
  const classes = useStyles();

  const { checkIsReady, onboard } = useWeb3();

  const handleConnect = async () => {
    await onboard?.walletSelect();
    await checkIsReady();
  };

  return (
    <CustomDrawer open={open} className={classes.root}>
      <Typography variant="h3" component="h2">
        Changing Networks
      </Typography>
      <Typography className={classes.paragraph} component="p" variant="h5">
        To change networks, please open your browser wallet and change networks
        there. If your wallet does not support your desired home network, please
        connect a different wallet. <br />
        <br />
        Note: your transfer settings will be reset.
      </Typography>
      <section className={classes.buttons}>
        <Button onClick={close} variant="outline">
          OK
        </Button>
        <Button
          onClick={() => {
            handleConnect();
          }}
          variant="outline"
        >
          Connect different wallet
        </Button>
        <a
          rel="noopener noreferrer"
          href="https://discord.com/invite/n2U6x9c"
          target="_blank"
        >
          <Button variant="outline">Ask a question on Discord</Button>
        </a>
      </section>
    </CustomDrawer>
  );
};

export default ChangeNetworkDrawer;
