import React, { useState } from 'react';

const DadJokes = () => {
    const [randomJoke, setRandomJoke] = useState(null);
    const [newJoke, setNewJoke] = useState('');

    const fetchRandomJoke = () => {
        fetch('/api/jokes/random')
            .then(response => response.json())
            .then(data => {
                setRandomJoke(data.joke);
                console.log(data.joke);
            })
            .catch(error => console.error('Error fetching random joke:', error));
    };

    const handleAddJoke = (e) => {
        e.preventDefault();
        fetch('/api/jokes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ joke: newJoke })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Joke added:', data);
                setNewJoke(''); // Clear the input field
            })
            .catch(error => console.error('Error adding joke:', error));
    };

    return (
        <div className='container col-10'>
            {randomJoke && <p>{randomJoke}</p>}
            <div className="container p-3 mb-2 text-light">
                <hr className="solid" />
                <div className='row p-3'>
                    <h4 className='col-sm pt-2'>Random Dad Jokes: </h4>
                    <button className="btn btn-primary col-sm py2" type="button" onClick={fetchRandomJoke}>Click here for a random dad joke</button>
                </div>
                <hr className="solid" />
            </div>
            <div className='container col-10'>
                <h4 className='text-light'>Want to enter a dad joke?</h4>
                <form onSubmit={handleAddJoke}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            value={newJoke}
                            onChange={(e) => setNewJoke(e.target.value)}
                            placeholder="Enter your dad joke"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Joke</button>
                </form>
            </div>
        </div>
    );
};

export default DadJokes;
