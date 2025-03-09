// src/index.ts
import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import { container } from '../config/inversify.config';
import  TYPES  from "../config/types";
import { ErrorMiddleware } from './middleware/error.middleware';
import { CorsMiddleware } from './middleware/cors.middleware';
import { InversifyExpressServer } from 'inversify-express-utils';
import dotenv from 'dotenv';
import graphqlServer from './graphql.server';
dotenv.config();

// const app = express();
const server = new InversifyExpressServer(container);
// Resolve Middleware from DI
const corsMiddleware = container.get<CorsMiddleware>(TYPES.CorsMiddleware);
const errorMiddleware = container.get<ErrorMiddleware>(TYPES.ErrorMiddleware);

server.setConfig((app) => {
  // Global Middleware
  app.use(corsMiddleware.corsVerify);
  app.use(express.json());
  app.use(helmet());
  app.use(compression());

  // Welcome route
  app.get('/', (req, res) => {
    res.send('Welcome to service');
  });
});

const app = server.build();
graphqlServer(app);
app.use(errorMiddleware.handleErrors);
const PORT = process.env.port;
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});