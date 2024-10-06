import React, { useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import RegisterForm from "./registerer";
import { Card, Form } from "react-bootstrap";

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
      console.log(response.data);
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
    <Card className="col-4">
      <Card.Body className="">
        {/* <Row> */}
        <Form onSubmit={handleLoginSubmit}>
          {error && <p>{error}</p>}
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <Form.Group>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
          </Form.Group>
          <Button type="submit">Login</Button>
          <Button variant="link" onClick={handleRegisterClick} className="">
            Register
          </Button>
        </Form>
        {/* </Row> */}

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
