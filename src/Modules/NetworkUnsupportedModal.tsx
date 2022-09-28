import React, { useEffect, useState } from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import CustomModal from "../Components/Custom/CustomModal";
import {
  ExclamationCircleInverseSvg,
  Typography,
  useLocation,
} from "@chainsafe/common-components";
import { useNetworkManager } from "../Contexts/NetworkManagerContext";
import { ROUTE_LINKS } from "../Components/Routes";
import { chainbridgeConfig } from "../chainbridgeConfig";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      width: "100%",
    },
    inner: {
      width: "100% !important",
      maxWidth: "unset !important",
      borderRadius: 5,
      display: "flex",
      flexDirection: "row",
      padding: `${constants.generalUnit * 3}px ${constants.generalUnit * 3}px`,
    },
    heading: {
      marginBottom: constants.generalUnit,
    },
    icon: {
      height: 20,
      width: 20,
      marginTop: constants.generalUnit * 0.8,
      marginRight: constants.generalUnit * 2,
      fill: palette.additional["gray"][7],
    },
    buttons: {
      display: "flex",
      flexDirection: "row",
      marginTop: constants.generalUnit * 5,
      "& > *": {
        textDecoration: "none",
        marginRight: constants.generalUnit,
      },
    },
    button: {
      borderColor: palette.additional["gray"][8],
      color: palette.additional["gray"][8],
      "&:hover": {
        borderColor: palette.additional["gray"][8],
        backgroundColor: palette.additional["gray"][8],
        color: palette.common.white.main,
      },
    },
  })
);

const NetworkUnsupportedModal = () => {
  const classes = useStyles();
  const { networkId, networkSupported, getNetworkName } = useNetworkManager();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const ethereumNetworkIds = [1, 5, 137, 80001];
  const [supportedEthereumNetworks, setSupportedEthereumNetworks] = useState<
    string
  >("");

  useEffect(() => {
    if (pathname === ROUTE_LINKS.Transfer) {
      setOpen(!!networkId && !networkSupported);
      const supportedNetworks = 
        chainbridgeConfig.chains
          .filter((bc) => bc.networkId !== undefined)
          .map((bc) => Number(bc.networkId));
      let hasOneEthereumNetwork = false;
      let ethereumNetworks = "";
      for (let i = 0; i < supportedNetworks.length; i++) {
        if (ethereumNetworkIds.includes(supportedNetworks[i])) {
          if (hasOneEthereumNetwork) {
            ethereumNetworks += ", ";
          }
          ethereumNetworks += getNetworkName(supportedNetworks[i]);
          hasOneEthereumNetwork = true;
        }
      }
      setSupportedEthereumNetworks(ethereumNetworks);
    } else {
      setOpen(false);
    }
  }, [
    pathname,
    networkSupported,
    networkId,
    getNetworkName,
  ]);

  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={open}
    >
      <section>
        <ExclamationCircleInverseSvg className={classes.icon} />
      </section>
      <section>
        <Typography className={classes.heading} variant="h3" component="h3">
          Network Unsupported
        </Typography>
        <Typography component="p" variant="body1">
          This app does not currently support transfers on{" "}
          {getNetworkName(networkId)}. Please, change network from within your
          wallet.
        </Typography>
        <br />
        <Typography component="p" variant="body1">
          Please change to {supportedEthereumNetworks} network(s).
        </Typography>
      </section>
    </CustomModal>
  );
};

export default NetworkUnsupportedModal;
