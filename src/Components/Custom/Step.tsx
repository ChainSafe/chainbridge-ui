import React from "react";

import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { CircularProgress } from "@material-ui/core";
import { NavLink, Typography } from "@chainsafe/common-components";
import ExclamationCircleSvg from "./../../media/Icons/exclamation-mark-icon.png";
import { styles } from "../../Constants/constants";

type Status = "none" | "progress" | "done" | "aborted";

const useStyles = makeStyles<ITheme, { status: Status }>(
  ({ constants, typography, palette }: ITheme) =>
    createStyles({
      stepIndicator: {
        ...typography.h4,
        height: 40,
        width: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        background: ({ status }) =>
          status === "done" || status === "aborted"
            ? "linear-gradient(105.79deg, #A700E1 1.84%, #0024E2 102.94%)"
            : palette.additional["gray"][5],
        "& svg": {
          height: 20,
          width: 20,
          display: "block",
        },
      },
      step: {
        display: "flex",
        alignContent: "center",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: constants.generalUnit * 3,
        marginBottom: constants.generalUnit * 2,
      },
      exclamation: {
        height: constants.generalUnit * 3.75,
        width: constants.generalUnit * 3.75,
      },
      linkText: {
        color: styles.primaryTextColor,
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "bold",
        marginLeft: constants.generalUnit * 1.5,
        textDecoration: "underline",
      },
      linkLoadingText: {
        marginLeft: constants.generalUnit * 1.5,
      },
      title: {
        marginLeft: constants.generalUnit * 1.5,
      },
      status: {
        marginLeft: "auto",
        marginRight: constants.generalUnit * 1.5,
      },
    })
);

interface IStepProps {
  stepNumber?: number;
  title: string;
  status: Status;
  stepLink?: {
    url: string;
    text: string;
    loadingText?: string | undefined;
  };
}

const Step: React.FC<IStepProps> = ({
  stepNumber,
  title,
  status,
  stepLink,
}: IStepProps) => {
  const classes = useStyles({ status });
  return (
    <div className={classes.step}>
      <div className={classes.stepIndicator}>
        {stepNumber || (
          <img
            src={ExclamationCircleSvg}
            alt="Exclamation"
            className={classes.exclamation}
          />
        )}
      </div>
      <div>
        <Typography className={classes.title} variant="h4" component="h4">
          {title}
        </Typography>
        {stepLink ? (
          stepLink.loadingText && status === "done" ? (
            <div className={classes.linkLoadingText}>
              {stepLink.loadingText}
            </div>
          ) : status !== "done" ? null : (
            <NavLink
              className={classes.linkText}
              to={{ pathname: stepLink.url }}
              target="_blank"
            >
              {stepLink.text}
            </NavLink>
          )
        ) : null}
      </div>
      {status === "progress" ? (
        <CircularProgress className={classes.status} />
      ) : status === "done" ? (
        <CheckCircleIcon
          className={classes.status}
          color="primary"
          fontSize="large"
        />
      ) : null}
    </div>
  );
};

export default Step;
