/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from "express";
import httpStatus from "http-status";

const notFound: RequestHandler = (req, res, next) => {
  const stautsCode = httpStatus.NOT_FOUND;
  return res.status(stautsCode).json({
    success: false,
    message: "API Not Found",
    error: "",
  });
};

export default notFound;
