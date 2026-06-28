const Comment = require("../models/Comment");
const Task = require("../models/Task");
const Notification = require("../models/Notification");
const User = require("../models/User");

// Create Comment
const createComment = async (req, res) => {

    try {

        // Create Comment
        const comment = await Comment.create({

            taskId: req.body.taskId,

            userId: req.user.id,

            message: req.body.message

        });

        // Find Task
        const task = await Task.findById(req.body.taskId);

        // Find Logged In User
        const user = await User.findById(req.user.id);

        // Create Notification
        if (task && task.assignedTo) {

            await Notification.create({

                user: task.assignedTo,

                project: task.projectId,

                task: task._id,

                title: "New Comment",

                message: `${user.name} commented: "${req.body.message}"`,

                type: "COMMENT"

            });

        }

        res.status(201).json(comment);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// Get Comments
const getComments = async (req, res) => {

    try {

        const comments = await Comment.find({

            taskId: req.params.taskId

        }).populate("userId", "name email");

        res.json(comments);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    createComment,

    getComments

};