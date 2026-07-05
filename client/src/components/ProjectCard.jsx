import API from "../services/api";
import { FaEdit, FaTrash, FaFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditProjectModal from "./EditProjectModal";

function ProjectCard({ project, refresh }) {

    const navigate = useNavigate();
    const [showEdit, setShowEdit] = useState(false);
    const deleteProject = async () => {
        
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this project?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/projects/${project._id}`);

            alert("Project Deleted Successfully");

            refresh();

        } catch (err) {

            alert(err.response?.data?.message || "Delete Failed");

        }

    };

    return (

        <div className="project-card">

            <div className="project-top">

                <h2>{project.title}</h2>

                <span className="status">

                    {project.status}

                </span>

            </div>

            <p className="description">

                {project.description}

            </p>

            <div className="date">

                Created :
                {" "}
                {new Date(project.createdAt).toLocaleDateString()}
            </div>

            <div className="project-buttons">

                <button
    className="open-btn"
    onClick={() => navigate(`/project-board/${project._id}`)}
>
    <FaFolderOpen />
    Open
</button>

                <button
    className="edit-btn"
    onClick={() => setShowEdit(true)}
>

    <FaEdit />

    Edit

</button>

                <button
                    className="delete-btn"
                    onClick={deleteProject}
                >

                    <FaTrash />

                    Delete

                </button>

            </div>
{
showEdit &&

<EditProjectModal

project={project}

refresh={refresh}

close={() => setShowEdit(false)}

/>

}
        </div>

    );

}

export default ProjectCard;