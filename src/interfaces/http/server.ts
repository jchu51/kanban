import express, { Express } from "express";
import { errorMiddleware } from "./middleware/error-middleware";
import { Controller } from "./shared/controller/controller";

export class Server {
  private app: Express;

  constructor(routers: Controller[]) {
    this.app = express();
    this.middlewares();
    this.routers(routers);
    this.errorHandler();
  }

  private middlewares = () => {
    this.app.use(express.json());
  };

  private errorHandler = () => {
    this.app.use(errorMiddleware);
  };

  private routers = (routers: Controller[]) => {
    routers.forEach((router) => {
      this.app.use(router.prefixPath, router.createRouter());
    });
  };

  listen = (port: number) => {
    this.app.listen(port, () => {
      console.log(`Listen on port: ${port}`);
    });
  };
}
