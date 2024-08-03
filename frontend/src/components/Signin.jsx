import { TextField, Typography, Button, Snackbar, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { userState } from "../store/atoms/user";


function Signin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    variant: "filled",
    severity: "success",
    message: "",
  });
  const setUser = useSetRecoilState(userState);

  const navigate = useNavigate();

  function handleSignin() {
    function callback2(data) {
      console.log(data.username);
      
      localStorage.setItem("token",   data.token);
      setUser({
        isLoading: false,
        userEmail: data.username,
      });

      console.log("Data received from server:", data);
      setAlert({
        open: true,
        message: "Signin successful!",
        severity: "success",
        variant: "filled",
      });
      navigate("/landing");
    }

    function callback1(res) {
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
            console.error("Signin failed:", data);
            setAlert({
              open: true,
              message: data.message || "Invalid credentials",
              severity: "error",
              variant: "filled",
            });
          })
          .catch((err) => {
            console.error("Error handling response:", err);
            setAlert({
              open: true,
              message: "Signin failed.",
              severity: "error",
              variant: "filled",
            });
          });
      }
    }

    fetch("http://localhost:3000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "username":email,
        "password":password
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
