import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaProjectDiagram,
  FaTasks,
  FaBell,
  FaUser,
  FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

  const location = useLocation();

  const menus = [

    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard"
    },

    {
      name: "Projects",
      icon: <FaProjectDiagram />,
      path: "/projects"
    },

    {
      name: "Tasks",
      icon: <FaTasks />,
      path: "/tasks"
    },

    {
      name: "Notifications",
      icon: <FaBell />,
      path: "/notifications"
    }

  ];

  return (

    <aside className="sidebar">

      <div className="logo">

        <h2>TaskFlow</h2>

      </div>

      <nav>

        {
          menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              className={location.pathname === menu.path ? "active" : ""}
            >

              <span className="icon">{menu.icon}</span>

              <span>{menu.name}</span>

            </Link>

          ))
        }

      </nav>

      <div className="logout">

        <Link to="/login">

          <FaSignOutAlt />

          Logout

        </Link>

      </div>

    </aside>

  );

}

export default Sidebar;