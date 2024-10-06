import React from 'react';
import RotatingGlobe from './RotatingGlobe.js';
import Skull from './Skull.js'
// import MainPrickTox from "./MainPrickTox.js";


function Main() {

    return (
        <div id='Main' className='justify-content-center container'>
            <div className='text-center pt-3 fs-1'>
                
            </div>
            <div className='RotatingGlobe justify-content-center '>
                <RotatingGlobe />
            </div>


            {/* <div className='Skull justify-content-center'>
                <Skull />
            </div> */}

            {/* <MainPrickTox/> */}
        </div>
    );
}

export default Main;

// https://www.youtube.com/watch?v=O4u8n_CjUDY&ab_channel=Honoka%26Azita
// Maybe add https://codepen.io/wefiy/pen/WPpEwo (Tacky matrix wallpaper behind logo) :)
// https://alvarotrigo.com/blog/css-animations-scroll/