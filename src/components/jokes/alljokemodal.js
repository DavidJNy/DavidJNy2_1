import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const JokesModal = ({ show, handleClose }) => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    if (show) {
      fetch('/api/jokes')
        .then(response => response.json())
        .then(data => setJokes(data))
        .catch(error => console.error('Error fetching jokes:', error));
    }
  }, [show]);

  const handleDelete = (id) => {
    fetch(`/api/jokes/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        // Remove the deleted joke from the state
        setJokes(jokes.filter(joke => joke.id !== id));
      })
      .catch(error => console.error('Error deleting joke:', error));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Dad Jokes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {jokes.length === 0 ? (
          <p>No jokes available.</p>
        ) : (
          <ul className="list-group">
            {jokes.map(joke => (
              <li key={joke.id} className="list-group-item d-flex justify-content-between align-items-center">
                {joke.joke}
                {!joke.is_default && (  // Only show delete button if joke is not a default joke
                  <Button variant="danger" size="sm" onClick={() => handleDelete(joke.id)}>
                    Delete
                  </Button>
                )}
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JokesModal;
