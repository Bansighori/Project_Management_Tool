import { useState, useEffect } from "react";
import API from "../services/api";

function TaskModal({ projectId, refresh, close }) {

    const [members, setMembers] = useState([]);

    const [data, setData] = useState({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
        assignedTo: ""
    });

    useEffect(() => {
        loadMembers();
    }, []);

    const loadMembers = async () => {

        try {

            const res = await API.get(`/members/${projectId}`);

            setMembers(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const change = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value
        });

    };

    const submit = async (e) => {

        e.preventDefault();

        try {

            const taskData = {

                title: data.title,
                description: data.description,
                priority: data.priority,
                dueDate: data.dueDate,
                projectId

            };

            if (data.assignedTo && data.assignedTo.trim() !== "") {

                taskData.assignedTo = data.assignedTo;

            }

            await API.post("/tasks", taskData);

            alert("Task Created Successfully");

            refresh();

            close();

        } catch (err) {

            alert(err.response?.data?.message || "Error creating task");

        }

    };

    return (

        <div className="modal">

            <div className="modal-box">

                <h2>Create Task</h2>

                <form onSubmit={submit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Task Title"
                        value={data.title}
                        onChange={change}
                        required
                    />

                    <textarea
                        name="description"
                        rows="4"
                        placeholder="Description"
                        value={data.description}
                        onChange={change}
                    />

                    <select
                        name="priority"
                        value={data.priority}
                        onChange={change}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>

                    <input
                        type="date"
                        name="dueDate"
                        value={data.dueDate}
                        onChange={change}
                    />

                    <select
                        name="assignedTo"
                        value={data.assignedTo}
                        onChange={change}
                    >
                        <option value="">Assign Member</option>

                        {members.map((member) => (

                            <option
                                key={member._id}
                                value={member.user._id}
                            >
                                {member.user.name}
                            </option>

                        ))}

                    </select>

                    <div className="modal-buttons">

                        <button type="submit">
                            Create Task
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

export default TaskModal;