import { useState } from "react";
import API from "../services/api";

function EditTaskModal({ task, refresh, close }) {

    const [data, setData] = useState({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const updateTask = async (e) => {
        e.preventDefault();

        try {

            await API.put(`/tasks/${task._id}`, data);

            refresh();

            close();

        } catch (err) {

            alert(err.response?.data?.message || "Update Failed");

        }
    };

    return (

        <div className="modal">

            <div className="modal-box">

                <h2>Edit Task</h2>

                <form onSubmit={updateTask}>

                    <input
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        rows="4"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                    />

                    <select
                        name="priority"
                        value={data.priority}
                        onChange={handleChange}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                    <select
                        name="status"
                        value={data.status}
                        onChange={handleChange}
                    >
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Done</option>
                    </select>

                    <div className="modal-buttons">

                        <button type="submit">
                            Update
                        </button>

                        <button
                            type="button"
                            onClick={close}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditTaskModal;