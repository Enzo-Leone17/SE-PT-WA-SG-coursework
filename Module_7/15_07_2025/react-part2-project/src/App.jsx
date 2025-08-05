import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import ListUserIDs from "./pages/ListUserIDs.jsx";
import Dashboard from "./pages/DashBoard.jsx";
import GitHubUserSearch from "./components/GitHubUserSearch.jsx";
function App() {
  return (
    <Router>
      <div className="min-h-screen min-w-7xl bg-gray-100">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/list" element={<ListUserIDs />} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      < GitHubUserSearch username={"Enzo-Leone17"}/>
    </Router>
  );
}

export default App;
