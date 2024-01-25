const Department = require('../models/departmentModel');
const Employe = require('../models/employeeModel');
const errorHandlers = require('../utils/errorHandlers');

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ departments });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

// Create a new department
const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const departmentCount = await Department.find().count();
    const departmentId = `DEPT${(departmentCount + 1).toString().padStart(3, '0')}`;


    const department = new Department({
      name,
      departmentId,
    });
    await department.save();
    res.status(201).json({ message: 'Department created successfully', department });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

// Get department by ID
const getDepartmentById = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const department = await Department.findOne({departmentId});

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    const emp=await Employe.findOne({departmentId})
    res.status(200).json({   
       departmentId :department.departmentId,
      departmentName : department.name,
      employeeId : emp.employeeId,
      employeeName: emp.fName
});
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

// Update  department by ID
const updateDepartment = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const { name } = req.body;

    const department = await Department.findByIdAndUpdate(
      departmentId,
      { name},
      { new: true, runValidators: true }
    );

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department updated successfully', department });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

// Delete department by ID
const deleteDepartment = async (req, res) => {
  try {
    const departmentId = req.params.departmentId;
    const department = await Department.findByIdAndDelete(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

module.exports = {
  getAllDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
