import React, { useState } from 'react';
// import Map from './Map';
import Login from './Login';
import Chat from './Chat';


function MainPark() {

    const [token, setToken] = useState(null);

    return (
        <div id='Main' className='justify-content-center container'>
            <div className='map'>
            Enter map here
            </div>
            <div className='chatrooms'>
                {!token ? <Login setToken={setToken} /> : <Chat token={token} />}
            </div>
        </div>
    );
}

export default MainPark;

// https://www.youtube.com/watch?v=O4u8n_CjUDY&ab_channel=Honoka%26Azita
// Maybe add https://codepen.io/wefiy/pen/WPpEwo (Tacky matrix wallpaper behind logo) :)
// https://alvarotrigo.com/blog/css-animations-scroll/