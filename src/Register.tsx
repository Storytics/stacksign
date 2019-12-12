import React, { useEffect, useMemo, useState } from "react";
//Pages Navigation
import { useHistory } from "react-router-dom";
//Auth
import AuthConfig from "./containers/Auth/AuthConfig";
import { Auth0Provider, useAuth0 } from "./containers/Auth/AuthServices";
//GraphQL
import { ApolloProvider } from "@apollo/react-hooks";
import createApolloClient from "./api/Apollo.config";
//Containers
import App from "./containers/App";

const ApolloWrapper: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { getIdTokenClaims, loading, user } = useAuth0();
  const [token, setToken] = useState<string>(null);

  useEffect(() => {
    if (loading && !user) return;

    const tokenClaims = async () => {
      try {
        const res = await getIdTokenClaims();
        setToken(res.__raw);
      } catch (e) {
        console.log("Apollo token error = ", e);
      }
    };
    tokenClaims();
  }, [getIdTokenClaims, loading, user]);

  const client = useMemo(() => createApolloClient(!loading && token), [
    token,
    loading
  ]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

function Register() {
  const history = useHistory();

  const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  };

  return (
    <Auth0Provider
      domain={AuthConfig.domain}
      client_id={AuthConfig.clientId}
      redirect_uri={AuthConfig.redirectUri}
      onRedirectCallback={onRedirectCallback}
    >
      <ApolloWrapper>
        <App />
      </ApolloWrapper>
    </Auth0Provider>
  );
}

export default Register;
