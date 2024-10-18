import React from "react";
import thaiboats from './images/thailand/thaiboats.jpg'


function App() {

  return (
    <div id="YouLost" className="container text-white text-center">
      Opp... Something went wrong.
      <img src={thaiboats} alt="" class="img-fluid"></img>
    </div>
  );
}

export default App;