import React, { useEffect, useState } from "react";
import { ReactNode } from "react";

import Paper from "@mui/material/Paper";

import {
  Switch,
  NavLink,
  Link,
  useLocation,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

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
  const history = useHistory();

  const { __RUNTIME_CONFIG__ } = window;

  const indexerEnabled = "INDEXER_URL" in __RUNTIME_CONFIG__;

  useEffect(() => {
    if (location.pathname.includes("/explorer") && !indexerEnabled) {
      history.push("/transfer");
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes("/explorer")) {
      return setEnableNavTabs(false);
    }
    return setEnableNavTabs(true);
  }, [location]);

  const routeMatch = useRouteMatch([ROUTE_LINKS.Transfer, ROUTE_LINKS.Wrap]);
  const currentTab = routeMatch?.path;

  return (
    <>
      {enableNavTabs ? (
        <div>
          <AppHeader />
          <Container>
            <Paper
              sx={{
                margin: `30px auto`,
                maxWidth: 500,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                px: 3,
              }}
              elevation={3}
            >
              {enableNavTabs && (
                <Tabs value={currentTab}>
                  <Tab
                    icon={<GlobalSvg />}
                    iconPosition="start"
                    label="Transfer"
                    value={ROUTE_LINKS.Transfer}
                    to={ROUTE_LINKS.Transfer}
                    component={Link}
                  />
                  {wrapTokenPage && (
                    <Tab
                      icon={<GiftSvg />}
                      iconPosition="start"
                      label="Wrap"
                      value={ROUTE_LINKS.Wrap}
                      to={ROUTE_LINKS.Wrap}
                      component={Link}
                    />
                  )}
                </Tabs>
              )}
              <div className={classes.pageArea}>{children}</div>
            </Paper>
          </Container>

          {/* Put CTA here */}
          {/* <a className={classes.cta} rel="noopener noreferrer" target="_blank" href="#">
        </a> */}
        </div>
      ) : (
        <div className={classes.explorerMainContent}>
          <AppHeader />
          <div className={classes.explorerArea}>{children}</div>
        </div>
      )}
    </>
  );
};

export default AppWrapper;
