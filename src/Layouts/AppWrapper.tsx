import { createStyles, ITheme, makeStyles } from "@imploy/common-themes";
import React from "react";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";

interface IAppWrapper {
  children: ReactNode | ReactNode[];
}

const useStyles = makeStyles(({ constants }: ITheme) => {
  return createStyles({
    root: {},
    cta: {
      display: "block",
      maxWidth: 200,
      maxHeight: 200,
      position: "fixed",
      bottom: constants.generalUnit * 3,
      right: constants.generalUnit * 3,
    },
  });
});

const AppWrapper: React.FC<IAppWrapper> = ({ children }: IAppWrapper) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <AppHeader />
      {children}

      {/* Put CTA here */}
      {/* <a className={classes.cta} rel="noopener noreferrer" target="_blank" href="#">
      </a> */}
    </section>
  );
};

export default AppWrapper;
