import { TStudent } from "./student.interface";
import { Student } from "./student.model";
// step - 4 : service - create Query model for db and send to controller

const createStudentIntoDB = async (studentData: TStudent) => {
  // console.log(student);
  // built in statics method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User already exists");
  }
  const result = await Student.create(studentData);

  // using instance method
  // const student = new Student(studentData);

  // // checking with custom instance mehtod
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User already exists");
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const deleteStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // console.log(id);
  // const result = await Student.findOne({ id: id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
export const StudentService = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentsFromDB,
};
