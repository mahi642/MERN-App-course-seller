import { TextField, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import { useState } from "react";


function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 40,
        }}
      >
        <Typography variant={"h7"}>Welcome Back👋 Sign in here</Typography>
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
            <Button variant={"contained"}>Sign up</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default Signin;
