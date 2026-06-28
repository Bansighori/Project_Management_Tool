const Task = require("../models/Task");
const Notification=require("../models/Notification");

// Create Task
const createTask = async (req, res) => {
  try {
    const task=await Task.create(req.body);

if(task.assignedTo){

await Notification.create({

user:task.assignedTo,

project:task.projectId,

task:task._id,

title:"Task Assigned",

message:`${task.title} has been assigned to you.`,

type:"TASK_ASSIGNED"

});
}
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
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

// Update Task
const updateTask = async (req,res)=>{

try{

const task = await Task.findByIdAndUpdate(

req.params.id,

req.body,

{new:true}

);

if(task.assignedTo){

await Notification.create({

user:task.assignedTo,

project:task.projectId,

task:task._id,

title:"Task Updated",

message:`${task.title} has been updated.`,

type:"TASK_UPDATED"

});

}

res.json(task);

}

catch(err){

res.status(500).json({

message:err.message

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
        .populate("assignedTo", "name email");

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
    getMyTasks
};