const Project = require("../models/Project");
const Task = require("../models/Task");

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
      owner: req.user.id
    });

    const projectData = await Promise.all(
      projects.map(async (project) => {

        const tasks = await Task.find({
          projectId: project._id
        });

        const totalTasks = tasks.length;

        const completedTasks = tasks.filter(
          task => task.status === "Done"
        ).length;

        const pendingTasks = totalTasks - completedTasks;

        const progress =
          totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

        return {
          ...project.toObject(),
          totalTasks,
          completedTasks,
          pendingTasks,
          progress
        };
      })
    );

    res.json(projectData);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};
const getProject = async (req, res) => {

    try {

        console.log("Project ID:", req.params.id);

        const project = await Project.findById(req.params.id)
            .populate("owner", "name email")
            .populate("members", "name email");

        console.log(project);

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found"
            });
        }

        const tasks = await Task.find({
            projectId: project._id
        })
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email");

        console.log(tasks);

        res.json({
            project,
            tasks,
            totalTasks: tasks.length,
            completedTasks: tasks.filter(t => t.status === "Done").length,
            pendingTasks: tasks.filter(t => t.status !== "Done").length,
            progress:
                tasks.length === 0
                    ? 0
                    : Math.round(
                        tasks.filter(t => t.status === "Done").length * 100 / tasks.length
                    )
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
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