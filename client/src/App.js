import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/home/home';
import Layout from './components/layout/Layout';
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <Home />
          </Layout>
          } />

          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
