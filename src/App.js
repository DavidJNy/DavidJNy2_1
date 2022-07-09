import React from 'react';
import { BrowserRouter } from "react-router-dom";
import NavigationBar from "./components/Navibar";
import Main from "./components/Main";
import ContactUs from "./components/ContactUs";
import Projects from "./components/Projects";
import Crypto from "./components/Crypto.js";
import CNorris from "./components/ChuckNorrisFacts.js";
import './App.css';

function App() {
  return (
    <div className="App" class='bg-dark'>
      <BrowserRouter>
        <NavigationBar/>
        <Main/>
        <CNorris/>
        <Projects />
        <Crypto/>
        <ContactUs />
      </BrowserRouter >
    </div>
  );
}

export default App;
