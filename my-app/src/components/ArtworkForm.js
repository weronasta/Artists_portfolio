import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

function ArtworkForm({ artwork, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [numberOf, setNumberOf] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // Zmienna do trzymania błędów w formularzu
  const [errors, setErrors] = useState({
    titleError: false,
    descriptionError: false,
    priceError: false,
    quantityError: false,
  });

  useEffect(() => {
    if (artwork) {
      setTitle(artwork.name);
      setDescription(artwork.description);
      setCurrentPrice(artwork.currentPrice);
      setNumberOf(artwork.numberOf);
      setCurrentImage(artwork.imageLink);
    }
  }, [artwork]);

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!title.trim()) {
      newErrors.titleError = true;
      isValid = false;
    } else {
      newErrors.titleError = false;
    }

    if (!description.trim()) {
      newErrors.descriptionError = true;
      isValid = false;
    } else {
      newErrors.descriptionError = false;
    }

    if (!currentPrice || isNaN(currentPrice)) {
      newErrors.priceError = true;
      isValid = false;
    } else {
      newErrors.priceError = false;
    }

    if (!numberOf || !Number.isInteger(Number(numberOf))) {
      newErrors.quantityError = true;
      isValid = false;
    } else {
      newErrors.quantityError = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      alert("Proszę poprawić błędy w formularzu.");
      return;
    }

    onSubmit({
      title,
      description,
      currentPrice,
      numberOf,
      selectedImage,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
        maxWidth: 1000,
        margin: "0 auto",
        marginTop: 4,
      }}
      onSubmit={handleSubmit}
    >
      <Paper
        elevation={3}
        sx={{
          width: "40%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "1px solid",
          borderColor: "primary.main",
          backgroundColor: "inherit",
          position: "relative",
          overflow: "hidden",
          height: "500px",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Preview"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : currentImage ? (
            <Box
              sx={{
                width: "100%",
                maxHeight: "400px",
                mb: 2,
                border: "1px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.2,
              }}
            >
              <img
                src={require(`../assets/images/artworks/${artwork.imageLink}`)}
                alt="Current Artwork"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ) : (
            <Typography></Typography>
          )}

          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedImage(file);
              }
            }}
            accept="image/*"
            style={{ display: "none" }}
            id="upload-image"
          />
          <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 1,
              }}
            >
              <CloudUploadOutlinedIcon sx={{ fontSize: 48, color: "primary.main" }} />
              <Typography>Przeciągnij i upuść obrazek lub kliknij</Typography>
            </Box>
          </label>
        </Box>
      </Paper>

      <Box sx={{ width: "60%" }}>
        <TextField
          label="Tytuł"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          error={errors.titleError}
          helperText={errors.titleError ? "To pole nie może być puste" : ""}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Opis"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          error={errors.descriptionError}
          helperText={errors.descriptionError ? "To pole nie może być puste" : ""}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Cena"
          variant="outlined"
          value={currentPrice}
          onChange={(e) => setCurrentPrice(e.target.value)}
          fullWidth
          error={errors.priceError}
          helperText={errors.priceError ? "Cena musi być liczbą" : ""}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          label="Dostępna liczba prac"
          variant="outlined"
          value={numberOf}
          onChange={(e) => setNumberOf(e.target.value)}
          fullWidth
          error={errors.quantityError}
          helperText={errors.quantityError ? "Liczba prac musi być liczbą całkowitą" : ""}
          sx={{ marginBottom: 2 }}
        />

        <Button type="submit" variant="contained" color="primary">
          Zapisz zmiany
        </Button>
      </Box>
    </Box>
  );
}

export default ArtworkForm;
