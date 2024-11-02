import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import HardcodedChart from './pages/datavisual';
import Report from './pages/Report';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Login />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/analytics' element={<Analytics />}/>
          <Route path='/report' element={<Report />}/>
          <Route path='/datavisual' element={<HardcodedChart />} /> {/* Corrected casing */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

