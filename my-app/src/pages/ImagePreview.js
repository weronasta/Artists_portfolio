import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import img1 from "../assets/images/img1.jpg"; // Ścieżka do Twojego obrazka

function PreviewImage() {
  // Stan dla ilości sztuk
  const [quantity, setQuantity] = useState(1);

  // Tymczasowe dane obrazu
  const imageData = {
    img: img1, // Przykładowy obrazek
    title: "Sample Artwork",
    description: "This is a sample description of the artwork. You can replace this with any text you like.",
    availability: "Dostępne", // Informacja o dostępności
    price: "21.37 zł", // Cena
  };

  // Funkcje obsługi zwiększania i zmniejszania ilości
  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding={4}
      bgcolor="background.default"
    >
      {/* Sekcja z obrazkiem */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          maxWidth: "50%",
          marginRight: 4,
          padding: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={imageData.img}
          alt={imageData.title}
          style={{ width: "100%", height: "auto", borderRadius: "8px" }}
        />
      </Paper>

      {/* Sekcja z tytułem, opisem, dostępnością i ceną */}
      <Box
        flex={1}
        maxWidth="50%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        padding={2}
        bgcolor="background.paper"
        borderRadius={2}
        boxShadow={3}
      >
        {/* Box z tytułem */}
        <Box mb={2}>
          <Typography variant="h4" gutterBottom>
            {imageData.title}
          </Typography>
        </Box>

        {/* Box z opisem */}
        <Box mb={2}>
          <Typography variant="body1" color="text.secondary">
            {imageData.description}
          </Typography>
        </Box>

        {/* Box z dostępnością */}
        <Box mb={1}>
          <Typography variant="body1" fontWeight="bold" color="text.primary">
            Dostępność: {imageData.availability}
          </Typography>
        </Box>

        {/* Box z ceną */}
        <Box mb={3}>
          <Typography variant="h6" color="text.primary">
            Cena: {imageData.price}
          </Typography>
        </Box>

        {/* Box z wyborem ilości */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          mb={3}
          gap={2}
        >
          <Typography variant="body1" fontWeight="bold">
            Ilość:
          </Typography>
          <IconButton
            color="primary"
            onClick={handleDecrease}
            disabled={quantity <= 1}
          >
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1">{quantity}</Typography>
          <IconButton color="primary" onClick={handleIncrease}>
            <AddIcon />
          </IconButton>
        </Box>

        {/* Przycisk Dodaj do koszyka */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => alert(`Dodano ${quantity} sztuk do koszyka!`)}
          >
            Dodaj do koszyka
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default PreviewImage;
