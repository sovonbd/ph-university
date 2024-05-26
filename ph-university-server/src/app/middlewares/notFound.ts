/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const stautsCode = httpStatus.NOT_FOUND;
  return res.status(stautsCode).json({
    success: false,
    message: "API Not Found",
    error: "",
  });
};

export default notFound;
