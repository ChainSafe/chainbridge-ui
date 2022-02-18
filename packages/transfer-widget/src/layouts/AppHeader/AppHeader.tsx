import React from "react";
import clsx from "clsx";
// import { Typography } from "@chainsafe/common-components";
import Typography from "@mui/material/Typography";
import { Switch, NavLink, Link } from "react-router-dom";

import { shortenAddress } from "../../utils/Helpers";
import { useChainbridge } from "@chainsafe/chainbridge-ui-core";
import { useStyles } from "./styles";

const ROUTE_LINKS_HEADERS = [
  { route: "/transfer", label: "Transfer" },
  { route: "/explorer/transaction/list", label: "Explorer" },
];

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
          <Typography variant="h5">ChainBridge Token Swap</Typography>
        </div>
        <div className={classes.headerLinks}>
          {indexerEnabled ? (
            ROUTE_LINKS_HEADERS.map(({ route, label }) => (
              <NavLink to={route} className={classes.link} key={route}>
                <Typography variant="h5" className={classes.linkTitle}>
                  {label}
                </Typography>
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
