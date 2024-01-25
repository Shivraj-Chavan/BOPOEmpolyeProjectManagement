const Department = require('../models/departmentModel');
const Employee = require('../models/employeeModel');
const errorHandlers = require('../utils/errorHandlers');
const Project = require('../models/projectModel');

const createEmployee = async (req, res) => {
  try {
    const { fName, lName, departmentId, onBoardDate, age } = req.body;
    const employeeCount = await Employee.find().count();
    const employeeId = `EMP${(employeeCount + 1).toString().padStart(3, '0')}`;
    const dept=Department.findOne({departmentId})
    if(!dept){
     res.status(404).json({ message: 'Department not found' });
    }
    const employee = new Employee({
      employeeId,
      fName,
      lName,
      departmentId,
      onBoardDate,
      age,
    });

    await employee.save();

    res.status(201).json({ message: 'Employee created successfully', employee });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

const getEmployee=async(req,res)=>{
  try {
    const employeeId = req.params.employeeId;
    const employe = await Employee.findOne({employeeId});

    if (!employe) {
      return res.status(404).json({ message: 'EMploye not found' });
    }

    const dept=await Department.findOne({departmentId:employe.departmentId})
    const prj=await Project.findOne({employeeId:employe.employeeId})

    res.status(200).json({ 
      employeeId:employe.employeeId,
      employeeName:employe.fName,
      departmentId : employe.departmentId,
      departmentName :  dept.name,
          currentlyWorkingProject : {
                 projectId : prj.projectId,
                 projectName :   prj.projectName
          }
      
     });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
}

const deleteEmployee=async(req,res)=>{
  let employeeId = req.params.employeeId;
  try {
      let emp=await Employee.findOne({employeeId})
      emp.isDeleted=true
      await emp.save()
      res.status(200).json({message:"emp deleted.."})
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  createEmployee,
  getEmployee,
  deleteEmployee
};
