import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
//Containers
import Home from "../containers/Home";
import Profile from "../containers/Profile";

const NoMatch: React.FC = () => <div>Route not found</div>;

const Router = () => {
  return (
    <main>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route exact path="*" component={NoMatch} />
      </Switch>
    </main>
  );
};

export default Router;
