const Project = require('../models/projectModel');
const errorHandlers = require('../utils/errorHandlers');

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

// Create a new project
const createProject = async (req, res) => {
  try {
    const { projectName,employeeId, startDate, endDate } = req.body;

    const projectCount = await Project.find().count();
    const projectId = `PROJ${(projectCount + 1).toString().padStart(3, '0')}`;

    const project = new Project({
      projectName,
      projectId,
      employeeId,
      startDate,
      endDate,
    });
    await project.save();

    res.status(201).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

// Get specific project by ID
const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.find({projectId});

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

// Update project by ID
const updateProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const { name, description, startDate, endDate } = req.body;

    const project = await Project.findByIdAndUpdate(
      projectId,
      { name, description, startDate, endDate },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

// Delete project by ID
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findByIdAndDelete(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    errorHandlers.handle500Error(res, 'Internal Server Error');
  }
};

module.exports = {
  getAllProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
};
