
import React from 'react';
import RotatingGlobe from './RotatingGlobe.js';

function Main() {

    return (
        <>
            <div id='Main' class='justify-content-center container'>
                <div>
                    <div class='text-center pt-3 fs-1'>
                        Welcome
                    </div>
                    <div class='RotatingGlobe justify-content-center '>
                      <RotatingGlobe />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Main;

//https://www.youtube.com/watch?v=O4u8n_CjUDY&ab_channel=Honoka%26Azita
//Maybe add https://codepen.io/wefiy/pen/WPpEwo (Tacky matrix wallpaper behind logo) :)
// https://alvarotrigo.com/blog/css-animations-scroll/