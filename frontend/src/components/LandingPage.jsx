import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../store/selectors/userEmail";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
  const userEmail = useRecoilValue(userEmailState)
  const navigate = useNavigate();

  return (
    <Grid container style={styles.container}>
      <Grid item xs={12} md={6} style={styles.textContainer}>
        <Typography variant="h2" style={styles.typography}>
          Join With Us
        </Typography>

        {!userEmail && (
          <div>
            <Button variant="contained" style={styles.button}
            onClick = {()=>{
              navigate("/signin")
            }}
            >
              Sign In
            </Button>
            <Button variant="contained" style={styles.button}
            onClick={()=>{
              navigate("/signup");
            }}
            >
              Sign Up
            </Button>
          </div>
        )}
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  typography: {
    color: "#3f51b5",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  },
  button: {
    margin: "10px",
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
