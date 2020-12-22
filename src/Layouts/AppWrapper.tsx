import { NavLink, Typography } from "@chainsafe/common-components";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import { ROUTE_LINKS } from "../Components/Routes";
interface IAppWrapper {
  children: ReactNode | ReactNode[];
}

const useStyles = makeStyles(({ animation, constants, palette }: ITheme) => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    inner: {
      paddingBottom: (constants.navItemHeight as number) * 2,
    },
    cta: {
      display: "block",
      maxWidth: 200,
      maxHeight: 200,
      bottom: constants.generalUnit * 3,
      right: constants.generalUnit * 3,
    },
    content: {
      margin: `0 auto`,
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
      borderRadius: 4,
    },
    pageArea: {
      height: "100%",
      width: "570px",
      overflow: "hidden",
      border: `1px solid ${palette.additional["gray"][7]}`,
      borderRadius: 4,
    },
    navTabs: {
      display: "flex",
      flexDirection: "column",
      maxWidth: `${constants.generalUnit * 31.25}px`,
      "& > a": {
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "column",
        textAlign: "right",
        padding: `${constants.generalUnit * 4}px ${
          constants.generalUnit * 3
        }px ${constants.generalUnit * 3}px ${constants.generalUnit * 3}px`,
        border: `1px solid ${palette.additional["gray"][7]}`,
        borderRight: "0",
        borderRadius: `${constants.generalUnit}px 0 0 ${constants.generalUnit}px`,
        textDecoration: "none",
        marginTop: `${constants.generalUnit}px`,
        transitionDuration: `${animation.transform}ms`,
        color: palette.common.white.main,
        backgroundColor: palette.additional["navLink"][1],
        "&:last-child": {
          padding: `${constants.generalUnit * 3}px ${
            constants.generalUnit * 3
          }px ${constants.generalUnit * 4}px ${constants.generalUnit * 3}px`,
        },
      },
    },
    link: {
      fontSize: `${constants.generalUnit * 4}px`,
      fontWeight: 600,
    },
  });
});

const AppWrapper: React.FC<IAppWrapper> = ({ children }: IAppWrapper) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <section className={classes.inner}>
        <AppHeader />
        <section className={classes.content}>
          <section className={classes.navTabs}>
            <NavLink activeClassName="active" to={ROUTE_LINKS.Transfer}>
              <Typography variant="h3" className={classes.link}>
                Transfer
              </Typography>
              <Typography variant="h5">
                Move coins between Avalanche and Ethereum.
              </Typography>
            </NavLink>
            <NavLink activeClassName="active" to={ROUTE_LINKS.Wrap}>
              <Typography variant="h3" className={classes.link}>
                Wrap token
              </Typography>
              <Typography variant="h5">
                Check the status of your transfer
              </Typography>
            </NavLink>
          </section>
          <div className={classes.pageArea}>{children}</div>
        </section>

        {/* Put CTA here */}
        {/* <a className={classes.cta} rel="noopener noreferrer" target="_blank" href="#">
        </a> */}
      </section>
    </section>
  );
};

export default AppWrapper;
