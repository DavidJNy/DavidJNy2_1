import React, { useState } from 'react';
import MapApp from "./Map";
import Chatroom from "./Chatroom";
import LoginForm from "./Login";

function MainPark() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  
  const handleLogin = () => {
    setUsername(username);
    setIsLoggedIn(true);
  };

  return (
    <div id="Main" className="justify-content-center container">
      <div className="map">
        <MapApp />
      </div>
      {isLoggedIn ? <Chatroom username={username}/> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
}

export default MainPark;
