import React, { useState, useEffect } from 'react';
import ChiliLogo2 from './images/chililogo2.png';
import { Link } from 'react-router-dom';
import { FaReact, FaPhone } from 'react-icons/fa';
import { CgFormatJustify }from 'react-icons/cg';



function NavigationBar() {

    const [viewportContent, setViewportContent] = useState('David Ny');

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setViewportContent('D.Ny');
      } else {
        setViewportContent('David Ny');
      }
    }

    // Add event listener for window resize
    window.addEventListener('load', handleResize);
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('load', handleResize);
      window.addEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount



      return (
        <div>
            <nav class="navbar navbar-expand-sm position-sticky">
                <div class="container-lg d-flex justify-content-between">
                    <Link class="nav-link d-flex justify-content-center" to="/" >
                        <img alt="logo" src={ChiliLogo2} id="clogo" class="mt-1 me-2" />
                        <h2 class="mt-2 title">{viewportContent}</h2>
                    </Link>
                    <div>
                        <button class="navbar-toggler ml-auto" type="button" 
                            data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                            aria-controls="navbarNav" aria-expanded="false" 
                            aria-label="Toggle navigation">
                        <CgFormatJustify size='1.5em' color='red'/>
                        </button>
                    </div>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul class="navbar-nav">
                                <Link class="nav-link d-flex justify-content-center" to="/About" >About</Link>
                            <Link class="nav-link d-flex justify-content-center" to="/Projects" ><FaReact class='mx-1' size='1.5em' /> Projects</Link>
                                <Link class="nav-link d-flex justify-content-center" to="/Contact" ><FaPhone class='mx-1' size='1.5em' /> Contact</Link>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar;

