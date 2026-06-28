const Member = require("../models/Member");
const User = require("../models/User");
const Project = require("../models/Project");
const Notification = require("../models/Notification");

// Add Member
const addMember = async (req, res) => {

    try {

        const { project, userId, role } = req.body;

        // Check User
        const user = await User.findById(userId);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        // Check Project
        const projectData = await Project.findById(project);

        if (!projectData) {

            return res.status(404).json({
                message: "Project not found"
            });

        }

        // Already Member?
        const exists = await Member.findOne({

            project,
            user: userId

        });

        if (exists) {

            return res.status(400).json({

                message: "User already added"

            });

        }

        // Create Member
        const member = await Member.create({

            project,
            user: userId,
            role

        });

        // Create Notification
        await Notification.create({

            user: userId,

            project,

            title: "Project Invitation",

            message: `You have been added to project "${projectData.title}".`,

            type: "MEMBER_ADDED"

        });

        res.status(201).json({

            message: "Member Added Successfully",

            member

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

// Get Members
const getMembers = async (req, res) => {

    try {

        const members = await Member.find({

            project: req.params.projectId

        }).populate("user", "name email");

        res.json(members);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    addMember,

    getMembers

};