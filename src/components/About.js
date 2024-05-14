import proPix from './images/meprofile.jpg';

function About() {

    return (
        <>
            <div id="About" class="text-light mb-5">
                <div class='row container border justify-contents-center mx-auto mt-5'>
                    <h1 class="display-5 mt-3 col-12 text-center ">
                        My name is David Ny and I'm a web developer.
                    </h1>
                    <div class=''>
                        <div class='row row-reverse'>
                            <div class='col-md-6 col-12 align-items-center text-center flex-fill'>
                                <img src={proPix} class='img-fluid round m-2' alt="mepro"></img>
                            </div>
                            <div class='col-md-6 row align-items-center'>
                                <p class="m-2">
                                    The name PrickTox is a rough phonetic english transcription translation for fried chili in Thai.
                                    Its a nice snack to have if you like spicy chips like hot cheetos. It is very delicious.
                                </p>
                                <hr class='my-4 col-sm-6 mx-auto'></hr>
                                <p class="m-2">
                                    Ex-biochemist looking for new things to learn.
                                    Currently transitioning to get into tech.
                                    Interested in frontend, backend, and also data science.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;