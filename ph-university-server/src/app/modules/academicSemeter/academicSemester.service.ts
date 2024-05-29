import { AcademicSemester } from "./academicSemester.model";
import { academicSemesterNameCodeMapper } from "./academicSemeter.const";
import { TAcademicSemester } from "./academicSemeter.interface";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // academicSemesterNameCodeMapper['Fall'] = 01
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid semester code!");
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  // academicSemesterNameCodeMapper['Fall'] = 01
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid semester code!");
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
