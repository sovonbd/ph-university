import config from "../../config";
import { TStudent } from "../student/student.interface";
import { NewUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const user: NewUser = {};

  // if password is not given, use default password
  user.password = password || (config.default_password as string);

  // set student role
  user.role = "student";

  // set id manually
  user.id = "203010001";

  // create an user
  const result = await User.create(user);

  // create a student
  if (Object.keys(result).length) {
    // set id, _id as user
    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};