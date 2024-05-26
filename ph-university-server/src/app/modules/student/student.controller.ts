import { Request, Response } from "express";
import { StudentService } from "./student.service";
import Joi from "joi";
import { studentSchema } from "./student.zod.validation";
// import { studentSchema } from "./student.joi.validation";

// step - 5: control the result from db and update to route
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // validation using joi
    // const { error, value } = studentSchema.validate(studentData);
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: "Something is wrong",
    //     data: error.details,
    //   });
    // }
    // const result = await StudentService.createStudentIntoDB(value);

    // validation usin zod
    const studentValidation = studentSchema.parse(studentData);

    const result = await StudentService.createStudentIntoDB(studentValidation);
    res.status(200).json({
      success: true,
      mesage: "Student is created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message || "Something is wrong",
      data: error,
    });
  }
};

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
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
