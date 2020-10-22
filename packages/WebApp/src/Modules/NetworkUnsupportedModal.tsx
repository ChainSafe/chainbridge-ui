import React from "react";

import { makeStyles, createStyles, ITheme } from "@imploy/common-themes";
import CustomModal from "../Components/Custom/CustomModal";
import {
  Button,
  ExclamationCircleSvg,
  Typography,
} from "@imploy/common-components";

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
    icon: {
      height: 20,
      width: 20,
      marginTop: constants.generalUnit / 2,
      marginRight: constants.generalUnit * 2,
      fill: palette.additional["gray"][7],
    },
  })
);

interface INetworkUnsupportedModalProps {
  open: boolean;
  close: () => void;
  network: string;
}

const NetworkUnsupportedModal: React.FC<INetworkUnsupportedModalProps> = ({
  open,
  close,
}) => {
  const classes = useStyles();

  return (
    <CustomModal
      className={classes.root}
      injectedClass={{
        inner: classes.inner,
      }}
      active={open}
    >
      <section>
        <ExclamationCircleSvg className={classes.icon} />
      </section>
      <section>
        <Typography variant="h3" component="h3">
          Network Unsupported
        </Typography>
        <Typography component="p" variant="body1">
          This app does not currently support transfers on NETWORK. Please
          change networks from within your browser wallet.
        </Typography>
        <section>
          <Button variant="outline">OK</Button>
          <Button variant="outline">Ask a question on Discord</Button>
        </section>
      </section>
    </CustomModal>
  );
};

export default NetworkUnsupportedModal;
