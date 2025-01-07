import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

// Import images
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import img4 from '../assets/images/img4.jpg';
import img5 from '../assets/images/img5.jpg';
import img6 from '../assets/images/img6.jpg';
import img7 from '../assets/images/img7.jpg';
import img8 from '../assets/images/img8.jpg';
import img9 from '../assets/images/img9.jpg';
import img10 from '../assets/images/img10.jpg';
import img11 from '../assets/images/img11.jpg';
import img12 from '../assets/images/img12.jpg';

const itemData = [
  { img: img1, title: 'Artwork 1' },
  { img: img2, title: 'Artwork 2' },
  { img: img3, title: 'Artwork 3' },
  { img: img4, title: 'Artwork 4' },
  { img: img5, title: 'Artwork 5' },
  { img: img6, title: 'Artwork 6' },
  { img: img7, title: 'Artwork 7' },
  { img: img8, title: 'Artwork 8' },
  { img: img9, title: 'Artwork 9' },
  { img: img10, title: 'Artwork 10' },
  { img: img11, title: 'Artwork 11' },
  { img: img12, title: 'Artwork 12' },
];

function Gallery() {
  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default Gallery;
