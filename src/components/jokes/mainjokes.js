import React from 'react';
import ChuckNorris from './ChuckNorrisFacts.js'
import DadJokes from './mainDadJokes.js'


function Mainjokes() {

    return (
        <div className='justify-content-center container p-3'>
            <ChuckNorris/>
            <DadJokes/>
        </div>
    );
}

export default Mainjokes;
