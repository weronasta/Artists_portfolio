import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

function ArtworkForm({ artwork, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [numberOf, setNumberOf] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // Dodajemy stan dla podglądu obrazu
  const [currentImage, setCurrentImage] = useState(""); // Dodajemy stan dla podglądu obrazu
  const [isHovered, setIsHovered] = useState(false); // Dodajemy stan dla efektu hover
//   const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    console.log("artwork", artwork);
    if (artwork) {
      setTitle(artwork.name);
      setDescription(artwork.description);
      setCurrentPrice(artwork.currentPrice);
      setNumberOf(artwork.numberOf);
      setCurrentImage(artwork.imageLink); // Ustawiamy link do istniejącego obrazu
      // set selected image to the existing image using require
    //   setSelectedImage(require(`../assets/images/artworks/${artwork.imageLink}`));
      
    }
  }, [artwork]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        // const url = URL.createObjectURL(file);
        // setImageUrl(url);
        setSelectedImage(file);
        // setImagePreview(URL.createObjectURL(file)); // Ustawiamy podgląd nowego obrazu
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
        flexDirection: "row", // Obrazek po lewej stronie formularza
        gap: 4,
        maxWidth: 1000,
        margin: "0 auto",
        marginTop: 4, // Margines na górze formularza
      }}
      onSubmit={handleSubmit}
    >
      {/* Sekcja obrazu */}
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
          height: "500px", // Ustawiamy stałą wysokość obrazu
          maxHeight: "100%", // Wysokość dopasowana do wysokości formularza
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box sx={{ maxWidth: "600px", margin: "0 auto" }}>
  {/* Current Image Preview Container */}

  {/* File Upload Section */}
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
      transition: "all 0.3s ease-in-out",
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
      src={require(`../assets/images/artworks/${artwork.imageLink}`)} // Existing image preview
      alt="Current Artwork"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
      }}
    />
  </Box>
) : (
  <Typography></Typography>
)}

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

</Box>


        {/* Overlay z przyciskiem "Zmień zdjęcie" */}
        {imagePreview && isHovered && (
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 2,
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => document.getElementById("upload-image").click()}
            >
              Zmień zdjęcie
            </Button>
          </Box>
        )}
      </Paper>

      {/* Formularz */}
      <Box sx={{ width: "60%" }}>
        <TextField
          label="Tytuł"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }} // Dodanie marginesu dolnego
        />

        <TextField
          label="Opis"
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }} // Dodanie marginesu dolnego
        />

        <TextField
          label="Cena"
          variant="outlined"
          value={currentPrice}
          onChange={(e) => setCurrentPrice(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }} // Dodanie marginesu dolnego
        />

        <TextField
          label="Dostępna liczba prac"
          variant="outlined"
          value={numberOf}
          onChange={(e) => setNumberOf(e.target.value)}
          fullWidth
          sx={{ marginBottom: 2 }} // Dodanie marginesu dolnego
        />

        <Button type="submit" variant="contained" color="primary">
          Zapisz zmiany
        </Button>
      </Box>
    </Box>
  );
}

export default ArtworkForm;
