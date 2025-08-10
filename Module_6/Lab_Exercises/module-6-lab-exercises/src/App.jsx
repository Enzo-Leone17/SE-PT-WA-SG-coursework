import "./App.css";
import {
  GreetingName,
  GreetingExtended,
} from "./components/Lab_Ex_1/Greeting.jsx";
import BigCat from "./components/Lab_Ex_2And4/BigCat.jsx";
import MoodEmoji from "./components/Lab_Ex_3/MoodEmoji.jsx";
import { BigCatProvider } from "./context/useBigCatContext.jsx";
import AddCatForm from "./components/Lab_Ex_5/AddCatForm.jsx";
import Calculator from "./components/Lab_Ex_6/Calculator.jsx";

function App() {
  return (
    <>
      <h1>Module 6 Lab Exercises</h1>
      <div className="container text-center border border-2 border-white my-4">
        <h2 className="text-xl underline">Exercise 1</h2>
        <GreetingName name="Zhong">
          <GreetingExtended />
        </GreetingName>
      </div>
      <BigCatProvider>
        <div className="container text-center border border-2 border-white my-4 p-4">
          <h2 className="text-xl underline">Exercise 2 + 4 + 5</h2>
          <h3 className="text-lg italic">
            Image Source:{" "}
            <a href="https://pixabay.com" target="_blank">
              Pixabay
            </a>
          </h3>
          <BigCat />
        </div>
        <div className="container text-center border border-2 border-white my-4">
          <h2 className="text-xl underline">Exercise 3</h2>
          <MoodEmoji />
        </div>
        <div className="container text-center border border-2 border-white my-4">
          <h2 className="text-xl underline">Exercise 5</h2>
          <AddCatForm />
        </div>
      </BigCatProvider>
              <div className="container text-center border border-2 border-white my-4">
          <h2 className="text-xl underline">Exercise 6</h2>
          <Calculator />
        </div>
    </>
  );
}

export default App;
