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
          <Typography variant="h5" sx={{ mb: 2 }}>
            Galeria prac
          </Typography>
          <ArtworksGallery artistId={user.id} /> {/* Przekazujemy id artysty do galerii */}
        </Box>
      </Box>
    </Container>
  );
}

export default MyProfile;



// function Myaccount() {
//   return (
//     <Container>
//     <Box>
//       {/* Nagłówek z coverem */}
//       <Box
//         sx={{
//           width: "100%",
//           height: "250px",
//           backgroundImage: "url('https://via.placeholder.com/1500x500')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           position: "relative",
//         }}
//       >
//         <Avatar
//           src="https://via.placeholder.com/150"
//           alt="Avatar"
//           sx={{
//             width: 100,
//             height: 100,
//             position: "absolute",
//             bottom: 0,
//             left: 20,
//             border: "3px solid white",
//           }}
//         />
//       </Box>

//       {/* Nazwa konta i liczniki */}
//       <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 3 }}>
//         <Typography variant="h4" sx={{ fontWeight: "bold" }}>
//           Artysta 1
//         </Typography>
//         <Box sx={{ display: "flex", gap: 5 }}>
//           <Box>
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               10
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               Dodane prace
//             </Typography>
//           </Box>
//           <Box>
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               50
//             </Typography>
//             <Typography variant="body2" color="textSecondary">
//               Obserwujący
//             </Typography>
//           </Box>
//         </Box>
//       </Box>

//       {/* Opis profilu */}
//       <Box sx={{ px: 3, py: 2 }}>
//         <Typography variant="body1" sx={{ mb: 2 }}>
//           To jest miejsce na opis profilu. Możesz tutaj dodać informacje o sobie, swojej twórczości lub inne dane.
//         </Typography>
//       </Box>

//       {/* Przyciski */}
//       <Box sx={{ px: 3, py: 2, display: "flex", gap: 2 }}>
//         <Button variant="contained" color="primary">
//           Edytuj profil
//         </Button>
//         <Button variant="outlined" color="primary">
//           Udostępnij profil
//         </Button>
//       </Box>

//       {/* Galeria zdjęć */}
//       <ImageGalleryEdit />
//     </Box>
//     </Container>
//   );
// }

// export default Myaccount;

