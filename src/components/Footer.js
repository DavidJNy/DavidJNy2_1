import React from 'react'
import ChiliLogo2 from './images/chililogo2.png';
import { Link } from 'react-router-dom';
import { BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";


function Footer() {
    return (
        <div id='Footer' class=''>
            <div class='container'>
                <div class='d-flex justify-content-center'>
                    <a class='m-3' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        <BsFacebook size='3em'/></a>
                    <a class='m-3' href="https://https://twitter.com/PrickTox">
                        <AiFillTwitterCircle size='3em'/></a>
                    <a class='m-3' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        <BsYoutube size='3em'/></a>
                    <a class='m-3' href="https://www.instagram.com/pricktox/">
                        <BsInstagram size='3em'/></a></div>
                <div class='container d-flex justify-content-center m-3'>
                    <img alt="logo" src={ChiliLogo2} id="clogo" class="mx-2 d-flex justify-content-center" />
                    <h2 class="mt-2 d-flex justify-content-center" >Prick Tox</h2>
                </div>
                <div class="d-flex justify-content-center">© 2022 PrickTox . All rights reserved.</div>
                <div class='container d-flex justify-content-center m-3'>
                    <Link class='d-flex justify-content-center m-3 badge badge-light' to="/Privacy_Notice">Privacy Notice</Link>
                    <Link class='d-flex justify-content-center m-3 badge' to="/Terms_of_Service">Terms of service</Link>
                    <Link class='d-flex justify-content-center m-3 badge' to="/Cookie_preferences">Cookie preferences</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;