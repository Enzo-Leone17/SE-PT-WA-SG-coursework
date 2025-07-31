import React from "react";


interface ErrorProps {
  message: string;
}

//display error, function to redirect to home from error call
const ErrorComponent : React.FC<ErrorProps> = ({ message }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{message}</span>
      <div>
        <p>Redirecting you in 3 seconds...</p>
      </div>
    </div>
  );
};

export default ErrorComponent;
