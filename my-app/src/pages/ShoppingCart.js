import React, { useState } from "react";
import { Box, Typography, Paper, Button, IconButton, Stepper, Step, StepLabel } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import img1 from "../assets/images/artworks/img1.jpg";
import img2 from "../assets/images/artworks/img2.jpg";
import img3 from "../assets/images//artworks/img3.jpg";
import PaymentMethods from "../components/payment";
import ShippingMethods from "../components/ShippingMethods";

function ShoppingCart() {
  // Przykładowe dane produktów w koszyku
  const [cartItems, setCartItems] = useState([
    { id: 1, img: img1, title: "Produkt 1", price: 21.37, quantity: 1 },
    { id: 2, img: img2, title: "Produkt 2", price: 35.99, quantity: 2 },
    { id: 3, img: img3, title: "Produkt 3", price: 14.50, quantity: 1 },
  ]);

  // Obsługa zwiększania i zmniejszania ilości
  const handleIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Obsługa usuwania produktu z koszyka
  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "1200px",
        mx: "auto",
        padding: 4,
        bgcolor: "background.default",
      }}
    >
      {/* Ścieżka zakupowa */}
      <Box width="100%" mb={4}>
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>Koszyk</StepLabel>
          </Step>
          <Step>
            <StepLabel>Dane do płatności</StepLabel>
          </Step>
          <Step>
            <StepLabel>Podsumowanie</StepLabel>
          </Step>
        </Stepper>
      </Box>

      {/* Zawartość koszyka */}
      <Typography
  variant="h4"
  gutterBottom
  sx={{
    textAlign: "left", // Wyrównanie tekstu do lewej
    width: "100%", // Dopasowanie do szerokości kontenera
  }}
>
  Zawartość koszyka
</Typography>
      <Box width="100%" mb={4}>
        {cartItems.map((item) => (
          <Paper
            key={item.id}
            elevation={3}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 2,
              marginBottom: 2,
            }}
          >
            {/* Miniaturka */}
            <Box
              sx={{
                width: "100px",
                height: "100px",
                overflow: "hidden",
                marginRight: 2,
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>

            {/* Szczegóły produktu */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body1" color="text.secondary">
                Cena: {item.price.toFixed(2)} zł
              </Typography>
            </Box>

            {/* Ilość i usuń */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginRight: 2,
              }}
            >
              <IconButton
                color="primary"
                onClick={() => handleDecrease(item.id)}
                disabled={item.quantity <= 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="body1">{item.quantity}</Typography>
              <IconButton color="primary" onClick={() => handleIncrease(item.id)}>
                <AddIcon />
              </IconButton>
            </Box>
            <IconButton color="error" onClick={() => handleRemove(item.id)}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))}
      </Box>

      <Typography
  variant="h4"
  gutterBottom
  sx={{
    textAlign: "left", // Wyrównanie tekstu do lewej
    width: "100%", // Dopasowanie do szerokości kontenera
  }}
>        Wybierz formę płatności
      </Typography>

      {/* Podsumowanie */}
      <Box
  sx={{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // Wyrównanie całości do lewej
  }}
>
  <PaymentMethods />
  <ShippingMethods />
  <Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => alert(`Przeszedłeś dalej!`)}
              >
                Przejdź dalej
              </Button>
            </Box>

</Box>
    </Box>
    
  );
}

export default ShoppingCart;