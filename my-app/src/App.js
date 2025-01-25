import './App.css';
import Gallery from './pages/Gallery.js';
import GalleryOfArtists from './pages/GalleryOfArtists.js';
import Artwork from './pages/Artwork.js';
import AddPic from './pages/AddPic.js';
import ShoppingCart from './pages/ShoppingCart.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import Myaccount from './pages/Myaccount.js';
import Profile from './pages/Profile.js';
import Register from './pages/Register.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme.js'; // Import pliku theme.js
// import ArtworkDetails from './components/ArtworkDetails.js';

function App() {
  return (
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
          <Route path="/logout" element={<Logout />} />
          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/artworks/:id" element={<Artwork/>} />
        </Routes>
        <Footer/>
      </Router>
      
    </div>
    </ThemeProvider>
  );
}




export default App;