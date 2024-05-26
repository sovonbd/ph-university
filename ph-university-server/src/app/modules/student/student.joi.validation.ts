import Joi from "joi";

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .max(15)
    .trim()
    .required()
    .pattern(/^[A-Z][a-z]*$/, { name: "capitalize format" })
    .messages({
      "string.base": "First Name must be a string",
      "string.max": "Max allowed length is 15",
      "string.empty": "First Name is required",
      "string.pattern.name": "First Name is not in capitalize format",
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]*$/, { name: "alphabetic characters only" })
    .messages({
      "string.base": "Last Name must be a string",
      "string.empty": "Last Name is required",
      "string.pattern.name": "Last Name is not a valid entry",
    }),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().optional(),
  fatherOccupation: Joi.string().optional(),
  fatherContactNo: Joi.string().optional(),
  motherName: Joi.string().optional(),
  motherOccupation: Joi.string().optional(),
  motherContactNo: Joi.string().optional(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().optional(),
  occupation: Joi.string().optional(),
  contactNo: Joi.string().optional(),
  address: Joi.string().optional(),
});

const studentSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": "Student ID must be a string",
    "string.empty": "Student ID is required",
  }),
  name: userNameSchema.required().messages({
    "any.required": "Student name is required",
  }),
  gender: Joi.string().valid("male", "female", "Others").required().messages({
    "string.base": "Gender must be a string",
    "any.only": "{#value} is not a valid gender",
    "string.empty": "Gender is required",
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
  }),
  contactNo: Joi.string().optional(),
  emergencyContactNo: Joi.string().optional(),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "string.base": "Blood group must be a string",
      "any.only": "{#value} is not a valid blood group",
      "string.empty": "Blood group is required",
    }),
  presentAddress: Joi.string().optional(),
  permanentAddress: Joi.string().optional(),
  guardian: guardianSchema.required().messages({
    "any.required": "Guardian information is required",
  }),
  localGuardian: localGuardianSchema.required().messages({
    "any.required": "Local guardian information is required",
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().default("active").optional(),
});

export { studentSchema };
