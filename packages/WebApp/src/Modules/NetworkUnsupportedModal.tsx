import React from "react";

import { makeStyles, createStyles } from "@imploy/common-themes";
import CustomModal from "../Components/Custom/CustomModal";
import { Button, Typography } from "@imploy/common-components";

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

interface INetworkUnsupportedModalProps {
  open: boolean;
}

const NetworkUnsupportedModal: React.FC<INetworkUnsupportedModalProps> = ({
  open,
}) => {
  const classes = useStyles();

  return (
    <CustomModal className={classes.root} active={open}>
      <section>Icon</section>
      <section>
        <Typography>Network Unsupported</Typography>
        <Typography>
          This app does not currently support transfers on NETWORK. Please
          change networks from within your browser wallet.
        </Typography>
        <section>
          <Button>OK</Button>
          <Button>Ask a question on Discord</Button>
        </section>
      </section>
    </CustomModal>
  );
};

export default NetworkUnsupportedModal;
