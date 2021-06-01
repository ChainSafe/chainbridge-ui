import React, { useEffect, useState } from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import CustomModal from "../Components/Custom/CustomModal";
import {
  Button,
  ExclamationCircleInverseSvg,
  Typography,
  useLocation,
} from "@chainsafe/common-components";
import { useNetworkManager } from "../Contexts/NetworkManagerContext";
import { ROUTE_LINKS } from "../Components/Routes";
import { useHomeBridge } from "../Contexts/HomeBridgeContext";
import { chainbridgeConfig } from "../chainbridgeConfig";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      width: "100%",
    },
    inner: {
      width: "100% !important",
      maxWidth: "unset !important",
      borderRadius: "4px",
      display: "flex",
      flexDirection: "row",
      padding: `${constants.generalUnit * 6}px ${constants.generalUnit * 7}px`,
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
  const { homeChainConfig, networkId } = useNetworkManager();
  const { getNetworkName, wrapTokenConfig, isReady } = useHomeBridge();
  const { pathname } = useLocation();

  const [open, setOpen] = useState(false);
  const [supportedNetworks, setSupportedNetworks] = useState<number[]>([]);

  useEffect(() => {
    if (pathname === ROUTE_LINKS.Transfer) {
      setOpen(!homeChainConfig && !!isReady);
      setSupportedNetworks(
        chainbridgeConfig.chains
          .filter((bc) => bc.networkId !== undefined)
          .map((bc) => Number(bc.networkId))
      );
    } else if (pathname === ROUTE_LINKS.Wrap) {
      setOpen(!wrapTokenConfig && !!isReady);
      setSupportedNetworks(
        chainbridgeConfig.chains
          .filter((bc) => bc.networkId !== undefined)
          .filter((bc) => bc.tokens.find((t) => t.isNativeWrappedToken))
          .map((bc) => Number(bc.networkId))
      );
    } else {
      setOpen(false);
      setSupportedNetworks([]);
    }
  }, [pathname, setOpen, homeChainConfig, isReady, wrapTokenConfig]);

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
          {getNetworkName(networkId)}. Please change networks from within your
          browser wallet.
        </Typography>
        <br />
        <Typography component="p" variant="body1">
          This app is configured to work on{" "}
          {supportedNetworks.map(
            (n, i) =>
              `${getNetworkName(n)}${
                i < supportedNetworks.length - 1 ? ", " : ""
              }`
          )}{" "}
          networks
        </Typography>
        <section className={classes.buttons}>
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
      </section>
    </CustomModal>
  );
};

export default NetworkUnsupportedModal;
