import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import "../css/projectDetails.css";

function ProjectDetails() {

    const { id } = useParams();

    const [data, setData] = useState(null);

    useEffect(() => {
        loadProject();
    }, []);

    const loadProject = async () => {
    try {
        const res = await API.get(`/projects/${id}`);

        console.log("SUCCESS");
        console.log(res.data);

        setData(res.data);

    } catch (err) {

        console.log("ERROR");

        console.log(err);

        console.log(err.response);

        console.log(err.response?.data);
    }
};

    if (!data) return <h2>Loading...</h2>;

    return (

<div className="project-details">

    <Link
        to="/projects"
        className="back-btn"
    >
        ← Back to Projects
    </Link>

    {/* Project Header */}

    <div className="project-header">

        <div className="header-left">

            <h1>{data.project.title}</h1>

            <p>{data.project.description}</p>

            <div className="project-meta">

                <span>
                    👤 Owner :
                    <strong>
                        {" "}
                        {data.project.owner?.name}
                    </strong>
                </span>

                <span>
                    📧 {data.project.owner?.email}
                </span>

                <span>
                    📅 Created :
                    {" "}
                    {new Date(data.project.createdAt).toLocaleDateString()}
                </span>

            </div>

        </div>

    </div>

    {/* Dashboard Cards */}

    <div className="stats-grid">

        <div className="stat-card">

            <h1>{data.totalTasks}</h1>

            <p>Total Tasks</p>

        </div>

        <div className="stat-card">

            <h1>{data.completedTasks}</h1>

            <p>Completed</p>

        </div>

        <div className="stat-card">

            <h1>{data.pendingTasks}</h1>

            <p>Pending</p>

        </div>

        <div className="stat-card">

            <h1>{data.project.members.length + 1}</h1>

            <p>Members</p>

        </div>

    </div>

    {/* Progress */}

    <div className="progress-section">

        <div className="progress-top">

            <h2>Project Progress</h2>

            <h2>{data.progress}%</h2>

        </div>

        <div className="progress-bar">

            <div
                className="progress-fill"
                style={{
                    width: `${data.progress}%`
                }}
            ></div>

        </div>

    </div>

    {/* Members */}

    <h2 className="section-title">

        👥 Team Members

    </h2>

    <div className="member-list">

        <div className="member-card owner">

            👑 {data.project.owner?.name}

            <small>Owner</small>

        </div>

        {

            data.project.members.map(member => (

                <div
                    key={member._id}
                    className="member-card"
                >

                    👤 {member.name}

                </div>

            ))

        }

    </div>

    {/* Tasks */}

    <h2 className="section-title">

        📋 Project Tasks

    </h2>

            {/* Tasks */}

            

            {

                data.tasks.length === 0 ?

                    <p>No Tasks Found</p>

                    :

                    <div className="task-grid">

                        {

                            data.tasks.map(task => (

                                <div
                                    key={task._id}
                                    className="task-card"
                                >

                                    <h3>{task.title}</h3>

                                    <p>{task.description}</p>

                                    <hr />

                                    <p>

                                        <strong>Assigned To :</strong>{" "}

                                        {

                                            task.assignedTo

                                                ? task.assignedTo.name

                                                : "Unassigned"

                                        }

                                    </p>

                                    <p>

                                        <strong>Assigned By :</strong>{" "}

                                        {

                                            task.createdBy

                                                ? task.createdBy.name

                                                : "-"

                                        }

                                    </p>

                                    <p>

                                        <strong>Priority :</strong>{" "}

                                        {task.priority}

                                    </p>

                                    <p>

                                        <strong>Status :</strong>{" "}

                                        {task.status}

                                    </p>

                                    <p>

                                        <strong>Due Date :</strong>{" "}

                                        {

                                            task.dueDate

                                                ? new Date(task.dueDate).toLocaleDateString()

                                                : "-"

                                        }

                                    </p>

                                    <button className="view-btn">

                                        View Details

                                    </button>

                                </div>

                            ))

                        }

                    </div>

            }

            {/* Activity */}

            <h2>Recent Activity</h2>

            <div className="activity-box">

                <p>✅ Project Created</p>

                <p>👥 Members Added</p>

                <p>📝 Tasks Assigned</p>

                <p>✔ Task Completed</p>

                <p>💬 Comments Added</p>

            </div>

        </div>

    );

}

export default ProjectDetails;