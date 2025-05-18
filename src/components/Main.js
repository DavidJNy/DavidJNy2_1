import React, { useState, useEffect, useCallback } from "react";
import RotatingGlobe from "./RotatingGlobe.js";
import proPix from "./images/meprofile.jpg";

function Main() {
  const [philosophyProps, setPhilosophyProps] = useState({
    opacity: 0,
    transform: "translateX(-100px)",
  });
  const [aboutProps, setAboutProps] = useState({
    opacity: 0,
    transform: "translateX(-100px)",
  });

  const handleScroll = useCallback(() => {
    const philosophyElement = document.getElementById("philosophy");
    const aboutElement = document.getElementById("about");

    if (philosophyElement) {
      const philosophyRect = philosophyElement.getBoundingClientRect();
      if (
        philosophyRect.top <= window.innerHeight * (3 / 4) &&
        philosophyRect.bottom > 0
      ) {
        setPhilosophyProps({ opacity: 1, transform: "translateX(0)" });
      }
    }

    if (aboutElement) {
      const aboutRect = aboutElement.getBoundingClientRect();
      if (
        aboutRect.top <= window.innerHeight * (3 / 4) &&
        aboutRect.bottom > 0
      ) {
        setAboutProps({ opacity: 1, transform: "translateX(0)" });
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call handleScroll initially to check visibility when the component mounts

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Now handleScroll is a stable dependency

  return (
    <div id="Main" className="container justify-content-center">
      {/* Introduction Section */}
      <div className="row my-5 min100height">
        <div className=" p-5 col-md-6 lead text-center fade-in-left">
          <h2>Hi, my name is David Ny.</h2>
          <p>I'm a full-stack web developer from Los Angeles, CA.</p>
          <img src={proPix} className="img-fluid round m-2" alt="mepro" />
        </div>
        <div className="col-md-6 d-flex justify-content-center spincube">
          <RotatingGlobe />
        </div>
        <div className="row my-5">
          <div className="col text-center">
            <button
              onClick={() => window.open("assets/ResumeQ4_2024.pdf", "_blank")}
              className="btn btn-primary"
            >
              View My Resume
            </button>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div
        className="row my-5 min100height"
        id="philosophy"
        style={{
          opacity: philosophyProps.opacity,
          transform: philosophyProps.transform,
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div className="col text-center">
          <h2>My Philosophy</h2>
          <p className="lead">
            I strive to make the web a better place, always seeking ways to
            improve the user experience, enhance functionality, and optimize
            performance. My passion for creating seamless digital solutions
            drives my work, whether it's on client-facing websites or intricate
            backend systems.
          </p>
        </div>
      </div>

      {/* About Me Section */}
      <div
        className="row my-5 min100height"
        id="about"
        style={{
          opacity: aboutProps.opacity,
          transform: aboutProps.transform,
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <div className="col text-center">
          <h2>About Me</h2>
          <p>
            With 2 years of experience at InvestCloud, I specialize in front-end
            development, building and enhancing user experiences for leading
            banks and asset managers. My expertise in JavaScript, HTML, CSS, and
            my adaptability to new technologies allow me to excel in
            collaborative environments. I thrive on solving real-world problems
            with innovative solutions.
          </p>
          <p>
            I hold a B.S. in Chemistry from UC Santa Cruz and have a background
            in biochemistry. Additionally, I have experience with Python, SQL,
            MERN stack, and more. I'm always excited to learn new skills like
            Data Science and Machine Learning.
          </p>
        </div>
      </div>

      {/* Resume Button Section */}
      <div className="row my-5">
        <div className="col text-center">
          <button
            onClick={() => window.open("assets/ResumeQ4_2024.pdf", "_blank")}
            className="btn btn-primary"
          >
            View My Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
