import React from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email, "Password:", password);
    navigate("/BitcoinRates");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "0 auto", backgroundColor: "#f5f5f5" }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>Simple Login Form</h1>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        fullWidth
        margin="normal"
        required={true}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        fullWidth
        margin="normal"
        required={true}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </form>
  );
};

export default Login;
