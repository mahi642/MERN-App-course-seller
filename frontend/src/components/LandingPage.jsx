import React from "react";
import { Typography, Grid, Button } from "@mui/material";

const LandingPage = () => {
  return (
    <Grid container style={styles.container}>
      <Grid item xs={12} md={6} style={styles.textContainer}>
        <Typography variant="h2" style={styles.typography}>
          Join With US
        </Typography>
        

        <Button variant="contained">SignIn</Button>
        <Button variant="contained">SignUp</Button>
      </Grid>
      <Grid item xs={12} md={6} style={styles.imageContainer}>
        <img style={styles.image} src="/6491439.jpg" alt="image" />
      </Grid>
    </Grid>
  );
};

const styles = {
  container: {
    height: "100vh",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  typography: {
    color: "#3f51b5",
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default LandingPage;
