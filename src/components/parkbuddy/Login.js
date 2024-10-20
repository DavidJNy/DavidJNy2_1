import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Card, Form, Alert } from "react-bootstrap";
import RegisterForm from "./registerer";

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      const { token } = response.data; // Destructure the token from response data
      onLogin(username);
      localStorage.setItem("token", token);
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
    <Card className="col-sm-6 mx-auto my-5 shadow">
      <Card.Header className="text-center bg-primary text-white">
        <h4>Login</h4>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleLoginSubmit}>
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary">
              Login
            </Button>
            <Button
              variant="link"
              onClick={handleRegisterClick}
              className="text-decoration-none"
            >
              Register
            </Button>
          </div>
        </Form>
        <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
          <Modal.Header closeButton>
            <Modal.Title>Register</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RegisterForm onClose={handleCloseRegisterModal} />
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
