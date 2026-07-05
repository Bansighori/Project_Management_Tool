import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./css/global.css";
import "./css/sidebar.css";
import "./css/navbar.css";
import "./css/auth.css";
import "./css/projects.css";
import "./css/dashboard.css";
import "./css/comment.css";
import "./css/tasks.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);