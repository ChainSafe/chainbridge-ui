import React from "react";
// import { Switch, Route, Redirect } from "react-router-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Link,
  Redirect,
  HashRouter,
} from "react-router-dom";

import {
  TransactionPage,
  WrapperPage,
  TransferPage,
} from "../pages";
import { ExplorerProvider } from "@chainsafe/chainbridge-ui-core";

export const ROUTE_LINKS = {
  Transfer: "/transfer",
  Wrap: "/wrap"
};

interface IChainbridgeRoutes {
  wrapTokenPage?: boolean;
}

const ChainbridgeRoutes: React.FC<IChainbridgeRoutes> = ({ wrapTokenPage }) => {
  return (
    <Switch>
      <Route exact path={ROUTE_LINKS.Transfer} component={TransferPage} />
      {wrapTokenPage && (
        <Route exact path={ROUTE_LINKS.Wrap} component={WrapperPage} />
      )}
      <Route exact path="/">
        <Redirect to={ROUTE_LINKS.Transfer} />
      </Route>
    </Switch>
  );
};

export default ChainbridgeRoutes;
