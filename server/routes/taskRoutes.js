const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {

createTask,

getTasks,

updateTask,

deleteTask,

getMyTasks,

getDashboardStats

} = require("../controllers/taskController");


router.post("/", auth, createTask);

router.get("/my/tasks", auth, getMyTasks);
router.get("/dashboard/stats", auth, getDashboardStats);
router.get("/:projectId", auth, getTasks);

router.put("/:id", auth, updateTask);

router.delete("/:id", auth, deleteTask);

module.exports = router;