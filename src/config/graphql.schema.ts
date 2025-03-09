import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "../modules/graphql/query/product.resolver";

export async function createSchema() {
  return buildSchema({
    resolvers: [ProductResolver],
    validate: false, // Disable validation if not needed
  });
}
