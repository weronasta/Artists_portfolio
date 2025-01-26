import ArtworksGallery from '../components/ArtworksGallery';
import { Box} from "@mui/material";

function Gallery() {
  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      padding: 2,
    }}
  > 
   <ArtworksGallery/>
  </Box>
  );
}

export default Gallery;
