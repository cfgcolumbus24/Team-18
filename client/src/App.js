import './App.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Report from './pages/Report';
import Analytics from './pages/Analytics';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/report' element={<Report />}/>
          <Route path='/analytics' element={<Analytics />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
