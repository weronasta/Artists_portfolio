import React, { useState } from "react";
import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import ArtworkDetails from "../components/ArtworkDetails"; // Główne dzieło
import OtherArtworksSlider from "../components/OtherArtworksSlider"; // Slider z innymi dziełami

function Artwork() {
  const [quantity, setQuantity] = useState(1);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      maxWidth="1200px"
      mx="auto"
      padding={4}
      bgcolor="background.default"
    >
      <ArtworkDetails />
      <OtherArtworksSlider />
    </Box>
  );
}

export default Artwork;
