import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import TransferPage from "./Pages/TransferPage";
import WrapperPage from "./Pages/WrapperPage";

export const ROUTE_LINKS = {
  Transfer: "/transfer",
  Wrap: "/wrap",
};

const FilesRoutes = () => {
  return (
    <Switch>
      <Route exact path={ROUTE_LINKS.Transfer} component={TransferPage} />
      <Route exact path={ROUTE_LINKS.Wrap} component={WrapperPage} />
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to={ROUTE_LINKS.Transfer} />;
        }}
      ></Route>
    </Switch>
  );
};

export default FilesRoutes;
