import ArtworksGallery from '../components/ArtworksGallery';
import {Container} from "@mui/material";

function Gallery() {
  return (
    <Container>
   <ArtworksGallery cardType={"cart"}/>
    </Container>
  );
}

export default Gallery;
