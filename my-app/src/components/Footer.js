import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box mt={4} py={4} sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
      <Box
        sx={{
          marginLeft: "50px",
          marginRight: "50px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap", // Pozwoli na lepsze dopasowanie na mniejszych ekranach
          gap: 1, // Odstępy między kolumnami
        }}
      >
        {/* Kolumna 1: Informacje */}
        <Box sx={{ flexBasis: "30%", minWidth: "200px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Informacje
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <Link to="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>
                Polityka prywatności
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <Link to="/terms-of-service" style={{ color: "inherit", textDecoration: "none" }}>
                Regulamin serwisu
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <Link to="/contact" style={{ color: "inherit", textDecoration: "none" }}>
                Kontakt
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Kolumna 2: Obsługa klienta */}
        <Box sx={{ flexBasis: "30%", minWidth: "200px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Obsługa klienta
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <Link to="/payment-methods" style={{ color: "inherit", textDecoration: "none" }}>
                Formy płatności
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <Link to="/delivery-options" style={{ color: "inherit", textDecoration: "none" }}>
                Formy i koszty dostawy
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <Link to="/returns-exchanges" style={{ color: "inherit", textDecoration: "none" }}>
                Zwroty i wymiana
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <Link to="/complaints" style={{ color: "inherit", textDecoration: "none" }}>
                Reklamacje
              </Link>
            </Typography>
          </Box>
        </Box>

        {/* Kolumna 3: Twoje konto */}
        <Box sx={{ flexBasis: "30%", minWidth: "200px" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Twoje konto
          </Typography>
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <Link to="/profile" style={{ color: "inherit", textDecoration: "none" }}>
                Twój profil
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <Link to="/account-settings" style={{ color: "inherit", textDecoration: "none" }}>
                Ustawienia konta
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <Link to="/order-status" style={{ color: "inherit", textDecoration: "none" }}>
                Status zamówienia
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
