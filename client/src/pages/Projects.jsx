import { useEffect, useState } from "react";
import API from "../services/api";
import ProjectCard from "../components/ProjectCard";
import "./../css/projects.css";

function Projects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await API.post("/projects", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      getProjects();

      alert("Project Created Successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="projects-page">

      <div className="project-header">

        <h1>Projects</h1>

      </div>

      <form className="project-form" onSubmit={createProject}>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        ></textarea>

        <button>Create Project</button>

      </form>

      <div className="project-grid">

        {projects.length === 0 ? (
          <h3>No Projects Found</h3>
        ) : (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              refresh={getProjects}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default Projects;