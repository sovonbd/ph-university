import { model, Schema } from "mongoose";
import { TAcademicSemester } from "./academicSemeter.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemeter.const";

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, required: true, enum: AcademicSemesterName },
    year: { type: String, required: true },
    code: { type: String, required: true, enum: AcademicSemesterCode },
    startMonth: { type: String, required: true, enum: Months },
    endMonth: { type: String, required: true, enum: Months },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
