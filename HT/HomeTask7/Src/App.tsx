import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navigation from './Components/Navigation';
import Heroes from './Components/Heroes';
import HeroDetail from './Components/HeroDetail'; 
import About from './Components/About';

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Navigation />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Routes>
            <Route path='/home' element={<Home/>}/>
            <Route path="/" element={<Heroes />} />
            <Route path="/heroes" element={<Heroes />} />
            <Route path="/heroes/:id" element={<Heroes />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
