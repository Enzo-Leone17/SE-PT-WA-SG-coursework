import BitcoinPage from "./pages/BitcoinPage";
import HomePage from "./pages/Home";
import Navbar from "./components/Lab_Ex_4N5/Navbar";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
    <Router>
      <Navbar links={[{ to: "/", label: "Home" }, { to: "/login", label: "Login" }, { to: "/BitcoinRates", label: "Bitcoin Rates" }]}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/BitcoinRates" element={<BitcoinPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
