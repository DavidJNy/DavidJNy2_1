import React, { useState } from 'react';
import JokesModal from './alljokemodal'

const DadJokes = () => {
    const [randomJoke, setRandomJoke] = useState(null);
    const [newJoke, setNewJoke] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

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
      <div className="m-4">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4 mb-3">
              <button
                className="btn btn-danger w-100"
                type="button"
                onClick={fetchRandomJoke}
              >
                {randomJoke === null
                  ? "Click here for funny Dad Jokes"
                  : "More Dad Jokes"}
              </button>
            </div>
            {randomJoke ? (
              <div className="col-md-6 mb-3">
                <div className="p-3 border h-100 card">
                  <span>{randomJoke || "No Chuck Norris fact yet."}</span>
                </div>
              </div>
            ) : null}
        </div>
        <div className="">
          <button className="btn btn-secondary" onClick={handleShowModal}>
            Show All Jokes
          </button>
        </div>
        <JokesModal show={showModal} handleClose={handleCloseModal} />
        <div className="mt-4 ">
          <h4 className="text-light">Want to enter a dad joke?</h4>
          <form onSubmit={handleAddJoke}>
            <div className="form-group col-sm-6">
              <input
                type="text"
                className="form-control"
                value={newJoke}
                onChange={(e) => setNewJoke(e.target.value)}
                placeholder="Enter your dad joke"
                required
              />
            </div>
            <button type="submit" className="btn btn-danger mt-2">
              Add Joke
            </button>
          </form>
        </div>
      </div>
    );
};

export default DadJokes;
