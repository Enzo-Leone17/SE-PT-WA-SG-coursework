import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Homepage.jsx";
import StudentsList from "./pages/StudentsList.jsx";
import StudentDetail from "./pages/StudentDetail.jsx";
import Courses from "./pages/Courses.jsx";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import { useState } from 'react';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <div className="min-h-screen min-w-7xl bg-gray-100">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/students" /> : <Login setAuth={setIsAuthenticated} />} />
            <Route path="/students" element={isAuthenticated ? <StudentsList /> : <Navigate to="/login" />} />
            <Route path="/students/:id" element={isAuthenticated ? <StudentDetail /> : <Navigate to="/login" />} />
            <Route path="/courses" element={isAuthenticated ? <Courses /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
