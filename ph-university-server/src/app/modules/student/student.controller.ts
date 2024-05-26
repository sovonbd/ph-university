import { Request, Response } from "express";
import { StudentService } from "./student.service";

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      mesage: "Students are retrived successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something is wrong",
      data: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id: studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Student is retrived successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something is wrong",
      data: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id: studentId } = req.params;
    console.log(studentId);
    const result = await StudentService.deleteStudentsFromDB(studentId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Delete student successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Something is wrong",
      data: error,
    });
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
