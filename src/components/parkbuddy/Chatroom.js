import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

const Chatroom = ({ chatroomId, username, roomName }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = io("https://www.davidjny.com");
    // ws.current = io("http://localhost:3001");

    // Connect to WebSocket and join the chatroom
    ws.current.on("connect", () => {
      console.log("Connected to WebSocket server");
      ws.current.emit("joinRoom", chatroomId);
    });

    // Handle incoming messages
    ws.current.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Handle disconnection
    ws.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    // Handle connection error
    ws.current.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    fetch(`/api/chat/${chatroomId}/messages`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });

    return () => {
      ws.current.disconnect();
    };
  }, [chatroomId, username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const message = {
        chatroomId,
        sender: username,
        text: input,
      };
      ws.current.emit("chatMessage", message);
      setInput("");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 className="text-center">Chatroom: {roomName}</h2>
          <div className="chat-messages">
            <div>
              {messages
                .filter((msg) => msg.chatroom_id === chatroomId) // Filter messages for the current chatroom
                .map((msg, index) => (
                  <ListGroup.Item key={index}>
                    <strong>{msg.sender}:</strong> {msg.text}
                  </ListGroup.Item>
                ))}
            </div>
          </div>
          <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group controlId="messageInput">
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Chatroom;
