import React from 'react';
import RotatingGlobe from './RotatingGlobe.js';
// import MainPrickTox from "./MainPrickTox.js";


function Main() {

    return (
        <>
            <div id='Main' className='justify-content-center container'>
                <div>
                    <div className='text-center pt-3 fs-1'>
                        Welcome
                    </div>
                    <div className='RotatingGlobe justify-content-center '>
                      <RotatingGlobe />
                    </div>
                    {/* <MainPrickTox/> */}
                </div>
            </div>
        </>
    );
}

export default Main;

// https://www.youtube.com/watch?v=O4u8n_CjUDY&ab_channel=Honoka%26Azita
// Maybe add https://codepen.io/wefiy/pen/WPpEwo (Tacky matrix wallpaper behind logo) :)
// https://alvarotrigo.com/blog/css-animations-scroll/