import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import AddMemberModal from "../components/AddMemberModal";
import MemberList from "../components/MemberList";

import "../css/projectBoard.css";

function ProjectBoard() {

    const { id } = useParams();

    const [project, setProject] = useState(null);

    const [tasks, setTasks] = useState([]);

    const [showTaskModal, setShowTaskModal] = useState(false);

    const [showMemberModal, setShowMemberModal] = useState(false);

    useEffect(() => {

        loadProject();

        loadTasks();

    }, []);

    const loadProject = async () => {

        try {

            const res = await API.get(`/projects/${id}`);

            setProject(res.data.project);

        } catch (err) {

            console.log(err);

        }

    };

    const loadTasks = async () => {

        try {

            const res = await API.get(`/tasks/${id}`);

            setTasks(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    if (!project) {

        return <h2>Loading...</h2>;

    }

    const todo = tasks.filter(
        task => task.status === "To Do"
    );

    const progress = tasks.filter(
        task => task.status === "In Progress"
    );

    const done = tasks.filter(
        task => task.status === "Done"
    );
    return (

<div className="project-board">

    <div className="board-header">

        <div>

            <h1>{project.title}</h1>

            <p>{project.description}</p>

        </div>

        <div className="board-buttons">

            <button
                className="member-btn"
                onClick={() => setShowMemberModal(true)}
            >
                + Add Member
            </button>

            <button
                className="task-btn"
                onClick={() => setShowTaskModal(true)}
            >
                + Add Task
            </button>

        </div>

    </div>

    <div className="members-section">

        <h2>Team Members</h2>

        <MemberList projectId={id} />

    </div>

    <div className="kanban-board">

        <div className="column">

            <h2>📋 To Do</h2>

            {

                todo.length === 0 ?

                <p>No Tasks</p>

                :

                todo.map(task => (

                    <TaskCard

                        key={task._id}

                        task={task}

                        refresh={loadTasks}

                    />

                ))

            }

        </div>

        <div className="column">

            <h2>🚀 In Progress</h2>

            {

                progress.length === 0 ?

                <p>No Tasks</p>

                :

                progress.map(task => (

                    <TaskCard

                        key={task._id}

                        task={task}

                        refresh={loadTasks}

                    />

                ))

            }

        </div>

        <div className="column">

            <h2>✅ Done</h2>

            {

                done.length === 0 ?

                <p>No Tasks</p>

                :

                done.map(task => (

                    <TaskCard

                        key={task._id}

                        task={task}

                        refresh={loadTasks}

                    />

                ))

            }

        </div>

    </div>

    {

        showTaskModal &&

        <TaskModal

            projectId={id}

            refresh={loadTasks}

            close={() => setShowTaskModal(false)}

        />

    }

    {

        showMemberModal &&

        <AddMemberModal

            projectId={id}

            refresh={loadProject}

            close={() => setShowMemberModal(false)}

        />

    }

</div>

);

}

export default ProjectBoard;