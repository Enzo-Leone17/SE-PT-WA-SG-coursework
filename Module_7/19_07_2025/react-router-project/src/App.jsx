import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/common/Navbar.jsx";
import CountryDetail from "./pages/CountryDetail.jsx";
import CountryCard from "./components/CountryCard.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";


function App() {
  // const links = [{name: "Countries", link: "countries"}];
  // return (
  //   <Router>
  //     <div className="min-h-screen min-w-7xl bg-gray-100">
  //       <Navbar links={links} baseUrlname={"Home"}/>
  //       <Routes>
  //           <Route path="/" element={<Home welcomeMsg={"Welcome to my Country Project"}/>} />
  //           <Route path="/countries" element={<CountryDetail />} />
  //           <Route path="/countries/:countryCode" element={<CountryCard />} />
  //       </Routes>
  //     </div>
  //   </Router>
  // );

  const links = [{name: "Login", link: "login"}, {name: "Profile", link: "profile"}];
  return (
    <Router>
      <div className="min-h-screen min-w-7xl bg-gray-100">
        <Navbar links={links} baseUrlname={"Home"}/>
        <Routes>
            <Route path="/" element={<Home welcomeMsg={"Welcome to my React router project"}/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
