/* eslint-disable @typescript-eslint/no-explicit-any */
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsynch from "../../utils/catchAsync";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsynch(async (req, res) => {
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

const getAllAcademicSemester = catchAsynch(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is retrived successfully",
    data: result,
  });
});

const getSingleAcademicSemester = catchAsynch(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(
    semesterId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is retrived successfully",
    data: result,
  });
});

const updateAcademicSemester = catchAsynch(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic semester is updated successfully",
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
