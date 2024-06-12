import React, { useState } from 'react';

const DadJokes = () => {
    const [randomJoke, setRandomJoke] = useState(null);

    const fetchRandomJoke = () => {
        fetch('/api/jokes/random')
            .then(response => {response.json(); console.log(response.json)})
            .then(data => {setRandomJoke(data.joke); console.log(data.joke)})
            .catch(error => console.error('Error fetching random joke:', error));
    };

    return (
        <div className='container'>
            {randomJoke && <p>{randomJoke}</p>}
            <div className="container p-3 mb-2 bg-dark text-light" >
                <hr className="solid"></hr>
                <div className='row p-3' >
                    <h4 className='col-sm pt-2 p'>Random Dad Jokes: </h4>
                </div>
                <span>{randomJoke}</span>
                <hr className="solid"></hr>
            </div>
            <button className="btn btn-primary col-sm py2" type="button" onClick={fetchRandomJoke}> Click here for funny Chuck Norris facts</button>
        </div>
    );
};

export default DadJokes;
