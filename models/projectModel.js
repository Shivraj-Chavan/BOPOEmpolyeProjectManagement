const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true },
  projectName:{type:String,required:true},
  employeeId:{type:String,required:true},
  startedOn:{type:Date,default:Date.now()},
});

module.exports = mongoose.model('Project', projectSchema);
