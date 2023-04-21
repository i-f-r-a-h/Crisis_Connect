// Importing the necessary components from Material-UI
import { Box } from "@mui/material";
import { styled } from "@mui/material";

// Defining a custom styled component named FlexBetween that extends from the Box component.
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

// Exporting the custom styled component for use in other modules.
export default FlexBetween;
