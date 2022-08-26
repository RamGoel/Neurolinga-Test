import React from 'react';
import './style.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Admin from './components/Admin';
import User from './components/User';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
