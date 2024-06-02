import httpStatus from "http-status";
import config from "../../config";
import { AcademicSemester } from "../academicSemeter/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";
import mongoose from "mongoose";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given, use default password
  userData.password = password || (config.default_password as string);

  // set student role
  userData.role = "student";

  const admissionSemeter = await AcademicSemester.findById(
    payload.admissionSemester
  );

  if (!admissionSemeter) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
  }
  // set student id
  userData.id = await generateStudentId(admissionSemeter);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // create an user
    const newUser = await User.create([userData], { session });

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
    }

    // set id, _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; // reference _id

    const newStudent = await Student.create([payload], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student");
  }
};

export const UserServices = {
  createStudentIntoDB,
};
