import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React from "react";
import clsx from "clsx";
import { Typography, NavLink } from "@chainsafe/common-components";
import { shortenAddress } from "../Utils/Helpers";
import { useChainbridge } from "../Contexts/ChainbridgeContext";

const ROUTE_LINKS_HEADERS = [
  { route: "/transfer", label: "Transfer" },
  { route: "/explorer/list", label: "Explorer" },
];

const useStyles = makeStyles(
  ({ constants, palette, zIndex, breakpoints }: ITheme) => {
    return createStyles({
      root: {
        display: "flex",
        position: "fixed",
        justifyContent: "space-between",
        padding: `${constants.generalUnit * 2}px ${
          constants.generalUnit * 4
        }px`,
        width: "100%",
        top: 0,
        left: 0,
        backgroundColor: palette.additional["header"][1],
        borderBottom: `1px solid ${palette.additional["header"][3]}`,
        color: palette.additional["header"][2],
        alignItems: "center",
        zIndex: zIndex?.layer2,
        [breakpoints.down("sm")]: {
          flexDirection: "column",
        },
      },
      left: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        [breakpoints.down("sm")]: {
          display: "flex",
          flexDirection: "column",
        },
      },
      logo: {
        height: constants.generalUnit * 5,
        width: constants.generalUnit * 5,
        "& svg, & img": {
          maxHeight: "100%",
          maxWidth: "100%",
        },
      },
      state: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      indicator: {
        display: "block",
        height: 10,
        width: 10,
        borderRadius: "50%",
        backgroundColor: palette.additional["green"][6],
        marginRight: constants.generalUnit,
      },
      address: {
        marginRight: constants.generalUnit,
      },
      network: {},
      accountInfo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      },
      mainInfo: {
        display: "flex",
        flexDirection: "column",
      },
      mainTitle: {},
      headerLinks: {
        marginLeft: 49,
        [breakpoints.down("sm")]: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: "unset",
          alignItems: "center",
          width: "100%",
          "& > a:last-child": {
            marginLeft: 5,
          },
        },
      },
      link: {
        marginLeft: 46,
        textDecoration: "none",
        [breakpoints.down("sm")]: {
          marginLeft: "unset",
        },
      },
      linkTitle: {
        fontSize: 16,
      },
    });
  }
);

interface IAppHeader {}

const AppHeader: React.FC<IAppHeader> = () => {
  const classes = useStyles();
  const { homeConfig, isReady, address } = useChainbridge();

  const { __RUNTIME_CONFIG__ } = window;

  const indexerEnabled = "INDEXER_URL" in __RUNTIME_CONFIG__;

  return (
    <header className={clsx(classes.root)}>
      <div className={classes.left}>
        {/* ADD LOGO HERE */}
        {/* <div className={classes.logo}>
        </div> */}
        <div className={classes.mainTitle}>
          <Typography variant="h4">ChainBridge Token Swap</Typography>
        </div>
        <div className={classes.headerLinks}>
          {indexerEnabled ? (
            ROUTE_LINKS_HEADERS.map(({ route, label }) => (
              <NavLink to={route} className={classes.link} key={route}>
                <Typography className={classes.linkTitle}>{label}</Typography>
              </NavLink>
            ))
          ) : (
            <NavLink
              to={ROUTE_LINKS_HEADERS[0].route}
              className={classes.link}
              key={ROUTE_LINKS_HEADERS[0].route}
            >
              <Typography className={classes.linkTitle}>
                {ROUTE_LINKS_HEADERS[0].label}
              </Typography>
            </NavLink>
          )}
        </div>
      </div>
      <section className={classes.state}>
        {!isReady ? (
          <Typography variant="h5">No wallet connected</Typography>
        ) : (
          <>
            <div className={classes.mainInfo}>
              <div className={classes.accountInfo}>
                <span className={classes.indicator} />
                <Typography variant="h5" className={classes.address}>
                  {address && shortenAddress(address)}
                </Typography>
              </div>
              <Typography variant="h5" className={classes.address}>
                <div>
                  <span>connected to </span>
                  <span>
                    <strong>{homeConfig?.name}</strong>
                  </span>
                </div>
              </Typography>
            </div>
          </>
        )}
      </section>
    </header>
  );
};

export default AppHeader;
