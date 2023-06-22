import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://fond-pigeon-89.hasura.app/v1/graphql",
  cache: new InMemoryCache({ addTypename: false }),
  headers: {
    "x-hasura-admin-secret":
      "ZLq0qJdUQXQ265qldeE40148mDwjmXT2fm2fumDE3mOipevmOcCys64SNcxn2G16",
  },
});
