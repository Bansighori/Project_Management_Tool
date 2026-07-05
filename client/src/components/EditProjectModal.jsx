import { useState } from "react";
import API from "../services/api";

function EditProjectModal({ project, close, refresh }) {

    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [status, setStatus] = useState(project.status);

    const updateProject = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/projects/${project._id}`, {
                title,
                description,
                status
            });

            alert("Project Updated");

            refresh();

            close();

        } catch (err) {

            alert(err.response?.data?.message);

        }

    };

    return (

        <div className="modal">

            <div className="modal-box">

                <h2>Edit Project</h2>

                <form onSubmit={updateProject}>

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >

                        <option>Active</option>

                        <option>Completed</option>

                    </select>

                    <div className="modal-buttons">

                        <button>

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

export default EditProjectModal;