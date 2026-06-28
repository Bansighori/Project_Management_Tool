const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    },

    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"
    },

    title:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    type:{
        type:String,
        enum:[
            "TASK_ASSIGNED",
            "TASK_UPDATED",
            "COMMENT",
            "MEMBER_ADDED"
        ]
    },

    isRead:{
        type:Boolean,
        default:false
    }

},{
timestamps:true
});

module.exports = mongoose.model("Notification",notificationSchema);