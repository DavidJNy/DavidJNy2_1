import React from 'react';
import ChuckNorris from './ChuckNorrisFacts.js'
import DadJokes from './mainDadJokes.js'


function Mainjokes() {

    return (
      <div id="mainJokes" className="justify-content-center container p-3">
        <div className="border mt-4">
          <ChuckNorris />
        </div>
        <div className="border mt-4">
          <DadJokes />
        </div>
      </div>
    );
}

export default Mainjokes;
