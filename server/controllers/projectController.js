const Project = require("../models/Project");

const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      owner: req.user.id,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    res.json(project);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const updateProject = async (req, res) => {
    try {

        const { title, description, status } = req.body;

        const project = await Project.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found"
            });
        }

        project.title = title;
        project.description = description;
        project.status = status;

        await project.save();

        res.json({
            success: true,
            project
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({
      message: "Project Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};