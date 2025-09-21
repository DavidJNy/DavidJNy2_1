import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import NavigationBar from "./components/Navibar.js";
import Projects from "./components/Projects.js";
import Main from "./components/Main.js";
import About from "./components/About.js";
import ContactMe from "./components/Contact.js";
import YouLost from "./components/YouLost.js";
import Footer from "./components/Footer.js";
import ParkBuddy from "./components/parkbuddy/mainParkBuddy.js";
import DeepValueTrade from "./components/deepValueTrades/mainDeepValueTrades.js";
import Vortex from "./components/Vortex/mainVortex.js";
import Jokes from "./components/jokes/mainjokes.js";
import VidDownloader from "./components/VidDwnloader.js";
import ScrollToTheTop from "./components/scrollToTop.js";
import FullScreenTables from "./components/deepValueTrades/FullScreenTables";
import "./components/styles/main.scss";

// -------------------- Layouts --------------------

// Default layout: nav + background + footer
const DefaultLayout = ({ children }) => (
  <div id="App">
    <div className="fixed-background-container"></div>
    <NavigationBar />
    {children}
    <Footer />
  </div>
);

// Fullscreen layout: just content, no nav/footer
const FullscreenLayout = ({ children }) => <>{children}</>;

// -------------------- FullScreenTables Wrapper --------------------
function FullScreenTablesWrapper() {
  const settings = JSON.parse(localStorage.getItem("deepValueSettings") || "{}");
  const scanners = [
    { endpoint: "percent_increases", title: "Percent Increases Scanner" },
    { endpoint: "relative_volume_spike", title: "Relative Volume Spikes Scanner" },
    { endpoint: "big_volume_pump", title: "Big Volume Pump" },
    { endpoint: "big_percent_increase", title: "Big Percent Increase Scanner" },
    { endpoint: "stock_halts", title: "Stock Halts" },
  ];

  return <FullScreenTables scanners={scanners} settings={settings} setSettings={() => {}} />;
}

// -------------------- App --------------------
function App() {
  return (
    <BrowserRouter>
      <ScrollToTheTop />
      <Routes>
        {/* Fullscreen route */}
        <Route
          path="/fullscreen-tables"
          element={
            <FullscreenLayout>
              <FullScreenTablesWrapper />
            </FullscreenLayout>
          }
        />

        {/* Default routes */}
        <Route
          path="/"
          element={
            <DefaultLayout>
              <Main />
            </DefaultLayout>
          }
        />
        <Route
          path="/About"
          element={
            <DefaultLayout>
              <About />
            </DefaultLayout>
          }
        />
        <Route
          path="/Projects"
          element={
            <DefaultLayout>
              <Projects />
            </DefaultLayout>
          }
        />
        <Route
          path="/Contact"
          element={
            <DefaultLayout>
              <ContactMe />
            </DefaultLayout>
          }
        />
        <Route
          path="/ParkBuddy"
          element={
            <DefaultLayout>
              <ParkBuddy />
            </DefaultLayout>
          }
        />
        <Route
          path="/DeepValueTrade"
          element={
            <DefaultLayout>
              <DeepValueTrade />
            </DefaultLayout>
          }
        />
        <Route
          path="/Vortex"
          element={
            <DefaultLayout>
              <Vortex />
            </DefaultLayout>
          }
        />
        <Route
          path="/Jokes"
          element={
            <DefaultLayout>
              <Jokes />
            </DefaultLayout>
          }
        />
        <Route
          path="/VidDownloader"
          element={
            <DefaultLayout>
              <VidDownloader />
            </DefaultLayout>
          }
        />

        {/* Catch-all */}
        <Route
          path="*"
          element={
            <DefaultLayout>
              <YouLost />
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
