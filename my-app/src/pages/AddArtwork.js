import React from "react";
import ArtworkForm from "../components/ArtworkForm";
import axios from "axios";

function AddArtwork() {
  const handleAddArtwork = async ({ title, description, currentPrice, numberOf, selectedImage }) => {
    const formData = new FormData();
    formData.append("image", selectedImage);
    formData.append("name", title);
    formData.append("description", description);
    formData.append("currentPrice", currentPrice);
    formData.append("numberOf", numberOf);

    try {
      const response = await axios.post("http://127.0.0.1:5000/add_artwork", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`Artwork added!`);
    } catch (error) {
      alert("Error adding images.");
    }
  };

  return <ArtworkForm onSubmit={handleAddArtwork} />;
}

export default AddArtwork;
