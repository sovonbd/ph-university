import { NextFunction, Request, RequestHandler, Response } from "express";

// higher order async function
const catchAsynch = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

export default catchAsynch;
