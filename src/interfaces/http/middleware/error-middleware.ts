import { Response, ErrorRequestHandler } from "express";
import { HttpStatus } from "../shared/httpStatus";

export const errorMiddleware: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
): Response => {
  const message = err.message || "Something went wrong";

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(message);
};
