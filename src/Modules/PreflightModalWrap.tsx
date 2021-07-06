import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import CustomDrawer from "../Components/Custom/CustomDrawer";
import { Button, Typography } from "@chainsafe/common-components";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) =>
  createStyles({
    root: {
      position: "absolute",
      zIndex: zIndex?.blocker,
      "& li": {
        position: "relative",
        padding: `${constants.generalUnit}px 0 ${constants.generalUnit}px ${
          constants.generalUnit * 8
        }px`,
        "&:before": {
          content: "''",
          display: "block",
          backgroundColor: palette.additional["gray"][2],
          height: constants.generalUnit,
          width: constants.generalUnit,
          borderRadius: "50%",
          position: "absolute",
          top: "50%",
          left: constants.generalUnit * 4,
          transform: "translate(-50%, -50%)",
        },
      },
    },
    subtitle: {
      margin: `${constants.generalUnit * 2}px 0`,
    },
    agreement: {
      margin: `${constants.generalUnit * 2}px 0`,
    },
    startButton: {
      backgroundColor: palette.additional["preflight"][1],
      color: palette.additional["preflight"][2],
      marginBottom: constants.generalUnit * 2,
    },
    backdrop: {
      position: "absolute",
      zIndex: zIndex?.layer4,
    },
  })
);

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
