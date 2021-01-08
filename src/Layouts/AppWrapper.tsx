import { NavLink, Typography } from "@chainsafe/common-components";
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
      justifyContent: "center",
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
      margin: `0 auto`,
      display: "flex",
      justifyContent: "center",
      overflow: "hidden",
      borderRadius: 4,
      padding: "40px 0",
      /**
       * The tab and the child content area are reversed so that the z-index doesnt have to be changed and thus conflict with
       * pop outs or modals.
       */
      flexDirection: "row-reverse",
    },
    pageArea: {
      height: "100%",
      width: "570px",
      overflow: "hidden",
      borderRadius: 15,
      borderTopLeftRadius: 0,
      backgroundColor: "white",
      // boxShadow: "0px 1px 20px 0px #bdbdbd5e",
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
      marginTop: 0,
    },
    subLink: {
      lineHeight: 1.2,
      marginTop: `${constants.generalUnit * 0.75}px`,
      fontSize: `${constants.generalUnit * 1.75}px`,
    },
    navLink: {
      color: "#757575 !important", // did important since not able to get inside the style scope of component
      marginBottom: "10px",
      border: "none !important", // styles scoped to inside of custom component used !important to override
      "&.active": {
        color: "white !important",
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
          <div className={classNames(classes.pageArea, "basic-box-shadow")}>
            {children}
          </div>
          <section className={classes.navTabs}>
            <NavLink
              activeClassName="active"
              className={classes.navLink}
              to={ROUTE_LINKS.Transfer}
            >
              <Typography variant="h3" className={classes.link}>
                Transfer
              </Typography>
              <Typography variant="h5" className={classes.subLink}>
                Move coins between Avalanche and Ethereum.
              </Typography>
            </NavLink>
            <NavLink
              activeClassName="active"
              className={classes.navLink}
              to={ROUTE_LINKS.Wrap}
            >
              <Typography variant="h3" className={classes.link}>
                Wrap token
              </Typography>
              <Typography variant="h5" className={classes.subLink}>
                Check the status of your transfer
              </Typography>
            </NavLink>
          </section>
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
