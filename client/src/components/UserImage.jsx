// Import React and the Box component from the Material-UI library
import React from "react";
import { Box } from "@mui/material";

// Define a functional component named UserImage that takes in two props: image and size
const UserImage = ({ image, size = "60px" }) => {
  // Render a Box component with the specified size
  return (
    <Box width={size} height={size}>
      {/* Render an image element with the specified image source, size, and style */}
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${image}`}
      />
    </Box>
  );
};

// Export the UserImage component as the default export
export default UserImage;
