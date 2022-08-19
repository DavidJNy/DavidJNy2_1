import React from 'react';
import ChiliLogo2 from './images/chililogo2.png';
import { Link } from 'react-router-dom';
import { FaReact, FaPhone } from 'react-icons/fa';
import { CgFormatJustify }from 'react-icons/cg';

function NavigationBar() {

    // const navLinks = document.querySelectorAll('.nav-link')
    // const menuToggle = document.getElementById('navbarNav')
    // const bsCollapse = new bootstrap.Collapse(menuToggle)
    // navLinks.forEach((l) => {
    //     l.addEventListener('click', () => { bsCollapse.toggle() })
    // })
    
    // window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');

    // const bsCollapse = new bootstrap.Collapse('#myCollapse', {
    //     toggle: false
    // })

    // const collapseElementList = document.querySelectorAll('.collapse')
    // const collapseList = [...collapseElementList].map(collapseEl => new bootstrap.Collapse(collapseEl))


    return (
        <>
        <nav class="navbar navbar-expand-sm position-sticky">
            <Link class="nav-link d-flex ms-5" to="/" >
                <img alt="logo" src={ChiliLogo2} id="clogo" class="mx-2 ms-5" />
                <h2 class="mt-2">Prick Tox</h2>
            </Link>
                <button class="navbar-toggler m-3 float-right" type="button" 
            data-bs-toggle="collapse" data-bs-target="#navbarNav" 
            aria-controls="navbarNav" aria-expanded="false" 
            aria-label="Toggle navigation">
                    <CgFormatJustify size='1.5em' color='red'/>
            </button>
                <div class="collapse navbar-collapse justify-content-end me-5" id="navbarNav">
                    <ul class="navbar-nav">
                        <Link class="nav-link d-flex justify-content-center" to="/About" >About</Link>
                    <Link class="nav-link d-flex justify-content-center" to="/Projects" ><FaReact class='mx-1' size='1.5em' /> Projects</Link>
                        <Link class="nav-link d-flex justify-content-center" to="/Contact" ><FaPhone class='mx-1' size='1.5em' /> Contact</Link>
                </ul>
            </div>
        </nav>
        </>
    );
}

export default NavigationBar;

