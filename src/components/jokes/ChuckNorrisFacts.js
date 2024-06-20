import React, { useState } from "react";

function CNorris() {

    const [data, setData] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    //why isn't this updated to github?
    
    const fetchFacts = () => {
        fetch("https://api.chucknorris.io/jokes/random").then(response => {
        return response.json();
    })
    .then(actualData => {
        // console.log(actualData.value);
        setData(actualData.value);
    })
    .catch(err => {
        console.error(err);
    });
    }

        return (
            <div className=" p-3 mb-2v text-light container col-10" >
                <hr className="solid"></hr>
                <div className='row p-3' >
                    <h4 className='col-sm pt-2 p'>Random Chuck Norris Quotes: </h4>
                    <button className="btn btn-primary col-sm py2" type="button" onClick={fetchFacts}>Click here for funny Chuck Norris facts</button>
                </div>
                <span>{data}</span>
                <hr className="solid"></hr>
            </div>
    )
}

export default CNorris;