const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    // validation using joi
    // const { error, value } = studentSchema.validate(studentData);
    // if (error) {
    //   res.status(400).json({
    //     success: false,
    //     message: "Something is wrong",
    //     data: error.details,
    //   });
    // }
    // const result = await StudentService.createStudentIntoDB(value);

    // validation usin zod
    const studentValidation = studentSchema.parse(studentData);

    const result = await StudentService.createStudentIntoDB(studentValidation);
    res.status(200).json({
      success: true,
      mesage: "Student is created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message || "Something is wrong",
      data: error,
    });
  }
};
