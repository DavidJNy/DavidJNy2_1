import React, { useState } from 'react';

function MainLogin  ({ setToken }) {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        setToken(data.token);
    };

    return (
        <div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={login}>Login</button>
        </div>
    );
};

export default MainLogin;
