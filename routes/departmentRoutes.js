const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/', departmentController.getAllDepartments);

router.post('/', departmentController.createDepartment);

router.get('/:departmentId', departmentController.getDepartmentById);

router.put('/:departmentId', departmentController.updateDepartment);

router.delete('/:departmentId', departmentController.deleteDepartment);

module.exports = router;
