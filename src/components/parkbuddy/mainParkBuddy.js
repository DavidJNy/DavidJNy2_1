import React, { useState, useEffect } from "react";
import MapApp from "./Map";
import ChatContainer from "./ChatContainer";
import LoginForm from "./Login";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

function MainPark() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedChatroomId, setSelectedChatroomId] = useState(null);
  const [selectedChatroomName, setSelectedChatroomName] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token validity
      axios
        .post("/api/auth/validateToken", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        })
        .then((response) => {
          if (response.data.valid) {
            setIsLoggedIn(true);
            setUsername(response.data.username);
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const handleLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  const handleChatroomSelect = (chatroomId, chatroomName) => {
    setSelectedChatroomId(chatroomId);
    setSelectedChatroomName(chatroomName);
  };

  

  return (
    <Container id="ParkBuddy" className="">
      <div id="Map">
        <MapApp onChatroomSelect={handleChatroomSelect} />
      </div>
      {isLoggedIn ? (
        <ChatContainer
          username={username}
          chatroomId={selectedChatroomId} // Pass the selected chatroom ID
          roomName={selectedChatroomName}
        />
      ) : (
        <Container id="Login">
          <Row className="justify-content-center p-2">
            <Col className="col-6 text-center fs-3">
              Please login to use the chatroom
            </Col>
          </Row>
          <LoginForm onLogin={handleLogin} />
        </Container>
      )}
    </Container>
  );
}

export default MainPark;
