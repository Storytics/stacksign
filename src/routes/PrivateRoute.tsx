import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
//Utils
import { useAuth0 } from "../containers/Auth/AuthServices";

interface IPrivateRouteOptions {
  component: React.FC;
  path: string;
  exact?: boolean;
}

type PrivateRouteOptions = IPrivateRouteOptions;

const PrivateRoute = ({
  component: Component,
  path,
  ...rest
}: PrivateRouteOptions) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: path }
        });
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, path]);

  const render = (props: RouteProps) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
