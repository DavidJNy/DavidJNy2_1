import React, { useState } from 'react';
import MapApp from './Map';
import Chat from './Chat';
import Login from './Login'


function MainPark() {

    const [token, setToken] = useState(null);

    return (
        <div id='Main' className='justify-content-center container'>
            <div className='map'>
                <MapApp />
            </div>
            <div className='chatrooms'>
                {!token ? <Login setToken={setToken} /> : <Chat token={token} />}
            </div>
        </div>
    );
}

export default MainPark;