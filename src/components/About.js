
import proPix from './images/meprofile.jpg';
import luckyPic from './images/luckypic.jpg';

function About() {

    return (
        <div id="About">
            <div class="p-3 mb-2 bg-dark">
                <div class=" p-2">
                    <div class="p-2 text-light">
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
                    <div class="d-flex p-2">
                        <img src={proPix} class="img-fluid rounded float-right" alt="mepro"></img>
                        <img alt='LuckPic' class=' p-3 d-block d-sm-block' width="100px" src={luckyPic}></img>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default About;