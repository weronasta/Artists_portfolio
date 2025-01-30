import React, { useEffect, useState } from "react";
import ArtworkForm from "../components/ArtworkForm";
import axios from "axios";
import { useParams } from "react-router-dom";

function EditArtwork() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/artworks/${id}`);
        setArtwork(response.data);
      } catch (error) {
        console.error("Error fetching artwork:", error);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleEditArtwork = async ({ title, description, currentPrice, numberOf, selectedImage }) => {
    const formData = new FormData();
    console.log("selectedImage", selectedImage);
    console.log("title", title);
    console.log("description", description);
    console.log("currentPrice", currentPrice);
    console.log("numberOf", numberOf);
    formData.append("image", selectedImage);
    formData.append("name", title);
    formData.append("description", description);
    formData.append("currentPrice", currentPrice);
    formData.append("numberOf", numberOf);

    try {
      const response = await axios.put(`http://127.0.0.1:5000/update_artwork/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Changes saved!");
    } catch (error) {
      alert("Error saving changes.");
    }
  };

  return artwork ? (
    <ArtworkForm artwork={artwork} onSubmit={handleEditArtwork} />
    
  ) : (
    <p>Loading...</p>
  );
}

export default EditArtwork;
