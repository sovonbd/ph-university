/* eslint-disable @typescript-eslint/no-explicit-any */
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsynch from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsynch(async (req, res, next) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is created successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
