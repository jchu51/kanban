import { RequestHandler } from "express-serve-static-core";
import { HttpStatus } from "../shared/httpStatus";
import { TaskNotFoundError } from "./task-error";

const taskErrorHandler: (handler: RequestHandler) => RequestHandler =
  (handler) => async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      if (err instanceof TaskNotFoundError) {
        return res.status(HttpStatus.NOT_FOUND).send(err.message);
      }
      next(err);
    }
  };

export default taskErrorHandler;
