import NavigationBar from "./components/Navibar.js";
import { Route, Routes, BrowserRouter, createBrowserRouter, RouterProvider} from 'react-router-dom';
import Projects from './components/Projects.js';
import Main from './components/Main.js';
import About from './components/About.js';
import ContactMe from './components/Contact.js';
import YouLost from './components/YouLost.js';
import Footer from './components/Footer.js';
import ParkBuddy from './components/parkbuddy/mainParkBuddy.js'
import DeepValueTrade from './components/deepValueTrades/mainDeepValueTrades.js'
import Vortex from './components/Vortex/mainVortex.js'
import Jokes from './components/jokes/mainjokes.js'
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
            <Route path="/ParkBuddy" element={<ParkBuddy/>}/>
            <Route path="/DeepValueTrade" element={<DeepValueTrade/>}/>
            <Route path="/Vortex" element={<Vortex/>}/>
            <Route path="/Jokes" element={<Jokes />}/>
            <Route path="*" element={<YouLost/>}/>
          </Routes>
        <Footer/>
        </div>
    </BrowserRouter>

  );
}

export default App;

// https://reactrouter.com/en/main/start/tutorial