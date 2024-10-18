import React, { useState, useEffect } from "react";
import ChiliLogo2 from "./images/chililogo2.png";
import { Link } from "react-router-dom";
import { FaReact, FaPhone } from "react-icons/fa";
import { CgFormatJustify } from "react-icons/cg";

function NavigationBar() {
  const [viewportContent, setViewportContent] = useState("David Ny");
  const [scrolled, setScrolled] = useState(false); // State to track scrolling

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setViewportContent("D.Ny");
      } else {
        setViewportContent("David Ny");
      }
    }

    function handleScroll() {
      // Set scrolled state based on scroll position
      setScrolled(window.scrollY > 0);
    }

    // Add event listeners
    window.addEventListener("load", handleResize);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll); // Listen for scroll events

    // Cleanup function
    return () => {
      window.removeEventListener("load", handleResize);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll); // Cleanup scroll listener
    };
  }, []);

  return (
    <div>
      <nav
        className={`navbar navbar-expand-sm navbar-light fixed-top ${
          scrolled ? "scrolled" : ""
        }`}
      >
        <div className="container d-flex justify-content-between">
          <Link className="nav-link d-flex justify-content-center ps-2" to="/">
            <img
              alt="logo"
              src={ChiliLogo2}
              id="clogo"
              className="me-2 ps-sm-4"
            />
            <h2 className="title">{viewportContent}</h2>
          </Link>
          <div>
            <button
              className="navbar-toggler me-4"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <CgFormatJustify size="1.5em" color="red" />
            </button>
          </div>
          <div
            className="collapse navbar-collapse justify-content-end pe-4"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <Link
                className="nav-link d-flex justify-content-center"
                to="/About"
              >
                About
              </Link>
              <Link
                className="nav-link d-flex justify-content-center"
                to="/Projects"
              >
                <FaReact className="mx-1" size="1.5em" /> Projects
              </Link>
              <Link
                className="nav-link d-flex justify-content-center"
                to="/Contact"
              >
                <FaPhone className="mx-1" size="1.5em" /> Contact
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;
