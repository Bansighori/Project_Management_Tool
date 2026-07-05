import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Tasks from "./pages/Tasks";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import ProjectBoard from "./pages/ProjectBoard";


// Layout
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />
        <Route
    path="/notifications"
    element={<Notifications />}
/>

        {/* Main Layout */}

        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/project-board/:id" element={<ProjectBoard />} />

          <Route path="/projects/:id" element={<ProjectDetails />} />

          <Route path="/tasks" element={<Tasks />} />
          

          <Route path="/notifications" element={<Notifications />} />

          <Route path="/profile" element={<Profile />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;