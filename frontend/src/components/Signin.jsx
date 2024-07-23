import { TextField, Typography, Button, Snackbar, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    variant: "filled",
    severity: "success", // Corrected spelling here
    message: "",
  });

  function handleSignin() {
    function callback2(data) {
      localStorage.setItem("token", "Bearer " + data.token);
      console.log("Data received from server:", data);
      setAlert({
        open: true,
        message: "Signin successful!",
        severity: "success",
        variant: "filled",
      });
    }

    function callback1(res) {
      res
        .json()
        .then(callback2)
        .catch((err) => {
          console.error(err);
          setAlert({
            open: true,
            message: "Error occurred",
            severity: "error", // Corrected spelling here
            variant: "filled",
          });
        });
    }

    fetch("http://localhost:3000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
      .then(callback1)
      .catch((err) => {
        console.error("Fetch error:", err);
        setAlert({
          open: true,
          message: "Network error occurred.",
          severity: "error", // Corrected spelling here
          variant: "filled",
        });
      });
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <Typography variant={"h7"}>Welcome Back 👋 Sign in here</Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          style={{
            width: 350,
            padding: 10,
          }}
        >
          <TextField
            variant="outlined"
            fullWidth={true}
            label="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            style={{ marginTop: "1rem" }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            variant="outlined"
            label="Password"
            fullWidth={true}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <Button variant={"contained"} onClick={handleSignin}>
              Sign In
            </Button>
          </div>
        </Card>
      </div>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Position at the top
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant={alert.variant}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signin;
