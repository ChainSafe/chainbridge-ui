import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import CustomDrawer from "../Components/Custom/CustomDrawer";
import { Button, Typography } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";
import { mergeClasses } from "@material-ui/styles";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) =>
  createStyles({
    root: {
      zIndex: zIndex?.blocker,
      backgroundColor: "white !important",
      font: "Sora, sans-serif",
      position: "absolute",
    },
    subtitle: {
      margin: `${constants.generalUnit * 2}px 0`,
    },
    agreement: {
      margin: `${constants.generalUnit * 2}px 0`,
    },
    startButton: {
      color: "white",
      marginBottom: constants.generalUnit * 2,
      background: "linear-gradient(105.79deg, #A700E1 1.84%, #0024E2 102.94%)",
      "&:hover": {
        color: "white",
      },
    },
    backdrop: {
      position: "absolute",
      zIndex: zIndex?.layer4,
    },
    title: {
      fontSize: 20,
      fontStyle: "normal",
      fontWeight: "bold",
      textAlign: "center",
      color: "#000000",
      marginTop: 30,
    },
    messageBlock: {
      margin: "50px 15px",
      fontSize: "14px",
      color: "#717171",
      "& li": {
        display: "list-item",
        listStyleType: "disc",
      },
    },
    backButtonDiv: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      color: "#5C4DCF",
      "&:hover": {
        color: "white",
      },
    },
    backButton: {
      color: "#5C4DCF",
      background: "white",
      border: "none",
      "&:hover": {
        color: "#5C4DCF",
      },
      marginTop: 20,
    },
    agreementBlock: {
      marginTop: 50,
      marginBottom: 50,
      color: "#000000",
    },
  })
);

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
      size={450}
      open={open}
    >
      <div className={classes.title}>Pre-flight check</div>
      <div className={classes.messageBlock}>
        <ul>
          <li>
            You will not be able to cancel the transaction once you submit it.
          </li>
          <li>
            Funds cannot be returned if they are sent to the wrong address.
          </li>
          <li>The transaction fee may be higher than expected.</li>
        </ul>
      </div>
      <div className={classes.agreementBlock}>
        <Typography variant="h5" component="p">
          I agree and want to send <strong>1 CERE</strong> from&nbsp;
          <strong>
            {shortenAddress("0xcfe7CCA69B9B18FA630fD90919559f723b15a449")}
          </strong>{" "}
          on <strong>{sourceNetwork}</strong> to&nbsp;
          <strong>
            {shortenAddress("5DiGokL5Uz8tDvY5Ez3BiSL5PnPjVXz738xxwry4QzPhVCLY")}
          </strong>{" "}
          on <strong>Cere Mainnet</strong>.
        </Typography>
      </div>
      <div>
        <Button onClick={start} className={classes.startButton} fullsize>
          Start Transfer
        </Button>
      </div>
      <div className={classes.backButtonDiv}>
        <Button className={classes.backButton} onClick={close}>
          Back
        </Button>
      </div>
    </CustomDrawer>
  );
};

export default PreflightModalTransfer;
