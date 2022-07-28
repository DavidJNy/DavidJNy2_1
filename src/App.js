import React from 'react';
import NavigationBar from "./components/Navibar.js";
import { Route, Routes } from 'react-router-dom';
import Projects from './components/Projects.js';
import Main from './components/Main.js';
import About from './components/About.js';
import ContactMe from './components/Contact.js';

function App() {

  return (

    <div className="App" class='bg-dark'>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Projects" element={<Projects/>}/>
        <Route path="/Contact" element={<ContactMe/>}/>
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </div>

  );
}

export default App;
