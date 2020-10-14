import React from "react";

import { makeStyles, ITheme, createStyles } from "@imploy/common-themes";

const useStyles = makeStyles(
  ({ palette, constants, typography, breakpoints }: ITheme) =>
    createStyles({
      root: {},
    })
);

const MainPage = () => {
  const classes = useStyles();

  return <div className={classes.root}>Chainbridge UI</div>;
};

export default MainPage;
