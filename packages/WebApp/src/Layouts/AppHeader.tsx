import { createStyles, ITheme, makeStyles } from "@imploy/common-themes";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles(({}: ITheme) => {
  return createStyles({
    root: {},
  });
});

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = ({}: IAppHeader) => {
  const classes = useStyles();

  return <header className={clsx(classes.root, {})}></header>;
};

export default AppHeader;
