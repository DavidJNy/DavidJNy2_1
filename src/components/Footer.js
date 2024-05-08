import React, { useState, useEffect } from 'react';
import ChiliLogo2 from './images/chililogo2.png';
// import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
// import { BsYoutube } from "react-icons/bs";
// import { AiFillTwitterCircle } from "react-icons/ai";


function Footer() {

    const [viewportContent, setViewportContent] = useState('David Ny');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 370) {
        setViewportContent('D. Ny');
      } else {
        setViewportContent('David Ny');
      }
    }

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount



    return (
        <div id='Footer' class='pb-5'>
            <div class='container justify-content-center'>
                <div class='d-flex justify-content-center py-1'>
                    <a target="_blank" rel="noreferrer" class='m-2' href="https://www.facebook.com/DavidJNeee/">
                        <BsFacebook size='2em'/></a>
                    <a target="_blank" rel="noreferrer" class='m-2' href="https://www.linkedin.com/in/davidjny/">
                        <BsLinkedin size='2em'/></a>
                    {/* <a target="_blank" rel="noreferrer" class='m-2' href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                        <BsYoutube size='2em'/></a> */}
                    <a target="_blank" rel="noreferrer" class='m-2' href="https://www.instagram.com/psykomcnasty/">
                        <BsInstagram size='2em'/></a></div>
                <div class='d-flex justify-content-center py-1'>
                    <img alt="logo" src={ChiliLogo2} id="clogo" class="mx-2 justify-content-center" />
                    <h2 class="d-flex text-center" >{viewportContent}</h2>
                </div>
                <div class="d-flex text-center AllRights justify-content-center" >© 2024 David J. Ny | All rights reserved.</div>
                {/* <div class='container justify-content-center d-sm-block d-md-flex'>
                    {/* Add quick 3 pages for these links & remove disableLink class
                    <Link class='d-flex justify-content-center m-2 badge px-5 disableLink' to="/Privacy_Notice">Privacy Notice</Link>
                    <Link class='d-flex justify-content-center m-2 badge px-5 disableLink' to="/Terms_of_Service">Terms of service</Link>
                    <Link class='d-flex justify-content-center m-2 badge px-5 disableLink' to="/Cookie_preferences">Cookie preferences</Link> 
                </div> */}
            </div>
            {/* <div class='hack'>
                <a target="_blank" rel="noreferrer" class='m-2' href="">
                </a>
            </div> */}
        </div>
        
    );
}

export default Footer;