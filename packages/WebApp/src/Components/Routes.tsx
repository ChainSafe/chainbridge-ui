import React from "react";
import { Switch, Route } from "@imploy/common-components";
import MainPage from "./Pages/MainPage";

export const ROUTE_LINKS = {
  Main: "/",
};

const FilesRoutes = () => {
  return (
    <Switch>
      <Route exact path={ROUTE_LINKS.Main} component={MainPage} />
    </Switch>
  );
};

export default FilesRoutes;
