import React from 'react'
import ChiliLogo2 from './images/chililogo2.png';
import { Link } from 'react-router-dom';
import { BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";


function Footer() {
    return (
        <div id='Footer' class='pb-5'>
            <div class='container justify-content-center'>
                <div class='d-flex justify-content-center py-3'>
                    <a target="_blank" rel="noreferrer" class='m-3' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        <BsFacebook size='3em'/></a>
                    <a target="_blank" rel="noreferrer" class='m-3' href="https://twitter.com/PrickTox">
                        <AiFillTwitterCircle size='3em'/></a>
                    <a target="_blank" rel="noreferrer" class='m-3' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        <BsYoutube size='3em'/></a>
                    <a target="_blank" rel="noreferrer" class='m-3' href="https://www.instagram.com/pricktox/">
                        <BsInstagram size='3em'/></a></div>
                <div class='d-flex justify-content-center py-3'>
                    <img alt="logo" src={ChiliLogo2} id="clogo" class="mx-2 justify-content-center" />
                    <h2 class="d-flex justify-content-center" >David J Ny</h2>
                </div>
                <div class="d-flex justify-content-center py-3">© 2024 David J . All rights reserved.</div>
                <div class='container justify-content-center d-sm-block d-md-flex'>
                    {/* Add quick 3 pages for these links & remove disableLink class*/}
                    <Link class='d-flex justify-content-center m-2 badge px-5 disableLink' to="/Privacy_Notice">Privacy Notice</Link>
                    <Link class='d-flex justify-content-center m-2 badge px-5 disableLink' to="/Terms_of_Service">Terms of service</Link>
                    <Link class='d-flex justify-content-center m-2 badge px-5 disableLink' to="/Cookie_preferences">Cookie preferences</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;