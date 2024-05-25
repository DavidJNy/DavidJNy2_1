import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
// import './App.css';

const socket = io('/ws/');

function ChatWebSocket() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    socket.on('message', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    // Cleanup on component unmount
    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('disconnect');
    };
  }, []);

  const sendMessage = () => {
    if (input) {
      socket.emit('message', input);
      setInput('');
    }
  };

  return (
    <div className="App">
      <h1>Socket.IO Client</h1>
      <div id="messages">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatWebSocket;
