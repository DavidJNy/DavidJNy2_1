import React, { useState, useEffect } from 'react';
import ChiliLogo2 from './images/chililogo2.png';
// import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";
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
      <div id="Footer" className="pb-5">
        <div className="container">
          <div className="d-flex justify-content-center py-1">
            <div className="d-flex column-gap-3">
              <a
                target="_blank"
                rel="noopener"
                className="m-2"
                href="https://facebook.com/DavidJNeee/"
              >
                <BsFacebook size="2em" />
              </a>
              <a
                target="_blank"
                rel="noopener"
                className="m-2"
                href="https://www.linkedin.com/in/davidjny/"
              >
                <BsLinkedin size="2em" />
              </a>
              <a
                target="_blank"
                rel="noopener"
                className="m-2"
                href="https://www.instagram.com/psykomcnasty/"
              >
                <BsInstagram size="2em" />
              </a>
              <a
                target="_blank"
                rel="noopener"
                className="m-2"
                href="https://github.com/DavidJNy"
              >
                <BsGithub size="2em" />
              </a>
            </div>
          </div>
          <div className="d-flex justify-content-center py-1">
            <img
              alt="logo"
              src={ChiliLogo2}
              id="clogo"
              className="mx-2 justify-content-center"
            />
            <h2 className="d-flex text-center">{viewportContent}</h2>
          </div>
          <div className="d-flex text-center AllRights justify-content-center">
            © 2024 David N. All rights reserved.
          </div>
        </div>
      </div>
    );
}

export default Footer;