
import proPix from './images/meprofile.jpg';
import luckyPic from './images/luckypic.jpg';

function About() {

    return (
        <div id="About">
            <div class="d-sm-block d-lg-flex p-2 justify-contents-center">
                <div class="p-2 text-light">
                    <h1 class="display-5">My name is David Ny and I'm a web developer.</h1>
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
                {/* <div class="p-2 d-sm-block justify-content-center"> */}
                    <img src={proPix} class="img-fluid rounded float-left p-3 m-3" alt="mepro"></img>
                    <img src={luckyPic}  class='p-3 d-sm-none' height="400" alt='LuckPic'></img>
                {/* </div> */}
            </div>
        </div>

    );
}

export default About;