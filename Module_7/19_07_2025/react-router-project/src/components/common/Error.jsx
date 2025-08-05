import React from "react";
import { Link } from "react-router-dom";

const ErrorComponent = ({ message, reset = "link" , resetPage = "/"}) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{message}</span>
      <span>
        {reset === "link" ? (
          <Link
            to={resetPage}
            className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold rounded py-2 px-4"
          >
            Close
          </Link>
        ) : (
          <button
            className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold rounded py-2 px-4"
            onClick={reset}
          >
            Close
          </button>
        )}
      </span>
    </div>
  );
};

export default ErrorComponent;
