import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

function CNorris() {
  const [data, setData] = useState(null);

  const fetchFacts = () => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => {
        return response.json();
      })
      .then((actualData) => {
        setData(actualData.value);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="m-4">
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mb-3">
          <button
            className="btn btn-danger w-100"
            type="button"
            onClick={fetchFacts}
          >
            {data === null
              ? "Click here for funny Chuck Norris facts"
              : "Get Another Chuck Norris Fact"}
          </button>
        </div>
        <div className="col-md-6 mb-3">
          <div className="p-3 border bg-light h-100 card">
            <span>{data || "No Chuck Norris fact yet."}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CNorris;
