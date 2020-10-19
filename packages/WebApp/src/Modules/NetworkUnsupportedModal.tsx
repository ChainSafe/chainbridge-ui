import React from "react";

import { makeStyles, ITheme, createStyles } from "@imploy/common-themes";
import CustomModal from "../Components/Custom/CustomModal";
import { Button, Typography } from "@imploy/common-components";

const useStyles = makeStyles(
  ({ palette, constants, typography, breakpoints }: ITheme) =>
    createStyles({
      root: {},
    })
);

interface INetworkUnsupportedModalProps {
  active: boolean;
}

const NetworkUnsupportedModal: React.FC<INetworkUnsupportedModalProps> = ({
  active,
}) => {
  const classes = useStyles();

  return (
    <CustomModal className={classes.root} active={active}>
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
