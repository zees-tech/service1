import { createSchema } from "../config/graphql.schema";
import express from "express";
import { ApolloServer } from "apollo-server-express";

export default async function graphqlServer(app: any){
    // Initialize GraphQL
const schema = await createSchema();
const graphqlServer = new ApolloServer({
  schema,
  introspection: true, // Enable introspection for Apollo Gateway  
  context: ({ req }) => ({ req }),
});

await graphqlServer.start();

graphqlServer.applyMiddleware({ app, path: "/graphql" })
}