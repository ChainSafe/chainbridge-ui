import React, { useEffect, useState } from "react";
import { CustomModal } from "../../components";
import {
  Button,
  ExclamationCircleInverseSvg,
  Typography,
} from "@chainsafe/common-components";
import { useLocation } from "react-router-dom";
import {
  useNetworkManager,
  useHomeBridge,
  chainbridgeConfig,
  useWeb3
} from "@chainsafe/chainbridge-ui-core";
import { useStyles } from "./styles";

const NetworkUnsupportedModal = () => {
  const classes = useStyles();
  const { homeChainConfig } = useWeb3();
  const { getNetworkName, wrapTokenConfig, isReady, networkId } =
    useHomeBridge();
  const pathname = '/transfer';

  const [open, setOpen] = useState(false);
  const [supportedNetworks, setSupportedNetworks] = useState<number[]>([]);

  useEffect(() => {
    if (pathname) {
      setOpen(!homeChainConfig && !!isReady);
      setSupportedNetworks(
        chainbridgeConfig().chains
          .filter((bc) => bc.networkId !== undefined)
          .map((bc) => Number(bc.networkId))
      );
    } else {
      setOpen(false);
      setSupportedNetworks([]);
    }
  }, [pathname, setOpen, homeChainConfig, isReady]);

  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={open}
      closePosition="none"
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
