import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Greeting from "./components/Greeting.jsx";
import Welcome from "./components/Welcome.jsx";
import FruitsList from "./components/FruitsList.jsx";
import BasicModal from "./components/common/Modal.jsx";
import TeamList from "./components/TeamList.jsx";
import DashBoard from "./components/DashBoard.jsx";


//team members data
const team = [
  { name: "Jane", title: "Project Manager", avatar: "/avatars/jane.jpg" },
  { name: "Leo", title: "UI/UX Designer", avatar: "/avatars/leo.jpg" },
  { name: "Sam", title: "Full-Stack Dev", avatar: "/avatars/sam.jpg" },
];

//dashboard data
const dashboard = {
  user: { name: 'Alex', role: 'Manager' },
  stats: { tasks: 12, meetings: 3 },
  recent: ['Submitted report', 'Team call', 'Reviewed tasks']
};



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Greeting />
      <Welcome name="John Doe" />
      <FruitsList />
      <TeamList team={team} />
      <br/>
      <br/>
      <hr/>
      <DashBoard dashboardData={dashboard}/>
    </>
  );
}

export default App;
