import { Resolver, Query, Arg } from "type-graphql";
import { Product } from "../model/Product";
import { productLoader } from "../dataLoader/product.loader";

@Resolver(Product)
export class ProductResolver {
  @Query(() => Product, { nullable: false })
  async getProduct(@Arg("id") id: string) {
    const productFromDB = await productLoader.load({ids: [id]});    
    return productFromDB[0];
  }

  @Query(() => [Product], { nullable: false })
  async getAllProducts(
    @Arg("limit", { defaultValue: 10 }) limit: number,
    @Arg("offset", { defaultValue: 0 }) offset: number
  ) {
    limit = limit.cap(10);
    const productFromDB = await productLoader.load({ limit, offset });
    return productFromDB;
  }
}
