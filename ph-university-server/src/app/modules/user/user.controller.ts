import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password: string, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );
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

export const UserControllers = {
  createStudent,
};
