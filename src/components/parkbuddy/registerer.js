import React, { useState } from "react";
import axios from "axios";

const RegisterForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/register", {
        username,
        password,
      });
      console.log(response.data);
      // Close the modal upon successful registration
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.status === 409) {
        setError("Username already exists. Please choose a different username.");
      } else {
        setError("Failed to register user. Please try again later.");
      }
  }};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <p>{error}</p>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
