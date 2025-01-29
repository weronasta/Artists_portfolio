import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import axios from "axios";

function AddPic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [numberOf, setNumberOf] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  // Stany błędów
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) setSelectedImage(file);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setSelectedImage(file);
  };

  const handleImageUpload = async () => {
    const token = localStorage.getItem("authToken");
      if (!token) {
        alert("Brak autoryzacji. Zaloguj się ponownie.");
        return;
      }
    
    if (!selectedImage) {
      alert("Proszę wybrać obrazek.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", title);
    formData.append("description", description);
    formData.append("currentPrice", currentPrice);
    formData.append("numberOf", numberOf);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
      const response = await axios.post("http://127.0.0.1:5000/add_artwork", formData,
        {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert(`Obrazek przesłany! Ścieżka: ${response.data.path}`);
    } catch (error) {
      alert("Błąd podczas przesyłania pliku.");
    }
  };

  // Walidacja pól formularza
  const validateInputs = () => {
    let isValid = true;

    // Walidacja tytułu
    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    } else {
      setTitleError(false);
    }

    // Walidacja opisu
    if (!description.trim()) {
      setDescriptionError(true);
      isValid = false;
    } else {
      setDescriptionError(false);
    }

    // Walidacja ceny (czy jest liczbą)
    if (!currentPrice || isNaN(currentPrice)) {
      setPriceError(true);
      isValid = false;
    } else {
      setPriceError(false);
    }

    // Walidacja ilości (czy jest liczbą całkowitą)
    if (!numberOf || !Number.isInteger(Number(numberOf))) {
      setQuantityError(true);
      isValid = false;
    } else {
      setQuantityError(false);
    }

    return isValid;
  };

  const handlePublish = () => {
    if (!validateInputs()) {
      alert('Proszę poprawić błędy w formularzu.');
      return;
    }

    handleImageUpload();
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
        sx={{
          width: "40%",
          height: "600px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          border: "1px solid",
          borderColor: "primary.main",
          backgroundColor: dragOver ? "primary.light" : "inherit",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        ) : (
          <>
            <input
              type="file"
              onChange={handleImageChange}
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
          </>
        )}
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
        <TextField
          label="Tytuł"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          error={titleError}
          helperText={titleError ? "To pole nie może być puste" : ""}
        />

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
          fullWidth
          error={descriptionError}
          helperText={descriptionError ? "To pole nie może być puste" : ""}
        />

        <TextField
          label="Cena"
          variant="outlined"
          value={currentPrice}
          onChange={(e) => setCurrentPrice(e.target.value)}
          fullWidth
          error={priceError}
          helperText={priceError ? "Cena musi być liczbą" : ""}
        />

        <TextField
          label="Dostępna liczba prac"
          variant="outlined"
          value={numberOf}
          onChange={(e) => setNumberOf(e.target.value)}
          fullWidth
          error={quantityError}
          helperText={quantityError ? "Liczba prac musi być liczbą całkowitą" : ""}
        />

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
