import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function HomePage() {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to the Homepage
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Proceed by clicking the links in the navbar
        </Typography>
      </Box>
    </Container>
  );
}

export default HomePage;

