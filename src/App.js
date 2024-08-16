import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginRegister from './components/LoginRegister';
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import './styles/App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Redirect if not logged in */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={!token ? <LoginRegister /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!token ? <LoginRegister /> : <Navigate to="/dashboard" />} />
        {/* <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat/:userId" element={<Chat />} />
        {/* Redirect any other path to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
