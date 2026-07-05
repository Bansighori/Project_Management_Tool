const Task = require("../models/Task");
const Notification=require("../models/Notification");
const Project = require("../models/Project");

// Create Task
const createTask = async (req, res) => {
    try {

        console.log("req.user =", req.user);
        console.log("req.body =", req.body);

        const data = {
            projectId: req.body.projectId,
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            dueDate: req.body.dueDate,
            assignedTo: req.body.assignedTo || null,
            createdBy: req.user.id
        };

        console.log("Saving:", data);

        const task = await Task.create(data);

if (task.assignedTo) {

    await Notification.create({

        user: task.assignedTo,

        project: task.projectId,

        task: task._id,

        title: "Task Assigned",

        message: `You have been assigned "${task.title}".`,

        type: "TASK_ASSIGNED"

    });

}

res.status(201).json(task);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
};
// Get Tasks of One Project
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
    projectId: req.params.projectId
})
.populate("assignedTo", "name email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getDashboardStats = async (req, res) => {

    try {

        const myProjects = await Project.countDocuments({

            owner: req.user.id

        });

        const createdTasks = await Task.countDocuments({

            createdBy: req.user.id

        });

        const assignedTasks = await Task.countDocuments({

            assignedTo: req.user.id

        });

        const completed = await Task.countDocuments({

            assignedTo: req.user.id,

            status: "Done"

        });

        const pending = await Task.countDocuments({

            assignedTo: req.user.id,

            status: {
                $ne: "Done"
            }

        });

        res.json({

            myProjects,

            createdTasks,

            assignedTasks,

            completed,

            pending

        });

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// Update Task
const updateTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id);

        if (!task) {

            return res.status(404).json({
                message: "Task not found"
            });

        }

        // Only assigned user can change status
        if (
            req.body.status &&
            task.assignedTo &&
            task.assignedTo.toString() !== req.user.id
        ) {

            return res.status(403).json({

                message: "Only assigned member can update task status."

            });

        }

        Object.assign(task, req.body);

        await task.save();

        res.json(task);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task Deleted",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getMyTasks = async (req, res) => {

    try {

        const tasks = await Task.find({

            assignedTo: req.user.id

        })
        .populate("projectId", "title")
        .populate("assignedTo", "name email")
        .populate("createdBy", "name email");

        res.json(tasks);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
module.exports = {

    createTask,

    getTasks,

    updateTask,

    deleteTask,

    getMyTasks,

    getDashboardStats

};