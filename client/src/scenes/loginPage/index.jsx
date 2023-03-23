import React from 'react'
import {Box, Typography, useTheme, useMediaQuery} from "@mui/material";
import Form from "./Form.jsx";
import Navigation from 'layout/navigation/index.jsx';
function LoginPage() {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
  <Box>
    <Navigation />
      <Form />
  
  </Box>
    
  )
}

export default LoginPage