import { TextField, Typography, Button, Snackbar, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
    variant: "filled", // Corrected typo here
  });

  function handleSignup() {
    function callback2(data) {
      localStorage.setItem("token", "Bearer " + data.token);
      console.log("Data received from server:", data);
      setAlert({
        open: true,
        message: "Signup successful!",
        severity: "success",
        variant: "filled",
      });
    }

    function callback1(res) {
      console.log("Response status:", res.status);
      if (res.ok) {
        res
          .json()
          .then(callback2)
          .catch((err) => {
            console.error("Error parsing JSON:", err);
            setAlert({
              open: true,
              message: "Error parsing response.",
              severity: "error",
              variant: "filled",
            });
          });
      } else {
        res
          .json()
          .then((data) => {
            setAlert({
              open: true,
              message: data.message || "Signup failed!",
              severity: "error",
              variant: "filled",
            });
          })
          .catch((err) => {
            console.error("Error parsing JSON:", err);
            setAlert({
              open: true,
              message: "Error parsing response.",
              severity: "error",
              variant: "filled",
            });
          });
      }
    }

    fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
          severity: "error",
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
        <Typography variant={"h7"}>Welcome 👋 Sign up here</Typography>
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
            <Button variant={"contained"} onClick={handleSignup}>
              Sign up
            </Button>
          </div>
        </Card>
      </div>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positioning the Snackbar at the top
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant={alert.variant} // Pass variant to Alert component
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
