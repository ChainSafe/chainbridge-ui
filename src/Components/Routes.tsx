import React from "react";
import { Switch, Route, Redirect } from "@chainsafe/common-components";
import TransferPage from "./Pages/TransferPage";
import WrapperPage from "./Pages/WrapperPage";
import ExplorerPage from "./Pages/ExplorerPage";
import { ExplorerProvider } from "../Contexts/ExplorerContext";

export const ROUTE_LINKS = {
  Transfer: "/transfer",
  Wrap: "/wrap",
  Explore: "/explore",
};

const FilesRoutes = () => {
  return (
    <Switch>
      <Route exact path={ROUTE_LINKS.Transfer} component={TransferPage} />
      <Route exact path={ROUTE_LINKS.Wrap} component={WrapperPage} />
      <Route exact path={ROUTE_LINKS.Explore}>
        <ExplorerProvider>
          <ExplorerPage />
        </ExplorerProvider>
      </Route>
      <Route exact path="/">
        <Redirect to={ROUTE_LINKS.Transfer} />
      </Route>
    </Switch>
  );
};

export default FilesRoutes;
