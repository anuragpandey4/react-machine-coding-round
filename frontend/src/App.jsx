import {useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <div className="p-6 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Auth setToken={setToken} />} />
        </Routes>
      </div>
    </Router>
  );
}