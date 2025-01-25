import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const ArtistCard = ({ artist }) => {
  return (
    <Box textAlign="center" p={2}>
      <Avatar
        src={artist.avatar}
        alt={artist.name}
        sx={{ width: 240, height: 240, margin: "0 auto" }}
      />
      <Typography variant="body1" mt={1}>
        {artist.name}
      </Typography>
    </Box>
  );
};

export default ArtistCard;
