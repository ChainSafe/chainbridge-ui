import {
  NavLink,
  Typography,
  useHistory,
  useLocation,
} from "@chainsafe/common-components";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import AppHeader from "../AppHeader/AppHeader";
import { ReactComponent as GlobalSvg } from "../../media/Icons/global.svg";
import { ReactComponent as GiftSvg } from "../../media/Icons/gift.svg";
import { ROUTE_LINKS } from "../../routes";
import { useStyles } from "./styles";

interface IAppWrapper {
  children: ReactNode | ReactNode[];
  wrapTokenPage?: boolean;
}

const AppWrapper: React.FC<IAppWrapper> = ({
  children,
  wrapTokenPage,
}: IAppWrapper) => {
  const classes = useStyles();
  const [enableNavTabs, setEnableNavTabs] = useState(true);

  const location = useLocation();
  const { redirect } = useHistory();

  const { __RUNTIME_CONFIG__ } = window;

  const indexerEnabled = "INDEXER_URL" in __RUNTIME_CONFIG__;

  useEffect(() => {
    if (location.pathname.includes("/explorer") && !indexerEnabled) {
      redirect("/transfer");
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes("/explorer")) {
      return setEnableNavTabs(false);
    }
    return setEnableNavTabs(true);
  }, [location]);

  return (
    <section className={classes.root}>
      {enableNavTabs ? (
        <section className={classes.inner}>
          <AppHeader />
          <section className={classes.content}>
            {enableNavTabs && (
              <section className={classes.navTabs}>
                <NavLink activeClassName="active" to={ROUTE_LINKS.Transfer}>
                  <GlobalSvg />
                  <Typography variant="h5">Transfer</Typography>
                </NavLink>
                {wrapTokenPage && (
                  <NavLink activeClassName="active" to={ROUTE_LINKS.Wrap}>
                    <GiftSvg />
                    <Typography variant="h5">Wrap token</Typography>
                  </NavLink>
                )}
              </section>
            )}
            <div className={classes.pageArea}>{children}</div>
          </section>

          {/* Put CTA here */}
          {/* <a className={classes.cta} rel="noopener noreferrer" target="_blank" href="#">
        </a> */}
        </section>
      ) : (
        <section className={classes.explorerMainContent}>
          <AppHeader />
          <div className={classes.explorerArea}>{children}</div>
        </section>
      )}
    </section>
  );
};

export default AppWrapper;
