import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function AddPic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [numberOf, setNumberOf] = useState("");

  // Obsługa upload obrazka
  const handleImageUpload = () => {
    alert("Dodano obrazek!");
  };

  // Obsługa publikowania
  const handlePublish = () => {
    alert("Opublikowano zdjęcie!");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: 4,
        gap: 4,
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Sekcja upload obrazka */}
      <Paper
        elevation={3}
        onClick={handleImageUpload}
        sx={{
          width: "40%",
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "1px solid",
          borderColor: "primary.main",
          "&:hover": {
            bgcolor: "primary.light",
            opacity: 0.8,
          },
        }}
      >
        <AddIcon sx={{ fontSize: 48, color: "primary.main" }} />
      </Paper>

      {/* Sekcja formularza */}
      <Box
        sx={{
          width: "55%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Pole na tytuł */}
        <TextField
          label="Tytuł"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        {/* Pole na opis */}
        <TextField
          label="Opis"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          inputProps={{
            maxLength: 1000,
          }}
          helperText={`${description.length}/1000 znaków`}
          fullWidth
        />

        {/* Pole na cenę */}
        <TextField
          label="Cena"
          variant="outlined"
          value={currentPrice}
          onChange={(e) => setCurrentPrice(e.target.value)}
          placeholder="#hashtag1 #hashtag2"
          fullWidth
        />

        {/* Pole na liczbę */}
        <TextField
          label="Dostępna ilość"
          variant="outlined"
          value={numberOf}
          onChange={(e) => setNumberOf(e.target.value)}
          placeholder="#hashtag1 #hashtag2"
          fullWidth
        />

        {/* Button opublikuj */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handlePublish}
          sx={{
            alignSelf: "flex-start",
          }}
        >
          Dodaj pracę
        </Button>
      </Box>
    </Box>
  );
}

export default AddPic;
