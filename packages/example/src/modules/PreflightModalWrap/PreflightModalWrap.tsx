import React from "react";
import { CustomDrawer } from "../../components";
import { Button, Typography } from "@chainsafe/common-components";
import { useStyles } from "./styles";

interface IPreflightModalWrapProps {
  open: boolean;
  close: () => void;
  sender: string;
  value: number;
  tokenSymbol: string;
  sourceNetwork: string;
  start: () => void;
  wrappedTitle: string;
  action: "wrap" | "unwrap";
}

const PreflightModalWrap: React.FC<IPreflightModalWrapProps> = ({
  open,
  close,
  sender,
  sourceNetwork,
  tokenSymbol,
  value,
  start,
  wrappedTitle,
  action,
}: IPreflightModalWrapProps) => {
  const classes = useStyles();

  return (
    <CustomDrawer
      classNames={{
        backdrop: classes.backdrop,
      }}
      size={430}
      open={open}
      className={classes.root}
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
        I agree and want to convert{" "}
        <strong>
          {value} {tokenSymbol}
        </strong>{" "}
        on <strong>{sourceNetwork}</strong> to&nbsp;
        <strong>{wrappedTitle}</strong>
      </Typography>
      <Button onClick={start} className={classes.startButton} fullsize>
        Convert to {action === "wrap" ? "Wrapped" : "Native"} Token
      </Button>
      <Button onClick={close}>Back</Button>
    </CustomDrawer>
  );
};

export default PreflightModalWrap;
