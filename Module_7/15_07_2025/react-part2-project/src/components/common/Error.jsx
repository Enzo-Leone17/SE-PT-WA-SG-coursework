import React from "react";
import { Link } from "react-router-dom";

const ErrorComponent = ({ message, reset = "link" }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{message}</span>
      <span className="absolute top-0 right-0 ">
        {reset === "link" ? (
          <Link
            to="/"
            className="bg-red-500 hover:bg-red-700 text-white font-bold rounded"
          >
            Close
          </Link>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </span>
    </div>
  );
};

export default ErrorComponent;
