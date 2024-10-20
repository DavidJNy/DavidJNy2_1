import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert, Card } from "react-bootstrap";

const RegisterForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error messages

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
        setError(
          "Username already exists. Please choose a different username."
        );
      } else {
        setError("Failed to register user. Please try again later.");
      }
    }
  };

  return (
    <Card className="p-4 shadow">
      <Card.Body>
        <h2 className="text-center mb-4">Register</h2>
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary">
              Register
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RegisterForm;
