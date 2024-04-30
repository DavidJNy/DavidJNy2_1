import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from "react-router-dom";
//import { Route, Routes } from "react-router-dom";
// Rewrite this
// import { Privacy_notice, Cookie_preferences, Terms_of_Service} from './components/footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App/>
        {/* <Route path="/Privacy_Notice" element={<Terms_of_Service/>}/>
        <Route path="/Terms_of_Service" element={<Terms_of_Service/>}/>
        <Route path="/Cookie_preferences" element={<Cookie_preferences/>}/> */}
    </BrowserRouter>
);

// Strict mode remove due to conflicts with Google react-Rechapca.
