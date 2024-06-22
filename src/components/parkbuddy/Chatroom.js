import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ token }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = io('http://localhost:3000', { auth: { token } });

    useEffect(() => {
        socket.on('message', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        return () => socket.disconnect();
    }, [socket]);

    const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg.username}: {msg.message}</div>
                ))}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
