import React from "react";
import { Box, Avatar, Typography, Button, Container} from "@mui/material";
import ImageGallery from "../components/ImageGallery"; // Import galerii

function Myaccount() {
  return (
    <Container>
    <Box>
      {/* Nagłówek z coverem */}
      <Box
        sx={{
          width: "100%",
          height: "250px",
          backgroundImage: "url('https://via.placeholder.com/1500x500')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <Avatar
          src="https://via.placeholder.com/150"
          alt="Avatar"
          sx={{
            width: 100,
            height: 100,
            position: "absolute",
            bottom: 0,
            left: 20,
            border: "3px solid white",
          }}
        />
      </Box>

      {/* Nazwa konta i liczniki */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Artysta 1
        </Typography>
        <Box sx={{ display: "flex", gap: 5 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              10
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Dodane prace
            </Typography>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              50
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Obserwujący
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Opis profilu */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          To jest miejsce na opis profilu. Możesz tutaj dodać informacje o sobie, swojej twórczości lub inne dane.
        </Typography>
      </Box>

      {/* Przyciski */}
      <Box sx={{ px: 3, py: 2, display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary">
          Edytuj profil
        </Button>
        <Button variant="outlined" color="primary">
          Udostępnij profil
        </Button>
      </Box>

      {/* Galeria zdjęć */}
      <ImageGallery />
    </Box>
    </Container>
  );
}

export default Myaccount;