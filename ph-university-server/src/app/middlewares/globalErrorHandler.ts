/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const stautsCode = httpStatus.INTERNAL_SERVER_ERROR;
  const message = error.message || "Something went wrong";
  return res.status(stautsCode).json({
    success: false,
    message,
    error: error,
  });
};

export default globalErrorHandler;
