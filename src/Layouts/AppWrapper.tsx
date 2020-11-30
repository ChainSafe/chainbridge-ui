import { NavLink, Typography } from "@chainsafe/common-components";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import { ReactComponent as GlobalSvg } from "../media/Icons/global.svg";
import { ReactComponent as GiftSvg } from "../media/Icons/gift.svg";
import { ROUTE_LINKS } from "../Components/Routes";
interface IAppWrapper {
  children: ReactNode | ReactNode[];
}

const useStyles = makeStyles(({ animation, constants, palette }: ITheme) => {
  return createStyles({
    root: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingTop: 60,
    },
    inner: {
      paddingTop: (constants.navItemHeight as number) * 2,
      paddingBottom: (constants.navItemHeight as number) * 2,
    },
    cta: {
      display: "block",
      maxWidth: 200,
      maxHeight: 200,
      position: "fixed",
      bottom: constants.generalUnit * 3,
      right: constants.generalUnit * 3,
    },
    content: {
      // position: "absolute",
      // top: "50%",
      // left: "50%",
      margin: `0 auto`,
      // transform: "translate(-50%, -50%)",
      maxWidth: 460,
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      borderRadius: 4,
    },
    pageArea: {
      height: "100%",
      width: "100%",
      overflow: "hidden",
      border: `1px solid ${palette.additional["gray"][7]}`,
      borderRadius: 4,
    },
    navTabs: {
      // position: "absolute",
      // top: 0,
      // left: 0,
      width: "100%",
      // transform: "translate(0,-100%)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: `0 ${constants.generalUnit}px`,
      transform: "translateY(1px)",
      "& > a": {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: `${constants.generalUnit}px ${constants.generalUnit * 1.5}px`,
        border: `1px solid ${palette.additional["gray"][7]}`,
        textDecoration: "none",
        marginRight: constants.generalUnit,
        transitionDuration: `${animation.transform}ms`,
        color: palette.additional["gray"][8],
        maxHeight: constants.navItemHeight,
        "& svg": {
          transitionDuration: `${animation.transform}ms`,
          fill: palette.additional["gray"][8],
        },
        "&.active": {
          color: palette.additional["gray"][9],
          textDecoration: "underline",
          "& svg": {
            fill: palette.additional["geekblue"][5],
          },
        },
        "& > *:first-child": {
          marginRight: constants.generalUnit,
        },
      },
      "& svg": {
        height: 14,
        width: 14,
      },
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
              <GlobalSvg />
              <Typography variant="h5">Transfer</Typography>
            </NavLink>
            <NavLink activeClassName="active" to={ROUTE_LINKS.Wrap}>
              <GiftSvg />
              <Typography variant="h5">Wrap token</Typography>
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
