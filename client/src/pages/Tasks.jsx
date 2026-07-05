import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaEdit,
  FaTrash
} from "react-icons/fa";
import "../css/tasks.css";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {

    try {

      const projectRes = await API.get("/projects");

      let allTasks = [];

      for (const project of projectRes.data) {

        const taskRes = await API.get(`/tasks/${project._id}`);

        allTasks = [...allTasks, ...taskRes.data];

      }

      setTasks(allTasks);

    } catch (err) {

      console.log(err);

    }

  };

  useEffect(() => {

    loadTasks();

  }, []);

  const deleteTask = async (id) => {

    if (!window.confirm("Delete Task?")) return;

    try {

      await API.delete(`/tasks/${id}`);

      loadTasks();

    } catch (err) {

      alert(err.response?.data?.message);

    }

  };

  return (

    <div className="tasks-page">

      <h1>All Tasks</h1>

      <table>

        <thead>

          <tr>

            <th>Title</th>

            <th>Status</th>

            <th>Priority</th>

            <th>Due Date</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {

            tasks.length === 0 ?

            (

              <tr>

                <td colSpan="5">

                  No Tasks Found

                </td>

              </tr>

            )

            :

            tasks.map(task => (

              <tr key={task._id}>

                <td>{task.title}</td>

                <td>{task.status}</td>

                <td>{task.priority}</td>

                <td>

                  {

                    task.dueDate ?

                    new Date(task.dueDate).toLocaleDateString()

                    :

                    "-"

                  }

                </td>

                <td>

                  <button className="edit">

                    <FaEdit />

                  </button>

                  <button
                    className="delete"
                    onClick={() => deleteTask(task._id)}
                  >

                    <FaTrash />

                  </button>

                </td>

              </tr>

            ))

          }

        </tbody>

      </table>

    </div>

  );

}

export default Tasks;