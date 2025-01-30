import React, { createContext, useState, useEffect } from "react";
import './App.css';
import Gallery from './pages/Gallery.js';
import GalleryOfArtists from './pages/GalleryOfArtists.js';
import Artwork from './pages/Artwork.js';
import AddArtwork from './pages/AddArtwork.js';
import ShoppingCart from './pages/ShoppingCart.js';
import ShoppingCartDelivery from "./pages/ShoppingCartDelivery.js";
import CartSummary from "./pages/CartSummary.js";
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import MyProfile from './pages/MyProfile.js';
import ArtistProfile from './pages/ArtistProfile.js';
import Register from './pages/Register.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Orders from './pages/Orders.js'
import OrderDetails from "./pages/OrderDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme.js';
import axios from 'axios';
import { CartProvider } from "./contexts/CartContext";
import EditArtwork from "./pages/EditArtwork.js";
import EditProfile from "./pages/EditProfile.js";  

// Tworzenie kontekstu autoryzacji
export const AuthContext = createContext(null);
axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

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
     <CartProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Resetuje style domyślne i stosuje dark mode */}
        <div className="App">
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/artists" element={<GalleryOfArtists />} />
              <Route path="/add" element={<AddArtwork />} />
              <Route path="/cart" element={<ShoppingCart />} />
              <Route path="/cartdelivery" element={<ShoppingCartDelivery />} />
              <Route path="/cartsummary" element={<CartSummary />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/register" element={<Register />} />
              <Route path="/artworks/:id" element={<Artwork />} />
              <Route path="/edit/:id" element={<EditArtwork />} />
              <Route path="/edit-artist/:id" element={<EditProfile />} />
              <Route path="/artists/:id" element={<ArtistProfile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </ThemeProvider>
      </CartProvider>
    </AuthContext.Provider>
  );
}

export default App;
