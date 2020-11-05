import { createStyles, ITheme, makeStyles } from "@imploy/common-themes";
import React from "react";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";

interface IAppWrapper {
  children: ReactNode | ReactNode[];
}

const useStyles = makeStyles(({ constants, palette }: ITheme) => {
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
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      maxWidth: 460,
      display: "flex",
      flexDirection: "column",
      padding: constants.generalUnit * 6,
      border: `1px solid ${palette.additional["gray"][7]}`,
      borderRadius: 4,
      color: palette.additional["gray"][8],
    },
    pageArea: {
      height: "100%",
      width: "100%",
      overflow: "hidden",
    },
  });
});

const AppWrapper: React.FC<IAppWrapper> = ({ children }: IAppWrapper) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <AppHeader />
      <section className={classes.content}>
        <div className={classes.pageArea}>{children}</div>
      </section>

      {/* Put CTA here */}
      {/* <a className={classes.cta} rel="noopener noreferrer" target="_blank" href="#">
      </a> */}
    </section>
  );
};

export default AppWrapper;
