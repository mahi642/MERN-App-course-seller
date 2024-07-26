import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  function callback2(data) {
    console.log(data);
    setUserEmail(data.username);
    setIsLoading(false);
  }

  function callback1(res) {
    if (!res.ok) {
      console.error("HTTP error, status = " + res.status);
      setIsLoading(false);
      return;
    }

    res
      .json()
      .then(callback2)
      .catch((error) => {
        console.error("Error parsing JSON:", error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(callback1)
      .catch((error) => {
        console.error("Fetch error:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Typography variant={"h5"}>CourseSTORE</Typography>
      </div>

      <div style={{ display: "flex" }}>
        {userEmail ? (
          <div style={{ marginRight: 10 }}>
            <LogoutIcon
              style={{ cursor: "pointer", fontSize: "2rem" }} // Custom size using CSS
              onClick={() => {
                localStorage.setItem("token", null);
                setUserEmail("");
                navigate("/signin");
              }}
            />
          </div>
        ) : (
          <>
            <div style={{ marginRight: 10 }}>
              <Button
                variant={"contained"}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </Button>
            </div>
            <div>
              <Button
                variant={"contained"}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Signin
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
