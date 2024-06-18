/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // setting default values
  let stautsCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";

  let errorSources: TErrorSource = [
    { path: "", message: "Something Went wrong" },
  ];

  const handleZodError = (error: ZodError) => {
    const statusCode = 400;
    const errorSources: TErrorSource = error.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    return { statusCode, message: "validation error", errorSources };
  };

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    stautsCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  // final return
  return res.status(stautsCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? error?.stack : null,
  });
};

export default globalErrorHandler;
