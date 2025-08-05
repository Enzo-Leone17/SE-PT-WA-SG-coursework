import React, { useState } from "react";
import axios from "axios";
import Loading from "../components/common/Loading";
import ErrorComponent from "../components/common/Error";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loginUrl = "http://localhost:4000/api/login";
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorComponent
        message={error}
        reset={() => {
          setCredentials({
            username: "",
            password: "",
          });
          setError(null);
        }}
      />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loading) setLoading(true);
      const response = await axios.post(loginUrl, credentials);
      if (response && response.status === 200) {
        const { token , refreshToken} = response.data;

        // Store the tokens in localStorage or secure cookie for later use
        localStorage.setItem("token", token);
        localStorage.setItem('refreshToken', refreshToken);
        setLoading(false);
        navigate("/profile");
      }

      // Redirect or perform other actions upon successful login
    } catch (err) {
      // Handle login error
      setError(err.message + (err.response.status === 401? ". Please check your credentials" : ""));
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-center bg-gray-600 px-4"
    >
      <div className="mt-4">
        <label htmlFor="username">Username:  </label>
        <input
          type="username"
          name="username"
          className="p-2 border rounded border-black text-black"
          value={credentials.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:  </label>
        <input
          type="password"
          name="password"
          className="p-2 border rounded border-black text-black"
          value={credentials.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit" className="max-w-min">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginPage;
