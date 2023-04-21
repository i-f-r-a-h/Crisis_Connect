// Import the Box and styled components from the Material-UI library
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Define a styled component named WidgetWrapper that extends the Box component
const WidgetWrapper = styled(Box)(({ theme }) => ({
  // Set the padding of the component
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  // Set the background color of the component using the theme palette
  backgroundColor: theme.palette.background.alt,
  // Set the border radius of the component
  borderRadius: "0.75rem",
}));

// Export the WidgetWrapper component as the default export
export default WidgetWrapper;
