import { NavLink, Typography } from "@chainsafe/common-components";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import { ReactComponent as GlobalSvg } from "../media/Icons/global.svg";
import { ROUTE_LINKS } from "../Components/Routes";
import backgroundImage from "../media/background.svg";

interface IAppWrapper {
  children: ReactNode | ReactNode[];
  wrapTokenPage?: boolean;
}

const backgroundColor = "#F5F7F9";

const useStyles = makeStyles(
  ({ animation, constants, palette, breakpoints }: ITheme) => {
    return createStyles({
      root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
      inner: {
        paddingTop: constants.navItemHeight as number,
        paddingBottom: constants.navItemHeight as number,
        backgroundColor: backgroundColor,
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
        width: "100%",
        display: "flex",
        flex: 1,
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "95%",
        backgroundRepeat: "no-repeat",
      },
      pageArea: {
        height: "100%",
        overflow: "auto",
        boxShadow: "20px 4px 72px rgba(85, 85, 85, 0.15)",
        borderRadius: 4,
        maxWidth: 460,
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
          padding: `${constants.generalUnit}px ${
            constants.generalUnit * 1.5
          }px`,
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
  }
);

const AppWrapper: React.FC<IAppWrapper> = ({
  children,
  wrapTokenPage,
}: IAppWrapper) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <AppHeader />
      <section className={classes.content}>
        <div className={classes.pageArea}>{children}</div>
      </section>
    </section>
  );
};

export default AppWrapper;
