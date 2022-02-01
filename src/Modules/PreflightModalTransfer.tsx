import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import CustomDrawer from "../Components/Custom/CustomDrawer";
import { Button, Typography } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";
import styles from "../Constants/constants";

const arialFont = "Arial, sans-serif";

const useStyles = makeStyles(({ constants, palette, zIndex }: ITheme) =>
  createStyles({
    root: {
      zIndex: zIndex?.blocker,
      backgroundColor: "white !important",
      font: styles.primaryFont,
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
      border: "none",
      borderRadius: 5,
      fontWeight: "bold",
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
      color: "black",
      marginTop: constants.generalUnit * 3.75,
    },
    messageBlock: {
      fontFamily: arialFont,
      lineHeight: `${constants.generalUnit * 2.5}px`,
      margin: `${constants.generalUnit * 6.25}px ${
        constants.generalUnit * 1.875
      }px`,
      fontSize: 14,
      color: styles.greyColor,
      "& li": {
        display: "list-item",
        listStyleType: "disc",
        marginBottom: constants.generalUnit * 2,
      },
    },
    backButtonDiv: {
      display: "flex",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      color: styles.primaryTextColor,
      "&:hover": {
        color: "white",
      },
    },
    backButton: {
      fontFamily: styles.secondaryFont,
      color: styles.primaryTextColor,
      fontWeight: "bold",
      background: "white",
      border: "none",
      "&:hover": {
        color: styles.primaryTextColor,
      },
      marginTop: constants.generalUnit,
    },
    agreementBlock: {
      fontFamily: arialFont,
      marginTop: constants.generalUnit * 6.25,
      marginBottom: constants.generalUnit * 6.25,
      color: "black",
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
      size={460}
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
