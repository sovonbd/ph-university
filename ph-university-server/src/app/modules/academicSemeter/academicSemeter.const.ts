import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from "./academicSemeter.interface";

export const Months: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemesterName: TAcademicSemesterName[] = [
  "Winter",
  "Summer",
  "Fall",
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];

// check semester name with semester code
export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Winter: "01",
  Summer: "02",
  Fall: "03",
};
