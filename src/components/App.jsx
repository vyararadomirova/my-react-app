import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home.jsx";
import Destinations from "./Destinations/Destinations.jsx";
import DestinationDetails from "./DestinationDetails/DestinationDetails.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";
import Forum from "./Forum/Forum.jsx";
import AuthGuard from "./AuthGuard.jsx";
import AuthProvider from "./AuthProvider.jsx";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:id" element={<DestinationDetails />} />
          <Route path="/forum" element={
            <AuthGuard>
              <Forum />
            </AuthGuard>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>

  );
}
