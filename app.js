const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const employeeRoutes = require('./routes/employeeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const projectRoutes = require('./routes/projectRoutes');
require("./config/dbconfig")
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
dotenv.config()
// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/projects', projectRoutes);




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
