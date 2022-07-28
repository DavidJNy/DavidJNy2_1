import React from 'react';
import ChiliLogo2 from './images/chililogo2.png';
import { Link } from 'react-router-dom';
import { FaReact, FaPhone, FaBitcoin } from 'react-icons/fa';
import './styles/Navbar.css'

function NavigationBar() {


    return (
        <nav class="navbar navbar-expand-sm sticky-top bg-dark bg-gradient border-bottom border-danger border-2 rounded-bottom my-n2">
            <div class="container-fluid d-flex ">
                <div class='d-flex flex-fill justify-content-center ms-3'>
                    <Link class="nav-link" to="/">
                        <img alt="logo" src={ChiliLogo2} id="clogo" />
                        <a className="navbar-brand" href='/'>Prick Tox</a>
                    </Link>
                </div>
                    <button class="navbar-toggler me-5 p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end me-3" id="navbarNav">
                        <ul class="navbar-nav">
                            <Link class="nav-link" to="/About"><FaBitcoin />About</Link>
                            <Link class="nav-link" to="/Projects"><FaReact /> Projects</Link>
                            <Link class="nav-link" to="/Contact"><FaPhone /> Contact</Link>
                        </ul>
                    </div>
            </div>
        </nav>
    );
}

export default NavigationBar;

