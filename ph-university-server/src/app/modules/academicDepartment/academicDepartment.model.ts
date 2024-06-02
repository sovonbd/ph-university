import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: "AcademicFaculty" },
  },
  {
    timestamps: true, // createdAt and updatedAt
  }
);

// check department existence
academicDepartmentSchema.pre("save", async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Department name already exists!");
  }
  next();
});

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isDepartmentIdExists = await AcademicDepartment.findById(query);

  if (!isDepartmentIdExists) {
    throw new AppError(httpStatus.NOT_FOUND, "This department does not exist!");
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  "AcademicDepartment",
  academicDepartmentSchema
);
