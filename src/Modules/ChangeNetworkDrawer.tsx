import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import CustomDrawer from "../Components/Custom/CustomDrawer";
import { Button, Typography } from "@chainsafe/common-components";
import { useNetworkManager } from "../Contexts/NetworkManagerContext";

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

  const { setWalletType } = useNetworkManager();

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
            setWalletType("select");
          }}
          variant="outline"
        >
          Connect different wallet
        </Button>
        <a
          rel="noopener noreferrer"
          href={process.env.REACT_APP_SUPPORT_URL}
          target="_blank"
        >
          <Button variant="outline">
            Ask a question on {process.env.REACT_APP_SUPPORT_SERVICE}
          </Button>
        </a>
      </section>
    </CustomDrawer>
  );
};

export default ChangeNetworkDrawer;
