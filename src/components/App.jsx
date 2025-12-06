import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Destinations from './Destinations.jsx';
import DestinationDetails from './DestinationDetails.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Forum from './Forum.jsx';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>

  );
}
