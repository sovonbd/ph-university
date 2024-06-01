/* eslint-disable @typescript-eslint/no-explicit-any */
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsynch from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsynch(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty is created successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsynch(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculties is retrived successfully",
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsynch(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(
    facultyId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty is retrived successfully",
    data: result,
  });
});

const updateAcademicFaculty = catchAsynch(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    facultyId,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic faculty is updated successfully",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
