import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";


function ArtistForm({ artist, onSubmit }) {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const [isHovered, setIsHovered] = useState(false);
  
    // Zmienna do trzymania błędów w formularzu
    const [errors, setErrors] = useState({
      usernameError: false,
      bioError: false,
    });
  
    useEffect(() => {
      if (artist) {
        setUsername(artist.username);
        setBio(artist.bio);
        setCurrentImage(artist.avatarLink);
      }
    }, [artist]);
  
    const validateInputs = () => {
      let isValid = true;
      const newErrors = { ...errors };

        if (!username.trim()) {
            newErrors.usernameError = true;
            isValid = false;
            } else {
            newErrors.usernameError = false;
            }
        
        if (!bio.trim()) {
            newErrors.bioError = true;  
            isValid = false;
            } else {
            newErrors.bioError = false; 
            }
  
      setErrors(newErrors);
      return isValid;
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (!validateInputs()) {
        alert("Please fill in all required fields and correct errors");
        return;
      }
  
      onSubmit({
        username,
        bio,
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
                  src={require(`../assets/images/artists/${artist.avatarLink}`)}
                  alt="Current Avatar"
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
                <Typography>Drag and drop an image or choose from computer</Typography>
              </Box>
            </label>
          </Box>
        </Paper>
  
        <Box sx={{ width: "60%" }}>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            error={errors.usernameError}
            helperText={errors.usernameError ? "This input cannot be empty" : ""}
            sx={{ marginBottom: 2 }}
          />
  
          <TextField
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            error={errors.bioError}
            helperText={errors.bioError ? "This input cannot be empty" : ""}
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Save changes
          </Button>
        </Box>
      </Box>
    );
  } 

export default ArtistForm;