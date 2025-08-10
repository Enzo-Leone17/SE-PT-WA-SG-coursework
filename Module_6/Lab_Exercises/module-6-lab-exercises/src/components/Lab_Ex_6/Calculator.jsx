import { useState } from "react";

function Calculator() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState(0);

  const equal = () => {
    if (operation === "+") {
      setResult(num1 + num2);
    } else if (operation === "-") {
      setResult(num1 - num2);
    } else if (operation === "*") {
      setResult(num1 * num2);
    } else if (operation === "/") {
      setResult(num1 / num2);
    }
  };

  const clear = () => {
    setNum1(0);
    setNum2(0);
    setOperation("+");
    setResult(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Calculator</h1>
      <div className="flex flex-row items-center gap-4 border-b-2">
        <label htmlFor="num1">Number 1:</label>
        <input
          id="num1"
          type="number"
          value={num1}
          onChange={(e) => setNum1(parseInt(e.target.value))}
        />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="+" className="text-gray-600">
            +
          </option>
          <option value="-" className="text-gray-600">
            -
          </option>
          <option value="*" className="text-gray-600">
            X
          </option>
          <option value="/" className="text-gray-600">
            ÷
          </option>
        </select>
        <label htmlFor="num2">Number 2:</label>
        <input
          id="num2"
          type="number"
          value={num2}
          onChange={(e) => setNum2(parseInt(e.target.value))}
        />
      </div>
      <button onClick={equal} className="border rounded-full px-4 text-white bg-blue-600 hover:bg-blue-700">=</button>
      <p>Result: {result}</p>
      <button
        onClick={() => clear()}
        className={`border rounded-full px-4 text-white bg-red-600 hover:bg-red-700 ${
          result !== 0 ? "" : "hidden"
        }`}
      >
        Clear
      </button>
    </div>
  );
}

export default Calculator;
