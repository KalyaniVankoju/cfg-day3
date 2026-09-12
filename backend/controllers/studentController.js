const Student = require('../models/Student');

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Failed to  students' });
  }
};

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    if (error.name === 'ValidationError' || error.code === 11000) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: 'Failed to create student' });
  }
};

module.exports = {
  getStudents,
  createStudent,
};
