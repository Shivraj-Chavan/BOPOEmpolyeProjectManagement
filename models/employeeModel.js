const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  departmentId: { type:String, required: true },
  onBoardDate: {type:Date,default:Date.now()},
  age: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Employee', employeeSchema);
