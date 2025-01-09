import './App.css';
import Gallery from './pages/Gallery.js';
import Feature1 from './pages/Feature1.js';
import Feature2 from './pages/Feature2.js';
import Feature3 from './pages/Feature3.js';
import Home from './pages/Home.js';
import Login from './pages/Login.js';
import Logout from './pages/Logout.js';
import Myaccount from './pages/Myaccount.js';
import Profile from './pages/Profile.js';
import Register from './pages/Register.js';
import Header from './components/Header.js';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme.js'; // Import pliku theme.js

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
          <Route path="/feature1" element={<Feature1 />} />
          <Route path="/feature2" element={<Feature2 />} />
          <Route path="/feature3" element={<Feature3 />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/myaccount" element={<Myaccount />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      
    </div>
    </ThemeProvider>
  );
}




export default App;