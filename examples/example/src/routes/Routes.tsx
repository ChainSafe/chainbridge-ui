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
  ExplorerPage,
  TransferPage,
} from "../pages";
import { ExplorerProvider } from "@chainsafe/chainbridge-ui-core";

export const ROUTE_LINKS = {
  Transfer: "/transfer",
  Wrap: "/wrap",
  Explorer: "/explorer/transaction/list",
  ExplorerDetailed: "/explorer/transaction/detail-view/:txId",
  TransactionPage: "/explorer/transaction/:txHash",
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
      <Route exact path={ROUTE_LINKS.Explorer}>
        <ExplorerProvider>
          <ExplorerPage />
        </ExplorerProvider>
      </Route>
      <Route exact path={ROUTE_LINKS.ExplorerDetailed}>
        <ExplorerProvider>
          <ExplorerPage />
        </ExplorerProvider>
      </Route>
      <Route exact path={ROUTE_LINKS.TransactionPage}>
        <ExplorerProvider>
          <TransactionPage />
        </ExplorerProvider>
      </Route>

      <Route exact path="/">
        <Redirect to={ROUTE_LINKS.Transfer} />
      </Route>
    </Switch>
  );
};

export default ChainbridgeRoutes;
