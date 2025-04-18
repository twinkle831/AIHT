import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';


function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/home' element={<Home />} />
    <Route path='/' element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;