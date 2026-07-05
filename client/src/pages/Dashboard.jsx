import { useEffect, useState } from "react";
import API from "../services/api";
import "./../css/dashboard.css";
import { Link } from "react-router-dom";


function Dashboard() {

    const [stats, setStats] = useState({

    myProjects:0,

    createdTasks:0,

    assignedTasks:0,

    completed:0,

    pending:0

});
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [myTasks, setMyTasks] = useState([]);
const [loading, setLoading] = useState(true);

    useEffect(() => {

    loadDashboard();
    loadStats();

    loadMyTasks();

}, []);
    const loadStats = async () => {

    const res = await API.get("/tasks/dashboard/stats");

    setStats(res.data);

};
const changeStatus = async (taskId, status) => {

    try {

        await API.put(`/tasks/${taskId}`, {
            status
        });

        await loadStats();
        await loadMyTasks();
        await loadDashboard();

    } catch (err) {

        alert(err.response?.data?.message || "Unable to update status");

    }

};
    const loadDashboard = async () => {

    try {

        await loadStats();

        const projectRes = await API.get("/projects");

        setProjects(projectRes.data);

        let allTasks = [];

        for (let project of projectRes.data) {

            const taskRes = await API.get(`/tasks/${project._id}`);

            allTasks = [...allTasks, ...taskRes.data];

        }

        setTasks(allTasks);

    } catch (err) {

        console.log(err);

    }

};
    const loadMyTasks = async () => {

    try {

        const res = await API.get("/tasks/my/tasks");

        setMyTasks(res.data);

    } catch (err) {

        console.log(err);

    } finally {

        setLoading(false);

    }
    
};

    const completed = myTasks.filter(
    task => task.status === "Done"
).length;

const progress = myTasks.filter(
    task => task.status === "In Progress"
).length;

const todo = myTasks.filter(
    task => task.status === "To Do"
).length;

    return (

        <div className="dashboard">

            <div className="welcome-card">

    <div>

        <h1>

            Good {

                new Date().getHours() < 12

                    ? "Morning"

                    : new Date().getHours() < 17

                    ? "Afternoon"

                    : "Evening"

            },

            {" "}

            {JSON.parse(localStorage.getItem("user"))?.name} 👋

        </h1>

        <p>

            Welcome back to TaskFlow.

            Manage your projects and tasks efficiently.

        </p>

    </div>

</div>

            <div className="dashboard-cards">

    <div className="dashboard-card">
        <h2>{stats.myProjects}</h2>
        <p>My Projects</p>
    </div>

    <div className="dashboard-card">
        <h2>{stats.createdTasks}</h2>
        <p>Created Tasks</p>
    </div>

    <div className="dashboard-card">
        <h2>{stats.assignedTasks}</h2>
        <p>Assigned Tasks</p>
    </div>

    <div className="dashboard-card">
        <h2>{stats.completed}</h2>
        <p>Completed</p>
    </div>

    <div className="dashboard-card">
        <h2>{stats.pending}</h2>
        <p>Pending</p>
    </div>

</div>

            <div className="dashboard-section">

                <div className="recent-projects">

                    <h2>Recent Projects</h2>

                    {

                        projects.map(project => (

                           <Link
    key={project._id}
    to={`/projects/${project._id}`}
    className="recent-item-link"
>

    <div className="recent-item">

        <h3>{project.title}</h3>

        <p>{project.description}</p>

        <div className="project-stats">

            <p>👥 Members : {project.members?.length || 0}</p>

            <p>📋 Tasks : {project.totalTasks}</p>

            <p>✅ Completed : {project.completedTasks}</p>

            <p>⏳ Pending : {project.pendingTasks}</p>

        </div>

        <div className="progress-bar">

            <div
                className="progress-fill"
                style={{
                    width: `${project.progress}%`
                }}
            ></div>

        </div>

        <small>{project.progress}% Completed</small>

    </div>

</Link>

                        ))

                    }

                </div>
                <div className="my-task-section">

    <h2>My Assigned Tasks</h2>

    {

        loading ?

        <p>Loading...</p>

        :

        myTasks.length === 0 ?

        <p>No Tasks Assigned</p>

        :

        myTasks.map(task => (

            <div
                key={task._id}
                className="my-task-card"
            >

                <h3>{task.title}</h3>

                <p>

                    <strong>Project :</strong>

                    {task.projectId?.title}

                </p>
                <p>
    <strong>Assigned By :</strong>{" "}
    {task.createdBy?.name || "Unknown"}
</p>

                <p>

    <strong>Status :</strong>

</p>

<select

    value={task.status}

    onChange={(e) => changeStatus(task._id, e.target.value)}

    className="status-select"

>

    <option value="To Do">To Do</option>

    <option value="In Progress">In Progress</option>

    <option value="Done">Done</option>

</select>

                <p>

                    <strong>Priority :</strong>

                    {task.priority}

                </p>

                <p>

                    <strong>Due :</strong>

                    {

                        task.dueDate ?

                        new Date(task.dueDate).toLocaleDateString()

                        :

                        "-"

                    }

                </p>

            </div>

        ))

    }

</div>
                <div className="task-summary">

                    <h2>Task Summary</h2>

                    <div className="summary-item">

                        To Do : {todo}

                    </div>

                    <div className="summary-item">

                        In Progress : {progress}

                    </div>

                    <div className="summary-item">

                        Completed : {completed}

                    </div>

                </div>

            </div>

        </div>

    );

}
<div className="recent-activity">

<h2>Recent Activity</h2>

<div className="activity-item">

✅ You logged in.

</div>

<div className="activity-item">

📁 Project created.

</div>

<div className="activity-item">

📝 Task assigned.

</div>

</div>

export default Dashboard;