import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import  Dashboard from './components/Dashboard.jsx';
import IntrusionDetectionDashboard from './components/IntrusionDetectionDashboard.jsx';
import BlockchainVerificationPage from './components/BlockchainVerificationpage.jsx';
import SecurityAssistant from './components/AvatarDemo.jsx';



function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path='/home' element={<Home />} />
    <Route path='/' element={<Home />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/detection' element={<IntrusionDetectionDashboard />} />
    <Route path='/blockchain-ledger' element={<BlockchainVerificationPage />} />
    <Route path='/assistant' element={<SecurityAssistant />} />

    

    </Routes>
  </BrowserRouter>
  );
}

export default App;