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

// validate the semester name
academicSemesterSchema.pre("save", async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    year: this.year, // this represent the data that coming from the client
    name: this.name, // this represent the data that coming from the client
  });

  if (isSemesterExist) {
    throw new Error("Semester is already exist!");
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  "AcademicSemester",
  academicSemesterSchema
);
