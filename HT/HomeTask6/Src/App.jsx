import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./Components/Navigation.jsx";
import Heroes from "./Components/Heroes.jsx";
import HeroDetail from "./Components/HeroDetail.jsx";
import About from "./Components/About.jsx";
import Home from "./Components/Home.jsx";

import "../styles/styles.css";

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Heroes />} />
            <Route path="/home" element={<Home />} />
            <Route path="/heroes" element={<Heroes />} />
            <Route path="/heroes/:id" element={<Heroes />} />{" "}
            <Route path="/hero/:id" element={<Heroes />} />{" "}
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
