import NavigationBar from "./components/Navibar.js";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Projects from './components/Projects.js';
import Main from './components/Main.js';
import About from './components/About.js';
import ContactMe from './components/Contact.js';
import YouLost from './components/YouLost.js';
import Footer from './components/Footer.js';
import './components/styles/main.scss';

function App() {

  return (
    <BrowserRouter>
     <div id="App">
      <NavigationBar/>
       <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Projects" element={<Projects/>}/>
        <Route path="/Contact" element={<ContactMe/>}/>
        <Route path="*" element={<YouLost/>}/>
        </Routes>
      <Footer/>
     </div>
    </BrowserRouter>

  );
}

export default App;
