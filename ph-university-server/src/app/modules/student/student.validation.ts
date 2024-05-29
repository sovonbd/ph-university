import { z } from "zod";

const userNameValidationSchema = z.object({
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

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameValidationSchema.refine(
        (data) => !!data.firstName && !!data.lastName,
        {
          message: "Student name is required",
        }
      ),
      gender: z.enum(["male", "female", "Others"]),
      dateOfBirth: z.string().optional(),
      email: z.string().email("Email must be valid"),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianValidationSchema.refine(
        (data) => !!data.fatherName || !!data.motherName,
        {
          message: "Guardian information is required",
        }
      ),
      localGuardian: localGuardianValidationSchema.refine(
        (data) => !!data.name || !!data.occupation,
        {
          message: "Local guardian information is required",
        }
      ),
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
    }),
  }),
});

export const studentValidation = {
  createStudentValidationSchema,
};
