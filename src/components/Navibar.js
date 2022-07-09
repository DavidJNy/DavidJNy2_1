import React from 'react'
import ChiliLogo2 from './images/chililogo2.png'
import { FaReact, FaPhone, FaBitcoin } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css'

function NavigationBar() {


    return (
        <nav class="navbar navbar-expand-sm sticky-top bg-dark bg-gradient border-bottom border-danger border-2 rounded-bottom my-n2">
            <div class="container-fluid d-flex ">
                <div class='d-flex flex-fill justify-content-center ms-3'>
                    <img alt="logo" src={ChiliLogo2} id="clogo"/>
                    <a className="navbar-brand" href="/">Prick Tox</a>
                </div>
                    <button class="navbar-toggler me-5 p-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end me-3" id="navbarNav">
                        <ul class="navbar-nav">
                            <a class="nav-link" href="#Projects"><FaReact /> Projects</a>
                            <a class="nav-link" href="#Crypto"><FaBitcoin /> Crypto</a>
                            <a class="nav-link" href="#Contact_Us"><FaPhone /> Contact</a>
                        </ul>
                    </div>
            </div>
        </nav>
    );
}

export default NavigationBar;

