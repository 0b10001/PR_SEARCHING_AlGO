const express = require("express");
const {
  getStudents,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
} = require("../controllers/studentController");

const router = express.Router();

// GET all Students
router.get("/", getStudents);

// GET a single Student
router.get("/:id", getStudent);

// POST a new Student
router.post("/", createStudent);

// DELETE a Student
router.delete("/:id", deleteStudent);

// UPDATE a Student
router.patch("/:id", updateStudent);

module.exports = router;
