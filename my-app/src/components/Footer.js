import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box mt={4} py={2} sx={{ bgcolor: "primary.main", color: "primary.contrastText", textAlign: "center" }}>
      <Box>
        <Typography variant="body2">Menu:</Typography>
        <Typography variant="body2">Strona Główna | Galeria | O mnie | Kontakt</Typography>
      </Box>
      <Typography variant="body1" gutterBottom>
        &copy; {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;