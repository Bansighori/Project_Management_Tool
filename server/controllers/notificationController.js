const Notification = require("../models/Notification");

// Get Logged-in User Notifications
const getNotifications = async (req, res) => {

    try {

        const notifications = await Notification.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        res.json(notifications);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};

// Mark Notification as Read
const markAsRead = async (req, res) => {

    try {

        const notification = await Notification.findByIdAndUpdate(

            req.params.id,

            {
                isRead: true
            },

            {
                new: true
            }

        );

        res.json(notification);

    } catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {

    getNotifications,

    markAsRead

};