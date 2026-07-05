import "./../css/taskDetails.css";
import CommentBox from "./CommentBox";

function TaskDetailsModal({ task, close }) {

    if (!task) return null;

    return (

        <div className="task-modal-overlay">

            <div className="task-modal">

                <button
                    className="close-btn"
                    onClick={close}
                >
                    ✖
                </button>

                <h2>{task.title}</h2>

                <p>
                    <strong>Description :</strong><br />
                    {task.description}
                </p>

                <p>
                    <strong>Project :</strong>
                    {" "}
                    {task.projectId?.title}
                </p>

                <p>
                    <strong>Assigned By :</strong>
                    {" "}
                    {task.createdBy?.name}
                </p>

                <p>
                    <strong>Assigned To :</strong>
                    {" "}
                    {task.assignedTo?.name || "Unassigned"}
                </p>

                <p>
                    <strong>Priority :</strong>
                    {" "}
                    {task.priority}
                </p>

                <p>
                    <strong>Status :</strong>
                    {" "}
                    {task.status}
                </p>

                <p>
                    <strong>Due Date :</strong>
                    {" "}
                    {
                        task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "-"
                    }
                </p>

                <hr />

                <CommentBox taskId={task._id} />

            </div>

        </div>

    );

}

export default TaskDetailsModal;