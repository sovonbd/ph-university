import { z } from "zod";

const userNameSchema = z.object({
  firstName: z
    .string()
    .max(15, "Max allowed length is 15")
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: "First name must be in capitalize format",
      }
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => /^[A-Za-z]*$/.test(value), {
    message: "Last name must contain only alphabetic characters",
  }),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const studentSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameSchema.refine((data) => !!data.firstName && !!data.lastName, {
    message: "Student name is required",
  }),
  gender: z.enum(["male", "female", "Others"]),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Email must be valid"),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianSchema.refine(
    (data) => !!data.fatherName || !!data.motherName,
    {
      message: "Guardian information is required",
    }
  ),
  localGuardian: localGuardianSchema.refine(
    (data) => !!data.name || !!data.occupation,
    {
      message: "Local guardian information is required",
    }
  ),
  profileImg: z.string().optional(),
  isActive: z.literal("active").default("active"),
  isDeleted: z.boolean(),
});

export { studentSchema };
