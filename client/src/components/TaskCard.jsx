import API from "../services/api";
import { FaTrash, FaEdit } from "react-icons/fa";
import CommentBox from "./CommentBox";
import "./../css/tasks.css";
const user = JSON.parse(localStorage.getItem("user"));

function TaskCard({ task, refresh }) {
    const isAssignedUser =
    task.assignedTo &&
    task.assignedTo._id === user._id;
    const deleteTask = async () => {

        if (!window.confirm("Delete this task?")) return;

        try {

            await API.delete(`/tasks/${task._id}`);

            refresh();

        } catch (err) {

            alert(err.response?.data?.message || "Delete Failed");

        }

    };

    const changeStatus = async (status) => {

        try {

            await API.put(`/tasks/${task._id}`, {
                status
            });

            refresh();

        } catch (err) {

            alert(err.response?.data?.message || "Update Failed");

        }

    };

    return (

    <div className="task-card">

        <h3>{task.title}</h3>

        <p>{task.description}</p>

        <p>

            <strong>Assigned To:</strong>{" "}

            {task.assignedTo ? task.assignedTo.name : "Unassigned"}

        </p>

        <p>

            <strong>Due Date:</strong>{" "}

            {

                task.dueDate

                    ? new Date(task.dueDate).toLocaleDateString()

                    : "-"

            }

        </p>

        <div className={`priority ${task.priority}`}>

            {task.priority}

        </div>

        {
    isAssignedUser ? (

        <div className="task-buttons">

            <button
                className="todo"
                onClick={() => changeStatus("To Do")}
            >
                To Do
            </button>

            <button
                className="progress"
                onClick={() => changeStatus("In Progress")}
            >
                Progress
            </button>

            <button
                className="done"
                onClick={() => changeStatus("Done")}
            >
                Done
            </button>

        </div>

    ) : (

        <div className="status-lock">

            🔒 Only the assigned member can update this task.

        </div>

    )
}

        <div className="task-action">

            <button className="edit-btn">

                <FaEdit />

            </button>

            <button
                className="delete-btn"
                onClick={deleteTask}
            >

                <FaTrash />

            </button>

        </div>

        {/* Comments Section */}

        <CommentBox taskId={task._id} />

    </div>

);

}

export default TaskCard;