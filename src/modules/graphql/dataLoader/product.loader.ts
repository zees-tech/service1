import DataLoader from "dataloader";
import { Product } from "../model/Product";

const Products: Product[] = [
    { id: "1", name: "Laptop", price: 999, category: "Electronics", stock: 50 },
    { id: "2", name: "Smartphone", price: 699, category: "Electronics", stock: 100 },
    { id: "3", name: "Tablet", price: 399, category: "Electronics", stock: 30 },
    { id: "4", name: "Headphones", price: 199, category: "Accessories", stock: 80 },
    { id: "5", name: "Smartwatch", price: 299, category: "Wearables", stock: 40 },
    { id: "6", name: "Gaming Console", price: 499, category: "Gaming", stock: 20 },
    { id: "7", name: "Wireless Mouse", price: 49, category: "Accessories", stock: 150 },
    { id: "8", name: "Mechanical Keyboard", price: 129, category: "Accessories", stock: 60 },
    { id: "9", name: "External Hard Drive", price: 89, category: "Storage", stock: 70 },
    { id: "10", name: "Monitor", price: 249, category: "Electronics", stock: 25 }
  ];
  


  export const productLoader = new DataLoader<{ ids?: string[]; limit?: number; offset?: number }, Product[]>(
    async (queries) => {
      return await Promise.all(
        queries.map(async ({ ids, limit, offset }) => {
          if (ids && ids.length > 0) {
            // Load products by IDs
            return Products.filter((product) => ids.includes(product.id));
          } 
          if (offset !== undefined && limit !== undefined) {
            // Load all products with pagination
            return Products.slice(offset, offset + limit);
          }
          // Return empty array if no valid query
          return [];
        })
      );
    }
  );
  