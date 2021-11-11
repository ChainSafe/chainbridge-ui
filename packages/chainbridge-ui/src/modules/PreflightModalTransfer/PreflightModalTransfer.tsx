import React from "react";
import { CustomDrawer } from "../../components";
import { Button, Typography } from "@chainsafe/common-components";
import { shortenAddress } from "../../utils/Helpers";
import { useStyles } from "./styles";

interface IPreflightModalTransferProps {
  open: boolean;
  close: () => void;
  sender: string;
  receiver: string;
  value: number;
  tokenSymbol: string;
  sourceNetwork: string;
  targetNetwork: string;
  start: () => void;
}

const PreflightModalTransfer: React.FC<IPreflightModalTransferProps> = ({
  open,
  close,
  receiver,
  sender,
  sourceNetwork,
  targetNetwork,
  tokenSymbol,
  value,
  start,
}: IPreflightModalTransferProps) => {
  const classes = useStyles();

  return (
    <CustomDrawer
      className={classes.root}
      classNames={{
        backdrop: classes.backdrop,
      }}
      size={430}
      open={open}
    >
      <Typography variant="h3" component="h2">
        Pre-flight check
      </Typography>
      <Typography className={classes.subtitle} variant="h5" component="p">
        Please be advised this is an experimental application:
      </Typography>
      <ul>
        <li>
          <Typography variant="h5">
            You will not be able to cancel the transaction once you submit it.
          </Typography>
        </li>
        <li>
          <Typography variant="h5">
            Your transaction could get stuck for an indefinite amount of time
          </Typography>
        </li>
        <li>
          <Typography variant="h5">
            Funds cannot be returned if they are sent to the wrong address.
          </Typography>
        </li>
        <li>
          <Typography variant="h5">
            The transaction fee may be higher than expected.
          </Typography>
        </li>
      </ul>
      <Typography className={classes.agreement} variant="h5" component="p">
        I agree and want to send{" "}
        <strong>
          {value} {tokenSymbol}
        </strong>{" "}
        from&nbsp;
        <strong>{shortenAddress(sender)}</strong> on{" "}
        <strong>{sourceNetwork}</strong> to&nbsp;
        <strong>{shortenAddress(receiver)}</strong> on{" "}
        <strong>{targetNetwork}</strong>.
      </Typography>
      <Button onClick={start} className={classes.startButton} fullsize>
        Start Transfer
      </Button>
      <Button onClick={close}>Back</Button>
    </CustomDrawer>
  );
};

export default PreflightModalTransfer;
