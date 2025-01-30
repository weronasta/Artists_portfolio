import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ArtistForm from "../components/ArtistForm";

function EditProfile() {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/artists/${id}`);
        setArtist(response.data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
      
    };

    fetchArtist();
  }, [id]);

  

  const handleEditArtist = async ({ username, bio, selectedImage }) => {
    const formData = new FormData();
    console.log("selectedImage", selectedImage);
    console.log("username", username);
    console.log("bio", bio);
    console.log("id", id);
    formData.append("image", selectedImage);
    formData.append("username", username);
    formData.append("bio", bio);

    

    

    try {
      const response = await axios.put(`http://127.0.0.1:5000/update_artist/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Zmiany zapisane!");
    } catch (error) {
      alert("Błąd podczas zapisywania zmian.");
    }
  };

  return artist ? (
    <ArtistForm artist={artist} onSubmit={handleEditArtist} />
    
  ) : (
    <p>Ładowanie...</p>
  );
}

export default EditProfile;
