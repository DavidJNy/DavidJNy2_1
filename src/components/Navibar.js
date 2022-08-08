import React from 'react';
import ChiliLogo2 from './images/chililogo2.png';
import { Link } from 'react-router-dom';
import { FaReact, FaPhone } from 'react-icons/fa';
import { CgFormatJustify }from 'react-icons/cg';

function NavigationBar() {


    return (
        <>
        <nav class="navbar navbar-expand-sm border-bottom border-danger
            border-2 rounded-bottom my-n2 position-sticky">
            <div class="container">
                <Link class="nav-link d-flex" to="/" >
                    <img alt="logo" src={ChiliLogo2} id="clogo" class="mx-2" />
                    <h2 class="mt-2 " >Prick Tox</h2>
                </Link>
                    <button class="navbar-toggler bg-secondary m-3" type="button" 
                data-bs-toggle="collapse" data-bs-target="#navbarNav" 
                aria-controls="navbarNav" aria-expanded="false" 
                aria-label="Toggle navigation">
                        <CgFormatJustify/>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <Link class="nav-link d-flex justify-content-center" to="/About">About</Link>
                        <Link class="nav-link d-flex justify-content-center" to="/Projects"><FaReact class='mx-1' size='1.5em' /> Projects</Link>
                        <Link class="nav-link d-flex justify-content-center" to="/Contact"><FaPhone class='mx-1' size='1.5em' /> Contact</Link>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    );
}

export default NavigationBar;

