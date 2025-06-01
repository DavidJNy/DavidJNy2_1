import { useState, React, useRef } from 'react';
import { BsGithub, BsLinkedin, BsCheck2 } from 'react-icons/bs'
import emailjs from '@emailjs/browser';
import ReCAPTCHA from "react-google-recaptcha";
import { useEffect } from 'react';

function ContactMe () {
    
    const [verified, setVerified] = useState(false);
    const [vistorName, setVistorName] = useState('');
    const [vistorEmail, setVistorEmail] = useState('');
    const [vistorMessage, setVistorMessage] = useState('');
    const [show, setShow] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const publicReChapKey = "6Ldb6tIgAAAAAHjqzENAoVtM-7DPaXvBHjJD4f1Z";
    const recaptchaRef = useRef(null);
    
    function onChange(value) {
        setVerified(value !== null);
    }
    
    useEffect(() => {
        // console.log("page reloaded " + new Date())
        // console.log(verified)
    }, [show]);

    function sendEmail (e) {
        e.preventDefault();
        
        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(vistorEmail)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }

        emailjs.sendForm("service_ee66mua", "template_mzxvv08", e.target , "hVrLms7FkIIIQkLsf")
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                setShow(false);
                setVistorName('');
                setVistorEmail('');
                setVistorMessage('');
                recaptchaRef.current.reset(); // Reset ReCAPTCHA
            })
            .catch(function (error) {
                console.log('FAILED...', error);
                setErrorMessage('Failed to send message. Please try again later.');
            });
    };

    return (
      <div id="Contact" className="container fade-in-left">
        <div className="">
          <h1 className="">Contact Me</h1>
          <hr className="solid"></hr>
          <p className="summary">
            A little more about myself. Started learning{" "}
            <i className="fa-brands fa-2xl fa-html5"></i> HTML and{" "}
            <i className="fa-brands fa-2xl fa-css3"></i> CSS along with{" "}
            <i className="fa-brands fa-2xl fa-js-square"></i> Javascript in 2017
            using freecodecamp, Codecademy &amp; W3. Then got real serious 2020
            when the pandemic hit. Picked up{" "}
            <i className="fa-brands fa-2xl fa-react"></i> React and{" "}
            <i className="fa-brands fa-2xl fa-node"></i> NodeJS along with
            Express for Backend application. With a wide variety of helpful
            resources that other developers share from StackOverflow, Youtube,
            Medium, and discord; I actually feel confident enough to build this
            website. <br />
            <br />
            Thanks! Much Love <i className="fa-solid fa-2xl fa-heart"></i>
          </p>
          <p>
            Click here for my Github and Linkedin: &emsp;
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/DavidJNy"
            >
              <BsGithub size="2em" color="white" />
            </a>{" "}
            &emsp;
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/DavidJNy"
            >
              <BsLinkedin size="2em" color="white" />
            </a>
          </p>
          <hr className="solid"></hr>
        </div>
        <h2> Go ahead and shoot me an email by filling out the form</h2>
        <p> I'm looking all types of work so feel free to contact me &nbsp;</p>
        {/* It could look better to add bootstrap Floating labels (https://getbootstrap.com/docs/5.0/forms/floating-labels/#textareas) */}
        <form
          name="container"
          className="row"
          method="PUT"
          id="myForm"
          onSubmit={sendEmail}
        >
          <div className="col">
            <label className="m-2" htmlFor="name">
              {" "}
              Name{" "}
            </label>
            <input
              type="text"
              id="name"
              name="from_name"
              className="form-control"
              placeholder="First Name and Last Name"
              required
              onChange={(event) => setVistorName(event.target.value)}
              value={vistorName}
            />
          </div>
          <div className="col">
            <label htmlFor="email" className="form-label m-2">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="email"
              name="from_email"
              className="form-control"
              placeholder="Email"
              required
              onChange={(event) => setVistorEmail(event.target.value)}
              value={vistorEmail}
            />
          </div>
          <div className="col-12">
            <label className="m-2" htmlFor="message">
              Message
            </label>
            <textarea
              type="message"
              id="message"
              name="message"
              rows="5"
              className="form-control"
              placeholder="Tell me what you need help with. :)"
              required
              onChange={(event) => setVistorMessage(event.target.value)}
              value={vistorMessage}
            />
          </div>
          <div className="d-flex pt-3">
            <ReCAPTCHA
              ref={recaptchaRef} // Reference for ReCAPTCHA
              className="g-recaptcha p-3"
              sitekey={publicReChapKey}
              onChange={onChange}
              theme={"dark"}
            />
          </div>
          <button
            type="submit"
            className="btn btn-lg btn-primary m-3 flex-fill flex-wrap"
            disabled={!verified}
          >
            {" "}
            Submit{" "}
          </button>
        </form>
        {errorMessage && (
          <div>
            <div
              className="alert alert-danger alert-dismissible fade show text-center fixed-bottom"
              role="alert"
            >
              <strong>Error:</strong> {errorMessage}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}
        {!show && (
          <div>
            <div
              className="alert alert-success alert-dismissible fade show text-center fixed-bottom"
              role="alert"
            >
              <h4 className="alert-heading">
                <BsCheck2 />
                <strong> Well done!</strong>
              </h4>
              <p>Message sent! I'll get back to you as soon as I can</p>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        )}
      </div>
    );
}

export default ContactMe;
