import React, { Component }  from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/home/home' ;


function App() {
  return (
    <div>
     <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
