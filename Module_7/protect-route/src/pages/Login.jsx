import { useState } from "react";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // If user is already login => should notify them instead of showing them the login form
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/dashboard");
  //   }
  // }, [isAuthenticated, navigate]);

  if(isAuthenticated){
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
    return <div className="p-4">You are already logged in. Redirecting...</div>;
  }

  const handleLogin = () => {
    const newToken = "Tesing123";
    login(newToken);
    navigate("/dashboard");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Login</h2>
      <input
        className="border p-2 mb-2"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
