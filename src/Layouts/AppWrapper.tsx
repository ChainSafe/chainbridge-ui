import { Typography } from "@chainsafe/common-components";
import { NavLink as Link } from "react-router-dom";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import { ROUTE_LINKS } from "../Components/Routes";
import classNames from "classnames";
interface IAppWrapper {
  children: ReactNode | ReactNode[];
}

const useStyles = makeStyles(({ animation, constants, palette }: ITheme) => {
  return createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      position: "relative",
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
      // margin: `0 auto`,
      display: "flex",
      // justifyContent: "center",
      // overflow: "hidden",
      // borderRadius: 4,
      padding: "40px 40px",
      /**
       * The tab and the child content area are reversed so that the z-index doesnt have to be changed and thus conflict with
       * pop outs or modals.
       */
      flexDirection: "column",
    },
    pageArea: {
      height: "100%",
      width: "570px",
      overflow: "hidden",
      borderRadius: 15,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      backgroundColor: "white",
      // boxShadow: "0px 1px 20px 0px #bdbdbd5e",
    },
    navTabs: {
      width: "570px",
      display: "flex",
      // display: "flex",
      // flexDirection: "column",
      // maxWidth: `${constants.generalUnit * 31.25}px`,
      // "& > a": {
      //   display: "flex",
      //   justifyContent: "flex-end",
      //   flexDirection: "column",
      //   textAlign: "right",
      //   padding: `${constants.generalUnit * 4}px ${
      //     constants.generalUnit * 3
      //   }px ${constants.generalUnit * 3}px ${constants.generalUnit * 3}px`,
      //   border: `1px solid ${palette.additional["gray"][7]}`,
      //   borderRight: "0",
      //   borderRadius: `${constants.generalUnit}px 0 0 ${constants.generalUnit}px`,
      //   textDecoration: "none",
      //   transitionDuration: `${animation.transform}ms`,
      //   color: palette.common.white.main,
      //   backgroundColor: palette.additional["navLink"][1],
      //   "&:last-child": {
      //     padding: `${constants.generalUnit * 3}px ${
      //       constants.generalUnit * 3
      //     }px ${constants.generalUnit * 4}px ${constants.generalUnit * 3}px`,
      //   },
      // },
    },
    link: {
      fontSize: `30px`,
      fontWeight: 600,
      marginTop: 0,
      lineHeight: "20px",
    },
    subLink: {
      lineHeight: 1.2,
      marginTop: `${constants.generalUnit * 0.75}px`,
      fontSize: `11px`,
    },
    navLink: {
      color: "#757575 !important", // did important since not able to get inside the style scope of component
      border: "none !important", // styles scoped to inside of custom component used !important to override
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px 0",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      textDecoration: "none",
      backgroundColor: palette.additional["navLink"][1],
      "&.active": {
        color: "white !important",
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
      position: "absolute",
      bottom: 30,
    },
    credit: {
      backgroundColor: palette.additional["gray"][4],
      padding: 10,
      borderRadius: 9,
      marginLeft: 50,
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      "& .title": {
        color: palette.additional["gray"][6],
        marginRight: 5,
      },
      "& .name": {
        fontWeight: 700,
        color: palette.additional["gray"][9],
        marginRight: 5,
      },
      "& img": {
        height: 25,
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
        <AppHeader />
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
                Check the status of your transfer
              </Typography>
            </Link>
          </section>

          <div className={classNames(classes.pageArea, "basic-box-shadow")}>
            {children}
          </div>
        </section>

        {/* Put CTA here */}
        {/* <a className={classes.cta} rel="noopener noreferrer" target="_blank" href="#">
        </a> */}
      </section>

      <div className={classes.contributorCredits}>
        {contributionCredits.map((credit) => (
          <a className={classNames(classes.credit, "credit")} key={credit.name}>
            <span className="title">{credit.title}</span>
            <span className="name">{credit.name}</span>
            <img src={credit.logoURI} />
          </a>
        ))}
      </div>
    </section>
  );
};

export default AppWrapper;
