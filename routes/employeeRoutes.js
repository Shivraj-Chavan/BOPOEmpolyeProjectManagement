const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Create employee
router.post('/', employeeController.createEmployee);
router.get('/:employeeId', employeeController.getEmployee);
router.delete('/:employeeId',employeeController.deleteEmployee);
module.exports = router;
