import React from 'react';
import oldcapitol from './images/thailand/oldcapitol.jpg';
import nightmarket from './images/thailand/nightmarket.jpg';
import boymonk from './images/thailand/boymonk.webp';
import thaiboats from './images/thailand/thaiboats.jpg';

// https://alvarotrigo.com/blog/css-animations-scroll/

function Main() {

    


    return (
        <>
            <div id='Main' class='d-flex-inline'>
                <div class='d-flex position-relative p-5'>
                    <img src={oldcapitol} alt='' class='img-fluid rounded d-sm-none d-md-flex'/>
                    <h1 class='position-absolute p-3 justify-content-center'>Here are PrickTox, we are here for your needs</h1>
                    <h2 class='p-3 d-none d-lg-flex'>We will take care of your business needs. We got the best design. Innovate technology. Supplied by Green energy. Synergy.</h2>
                    <h4 class='p-3 d-none d-lg-flex'>I deliver unique customer experience with high level digital talent.</h4>
                    <p class='p-3 d-none d-lg-flex'>Join for a journey of great talent, projects, solutions. 
                        Get out there and do more to unleash your greatest potential</p>
                    <h3 class='p-3 d-none d-lg-flex align-items-end'>Think Once, Think Twice, Think Pricktox. Because you are worth it</h3>
                </div>

                <div class='d-flex flex-row-reverse p-5 justify-content-between'>
                    <img src={nightmarket} alt='' class='img-fluid float-left d-none d-md-flex'/>
                    <div class='p-5'>
                        <h3 class='display-4'>Innovation</h3>
                        <hr class='my-4'></hr>
                        <h3 class='display-4'>Entrepreneurial</h3>
                        <hr class='my-4'></hr>
                        <h3 class='display-4'>Visionary </h3>
                        <hr class='my-4'></hr>
                        <h3 class='display-4'>Core competency</h3>
                        <hr class='my-4'></hr>
                        <p> We're not just another web site. We're a team of passionate professionals
                        who believe in our product and our customers. We're here to make you look good.</p>
                    </div>
                </div>

                <div class='d-sm-flex-inline d-lg-flex flex-row-reverse p-5 justify-content-between'>
                    <img src={boymonk} alt='' class='col-8 img-fluid rounded float-right d-flex justify-content-center'/>
                    <div class='p-5 justify-content-center'>
                        <h1 class='display-4 m-3'>Here at Pricktox</h1>
                        <hr class='my-4'></hr>
                        <p class='m-3'>Your goals are our goals</p>
                    </div>
                </div>
                
                <div class='d-lg-flex p-5 justify-content-between'>
                    <img src={thaiboats} alt='' class='img-fluid rounded float-left d-none d-lg-flex p-5 '></img>
                    <h1 class='display-4 m-3 align-items-center justify-content-center'>We care for you when you need it most</h1>
                </div>
            </div>
        </>
    );
}

export default Main;

//https://www.youtube.com/watch?v=O4u8n_CjUDY&ab_channel=Honoka%26Azita
//Maybe add https://codepen.io/wefiy/pen/WPpEwo (Tacky matrix wallpaper behind logo) :)