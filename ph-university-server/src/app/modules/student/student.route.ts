import express from "express";
import { StudentControllers } from "./student.controller";

// step-6: create the api route and exchange the data
const router = express.Router();

router.get("/", StudentControllers.getAllStudents);
router.get("/:id", StudentControllers.getSingleStudent);
router.delete("/:id", StudentControllers.deleteStudent);

export const StudentRoutes = router;
