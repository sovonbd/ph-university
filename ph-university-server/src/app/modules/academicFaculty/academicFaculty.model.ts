import { model, Schema } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// check faculty existence
academicFacultySchema.pre("save", async function (next) {
  const isFacultyExists = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isFacultyExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Faculty name already exists!");
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  "AcademicFaculty",
  academicFacultySchema
);
