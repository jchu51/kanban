import { Router } from "express";

export interface Controller {
  prefixPath: string;
  createRouter: () => Router;
}
