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

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
};
