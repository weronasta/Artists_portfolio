import React, { createContext, useState, useEffect } from "react";
import './App.css';
import Gallery from './pages/Gallery.js';
import GalleryOfArtists from './pages/GalleryOfArtists.js';
import Artwork from './pages/Artwork.js';
import AddPic from './pages/AddPic.js';
import ShoppingCart from './pages/ShoppingCart.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Myaccount from './pages/Myaccount.js';
import ArtistProfile from './pages/ArtistProfile.js';
import Register from './pages/Register.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme.js';

// Tworzenie kontekstu autoryzacji
export const AuthContext = createContext(null);

function App() {
  // Stan logowania użytkownika
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    user: null,
    token: null,
  });

  // Pobieranie informacji o logowaniu z localStorage przy pierwszym renderze
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");

    if (token && user) {
      setAuth({
        isLoggedIn: true,
        user: JSON.parse(user),
        token: token,
      });
    }
  }, []);

  // Funkcja logowania
  const login = (userData, token) => {
    setAuth({
      isLoggedIn: true,
      user: userData,
      token: token,
    });
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Funkcja wylogowania
  const logout = () => {
    setAuth({
      isLoggedIn: false,
      user: null,
      token: null,
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Resetuje style domyślne i stosuje dark mode */}
        <div className="App">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/artists" element={<GalleryOfArtists />} />
              <Route path="/AddPic" element={<AddPic />} />
              <Route path="/ShoppingCart" element={<ShoppingCart />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/myaccount" element={<Myaccount />} />
              <Route path="/register" element={<Register />} />
              <Route path="/artworks/:id" element={<Artwork />} />
              <Route path="/artists/:id" element={<ArtistProfile />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
