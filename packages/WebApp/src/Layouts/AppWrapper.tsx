import { createStyles, makeStyles } from "@imploy/common-themes";
import React from "react";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";

interface IAppWrapper {
  children: ReactNode | ReactNode[];
}

const useStyles = makeStyles(() => {
  return createStyles({
    root: {},
  });
});

const AppWrapper: React.FC<IAppWrapper> = ({ children }: IAppWrapper) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <AppHeader />
      {children}
    </section>
  );
};

export default AppWrapper;
