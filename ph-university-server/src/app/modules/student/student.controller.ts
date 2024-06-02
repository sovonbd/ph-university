import { StudentService } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsynch from "../../utils/catchAsync";

// get all students
const getAllStudents = catchAsynch(async (req, res, next) => {
  const result = await StudentService.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student are retrieved succesfully",
    data: result,
  });
});

// get single student
const getSingleStudent = catchAsynch(async (req, res, next) => {
  const { id: studentId } = req.params;
  const result = await StudentService.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is retrived successfully",
    data: result,
  });
});

// update student

const updateStudent = catchAsynch(async (req, res, next) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentService.updateStudentsIntoDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is updated succesfully",
    data: result,
  });
});

// delete a student
const deleteStudent = catchAsynch(async (req, res, next) => {
  const { id: studentId } = req.params;
  const result = await StudentService.deleteStudentsFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete student successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
