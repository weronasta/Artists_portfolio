import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, Container } from "@mui/material";
import ArtistDetails from "../components/ArtistDetails";
import ArtworksGallery from "../components/ArtworksGallery";
import axios from "axios";

function MyProfile() {
  const [user, setUser] = useState([]); // Stan do przechowywania danych o użytkowniku
  const [loading, setLoading] = useState(true); // Stan ładowania danych

  useEffect(() => {
    // Funkcja do pobrania danych o użytkowniku
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }
    
      try {
        console.log("token", token);
        // add auth token to the request
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await axios.get('http://127.0.0.1:5000/profile', {
        });
    
        if (response.status === 200) {
          setUser(response.data);
          console.log("User data:", response.data);
          console.log()
          setLoading(false);
        } else {
          console.error("Error fetching user data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Typography>Ładowanie...</Typography>; // Pokazuje ładowanie, jeśli dane nie zostały jeszcze załadowane
  }

  if (!user) {
    return <Typography>Zaloguj się.</Typography>; // Jeśli brak danych o użytkowniku
  }

  return (
    <Container>
      <Box>
        <ArtistDetails artistID={user.id} />
        {/* Galeria zdjęć */}
        <Box sx={{ px: 3, py: 2 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Galeria prac
          </Typography>
          <ArtworksGallery artistId={user.id} cardType={"edit"}/> {/* Przekazujemy id artysty do galerii */}
        </Box>
      </Box>
    </Container>
  );
}

export default MyProfile;