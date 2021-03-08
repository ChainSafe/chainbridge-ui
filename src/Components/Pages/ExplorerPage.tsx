import React from "react";
import { makeStyles, createStyles, ITheme } from "@chainsafe/common-theme";

const useStyles = makeStyles(({ constants, palette }: ITheme) =>
  createStyles({
    root: {
      padding: constants.generalUnit * 6,
      position: "relative",
    },
  })
);

type PreflightDetails = {
  tokenAmount: number;
  token: string;
  tokenSymbol: string;
  receiver: string;
};

const ExplorerPage = () => {
  const classes = useStyles();

  return <article className={classes.root}>Explorer</article>;
};
export default ExplorerPage;
