import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import RegisterForm from "./registerer";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", { username, password });
      console.log(response.data);
      onLogin(username);
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password");
    }
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
        <Button variant="link" onClick={handleRegisterClick}>
          Register
        </Button>
      </form>

      <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm onClose={handleCloseRegisterModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginForm;
