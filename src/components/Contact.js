import { useState } from 'react';
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";

function ContactMe () {
    
    const [verified, setVerified] = useState(false);
    const [vistorName, setVistorName] = useState('');
    const [vistorEmail, setVistorEmail] = useState('');
    const [vistorMessage, setVistorMessage] = useState('');
    const publicReChapKey = "6Ldb6tIgAAAAAHjqzENAoVtM-7DPaXvBHjJD4f1Z"
    
    function onChange() {
        setVerified(!verified);
    }

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm("service_y3y5wnt", "template_mzxvv08", e.target , "NcI_XxwCuCd3nSlEp")
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
        setVistorName('');
        setVistorEmail('');
        setVistorMessage('');
    };

        return (
            <section id="Contact" class="d-flex flex-column container bg-dark text-light p-3">
                <div>
                    <div class='container '>
                        <h1 class=''>Contact Me</h1>
                        <p class='summary'>A little more about myself. Started learning <i class="fa-brands fa-2xl fa-html5"></i>  HTML and <i class="fa-brands fa-2xl fa-css3"></i> CSS along with <i class="fa-brands fa-2xl fa-js-square"></i> Javascript in 2017 using freecodecamp, Codecademy &amp; W3. 
                            Then got real serious 2020 when the pandemic hit. Picked up <i class="fa-brands fa-2xl fa-react"></i> React and <i class="fa-brands fa-2xl fa-node"></i> NodeJS &amp; along with Express for Backend application.
                            With a wide variety of helpful resources that other developers share from StackOverflow, Youtube, Medium, and discord; I actually
                            feel confident enough to build this website. <br /><br />Thanks! Much Love  <i class="fa-solid fa-2xl fa-heart"></i>
                        </p>
                        <p>Click here for my Github and Linkedin: &emsp;<a href="https://github.com/DavidJNy"><i class="fa-brands fa-2xl fa-github"></i></a> &emsp; 
                            <a href="https://www.linkedin.com/in/DavidJNy"><i class="fa-brands fa-2xl fa-linkedin" ></i></a>
                        </p>
                    </div>
                    <hr class="solid"></hr>
                </div>
                <h2> Go ahead and shoot me an email by filling out the form</h2>
                <p> I'm looking all types of work so feel free to contact me &nbsp;
                <i class="fa-solid fa-at"></i> David.Johnson.Ny@gmail.com</p>
                <form name="container" class="row" method="PUT" id="myForm" onSubmit={sendEmail}>
                    <div class='col'>
                        <label class="m-2" htmlFor="name"> Name </label>
                        <input type="text" id="name" name="from_name" class="form-control" placeholder="First Name and Last Name" onChange={event => setVistorName(event.target.value)} value={vistorName} />
                    </div>
                    <div class='col'>
                        <label htmlFor="email" class="form-label m-2"> Email </label>
                        <input type="email" id="email" name="from_email" class="form-control" placeholder="Email" onChange={event => setVistorEmail(event.target.value)} value={vistorEmail}/>
                    </div>
                    <div class=''>
                        <label class="m-2" htmlFor="message">Message</label>
                        <textarea type="message" id="message" name="message" rows="2" class="form-control" placeholder="Tell me what you need help with. :)" onChange={event => setVistorMessage(event.target.value)} value={vistorMessage}/>
                    </div>
                    <ReCAPTCHA
                        class="g-recaptcha p-4"
                        sitekey={publicReChapKey}
                        onChange={onChange}
                    />
                        <button type="submit" class="btn btn-primary m-3" disabled={!verified}> Submit </button>
                    </form>
                
            </section>
    )
}

export default ContactMe;