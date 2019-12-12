import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

function createApolloClient(idToken: string | undefined) {
  const cache = new InMemoryCache();

  const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URL
  });

  const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_API_SUBSCRIPTION_URL,
    options: {
      reconnect: true,
      connectionParams: {
        Authorization: `Bearer ${idToken}`
      }
    }
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${idToken}`
      }
    };
  });

  const link = split(
    // split based on operation type
    ({ query }) => {
      let definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink)
  );

  return new ApolloClient({
    link,
    cache
  });
}

export default createApolloClient;
