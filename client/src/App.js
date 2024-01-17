import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/home/home';
import Layout from './components/layout/Layout';
import Register from './pages/Auth/Register';
import Forgot from './pages/Auth/Forgot';
import Login from './pages/Auth/Login';
import Reset from './pages/Auth/Reset'
import LoginAuth from './pages/Auth/LoginAuth';
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/ChangePassword/ChangePassword';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout>
            <Home />
          </Layout>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/resetPassword/:resetToken" element={<Reset />} />
          <Route path="/loginAuth/:email" element={<LoginAuth />} />
        

          <Route path="/profile" element={
            <Layout> <Profile /> </Layout>
          } />
          
           <Route path="/ChangePassword" element={
            <Layout> <ChangePassword /> </Layout>
          } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
