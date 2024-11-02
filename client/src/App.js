import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import HardcodedChart from './pages/datavisual';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/datavisual' element={<HardcodedChart />} /> {/* Corrected casing */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

