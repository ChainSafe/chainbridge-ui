import { Typography } from "@chainsafe/common-components";
import { NavLink as Link } from "react-router-dom";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import { ROUTE_LINKS } from "../App";
import classNames from "classnames";
interface IAppWrapper {
  children: ReactNode | ReactNode[];
}

const useStyles = makeStyles(({ animation, constants, palette }: ITheme) => {
  return createStyles({
    root: {
      ...(constants.pageRootStyles as any),
      border: "none",
      padding: 0,
      margin: 0,
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
      display: "flex",
      padding: "0px 40px",
      flexDirection: "column",
      alignItems: "center",
    },
    pageArea: {
      height: "100%",
      // overflow: "hidden",
      borderRadius: 15,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      backgroundColor: "white",
      maxWidth: 570,
    },
    navTabs: {
      display: "flex",
      maxWidth: 570,
      minWidth: 497,
    },
    link: {
      fontSize: 20,
      fontWeight: 400,
      marginTop: 0,
      lineHeight: "15px",
    },
    subLink: {
      lineHeight: 1.2,
      marginTop: `${constants.generalUnit * 0.75}px`,
      fontSize: `11px`,
    },
    navLink: {
      color: "#ccc !important", // did important since not able to get inside the style scope of component
      border: "none !important", // styles scoped to inside of custom component used !important to override
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "15px 20px",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      textDecoration: "none",
      // backgroundColor: palette.additional["navLink"][1],
      backgroundColor: "white",
      "&.active": {
        color: "white !important",
        backgroundColor: "#e84142",
      },
      "&.left": {
        borderTopRightRadius: 0,
      },
      "&.right": {
        borderTopLeftRadius: 0,
      },
    },
    contributorCredits: {
      display: "flex",
      justifyContent: "space-around",
      maxWidth: 570,
      padding: 10,
      marginLeft: 10,
    },
    credit: {
      backgroundColor: "#ffffff73",
      padding: 10,
      borderRadius: 9,
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: 10,
      marginRight: 8,
      "& .title": {
        color: palette.additional["gray"][6],
        marginRight: 5,
        whiteSpace: "nowrap",
      },
      "& .name": {
        fontWeight: 600,
        color: palette.additional["gray"][9],
        marginRight: 5,
      },
      "& img": {
        height: 13,
      },
    },
  });
});

const contributionCredits = [
  {
    title: "Built by",
    name: "Chainsafe",
    logoURI: "./chainsafe_logo.svg",
  },
  {
    title: "Powered by",
    name: "Avalanche",
    logoURI: "./avax_logo.svg",
  },
  {
    title: "Powered by",
    name: "Ethereum",
    logoURI: "./eth_logo.svg",
  },
];

const AppWrapper: React.FC<IAppWrapper> = ({ children }: IAppWrapper) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <section className={classes.inner}>
        <AppHeader showViewTransfer={false} />
        <section className={classes.content}>
          <section className={classes.navTabs}>
            <Link
              // activeClassName="active"
              className={classNames(classes.navLink, "left")}
              to={ROUTE_LINKS.Transfer}
            >
              <Typography variant="h3" className={classes.link}>
                Transfer
              </Typography>
              <Typography variant="h5" className={classes.subLink}>
                Move coins between Avalanche and Ethereum.
              </Typography>
            </Link>
            <Link
              // activeClassName="active"
              className={classNames(classes.navLink, "right")}
              to={ROUTE_LINKS.Wrap}
            >
              <Typography variant="h3" className={classes.link}>
                Wrap token
              </Typography>
              <Typography variant="h5" className={classes.subLink}>
                Wrap your token as an ERC-20
              </Typography>
            </Link>
          </section>

          <div className={classNames(classes.pageArea, "basic-box-shadow")}>
            {children}
          </div>
          <div className={classes.contributorCredits}>
            {contributionCredits.map((credit) => (
              <a
                className={classNames(classes.credit, "credit")}
                key={credit.name}
              >
                <span className="title">{credit.title}</span>
                <span className="name">{credit.name}</span>
                <img src={credit.logoURI} />
              </a>
            ))}
          </div>
        </section>

        {/* Put CTA here */}
        {/* <a className={classes.cta} rel="noopener noreferrer" target="_blank" href="#">
        </a> */}
      </section>
    </section>
  );
};

export default AppWrapper;
