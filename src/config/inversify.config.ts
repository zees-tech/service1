
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { ErrorMiddleware } from '../server/middleware/error.middleware';
import { CorsMiddleware } from '../server/middleware/cors.middleware';
import TYPES from "./types";
import './number.refine'

import "reflect-metadata";

// Import all controllers dynamically
import "../modules/product.module/product.controller"; // Add other controllers here
// import "../modules/gateway/proxy.controller"; // Add other controllers here

const container = new Container({
  defaultScope: "Request", // Ensures controllers are bound only once
});

container.bind<ErrorMiddleware>(TYPES.ErrorMiddleware).to(ErrorMiddleware).inSingletonScope();
container.bind<CorsMiddleware>(TYPES.CorsMiddleware).to(CorsMiddleware).inSingletonScope();

// Initialize the Inversify Express server
const server = new InversifyExpressServer(container);

export { container, server };
