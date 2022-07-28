import React from "react";
import proPix from './images/meprofile.jpg';
import luckyPic from './images/luckypic.jpg';

function About() {

    return (

        <div> 
            <div class="container p-3 mb-2 bg-dark">
                <div class="d-flex flex-fill p-2">
                    <div class="d-flex flex-column p-2 text-light">
                        <p class="display-5">My name is David Ny and I'm a web developer.</p>
                        <p class="p-2">
                        The name PrickTox is a rough phonetic english transcription translation for fried chili in Thai. 
                        <br/>Its a nice snack to have if you like spicy chips like hot cheetos. It is very delicious.
                        </p>
                        <p class="p-2">
                            Southern California kid for hire. Ex-biochemist from UCSC always looking for new things to learn. 
                            Currently transitioning to get into tech. 
                            Interested in frontend,backend, and also data science. 
                        </p>
                    </div>
                    <div class="d-flex flex-fill p-2">
                        <figure class="figure">
                            <img src={proPix} class="figure-img img-fluid rounded float-right" alt="mepro" />
                            <figcaption class="figure-caption text-end text-light">Me looking smashin' baby</figcaption>
                        </figure>
                        {/* my mom said to put this picture on my computer or anything as a form of goodluck. she probably got it from a buddhist monk that tells the futures. i don't know what it is. she won't tell me exactly cuz my own mother can't speak proper english. sooooooo......its there. i'm stuck in on the website. its also on my phone. cuz i'm a good son. ok. this comment is a long one. bye */}
                    </div>
                    <img alt='LuckPic' class='d-flex p-3' width="200px" src={luckyPic}></img>
                </div>
            </div>
        </div>

    );
}

export default About;