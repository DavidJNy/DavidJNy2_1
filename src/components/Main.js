import React from 'react';
import oldcapitol from './images/thailand/oldcapitol.jpg';
import nightmarket from './images/thailand/nightmarket.jpg';
import boymonk from './images/thailand/boymonk.webp';
import thaiboats from './images/thailand/thaiboats.jpg';



// https://alvarotrigo.com/blog/css-animations-scroll/

function Main() {

    


    return (
        <>
            <div id='Main' class='row justify-content-center container-fluid'>
                <div class='col-12 col-lg-6 p-4 row justify-content-center'>
                    <img src={oldcapitol} alt='' class='img-fluid'/>
                    <h1 class='p-3 text-center'>Here are PrickTox, we are here for your needs</h1>
                    <h5 class='p-3 d-none d-lg-flex'>We will take care of your business needs. We got the best design. Innovate technology. Supplied by Green energy. Synergy.</h5>
                    <h5 class='p-3 d-none d-lg-flex'>I deliver unique customer experience with high level digital talent.</h5>
                    <h5 class='p-3 d-none d-lg-flex'>Join for a journey of great talent, projects, solutions. 
                        Get out there and do more to unleash your greatest potential. BLAH BLAH BLAH</h5>
                </div>
                <div class='col-12 col-lg-6 p-4 row justify-content-center'>
                    <img src={boymonk} alt='' class='img-fluid rounded col-12'/>
                    <div class='p-5 col-12 row justify-content-center d-none d-lg-flex'>
                        <h1 class='row justify-content-center'>Here at Pricktox</h1>
                        <hr class='my-4'></hr>
                        <h5 class='row justify-content-center'>Your goals are our goals</h5>
                    </div>
                </div>
                <hr class='my-4'></hr>
                <h1 class='p-5 col-12 text-center'>Think Once, Think Twice, Think Pricktox. Because you are worth it</h1>
                <hr class='my-4'></hr>
                <div class='col-12 pt-3 p-5 row d-none d-lg-flex'>
                    <img src={nightmarket} alt='' class='img-fluid col-12 col-lg-6'/>
                    <div class='p-5 col-lg-6 col-12 row align-items-center'>
                        <h3 class='display-4'>Innovation</h3>
                        <hr class='my-4'></hr>
                        <h3 class='display-4'>Entrepreneurial</h3>
                        <hr class='my-4'></hr>
                        <h3 class='display-4'>Visionary </h3>
                        <hr class='my-4'></hr>
                        <h3 class='display-4'>Core competency</h3>
                        <hr class='my-4'></hr>
                        <h5 class='row justify-content-end text-center'> We're not just another web site. We're a team of passionate professionals
                        who believe in our product and our customers. We're here to make you look good.</h5>
                    </div>
                </div>
                <div class='p-5'>
                    <img src={thaiboats} alt='' class='img-fluid rounded '></img>
                    <h1 class='display-4 p-5 text-center'>We care for you when you need it most</h1>
                </div>
            </div>
        </>
    );
}

export default Main;

//https://www.youtube.com/watch?v=O4u8n_CjUDY&ab_channel=Honoka%26Azita
//Maybe add https://codepen.io/wefiy/pen/WPpEwo (Tacky matrix wallpaper behind logo) :)