import {
  TextField,
  Card,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [price, setPrice] = useState(0);
  const [imageUrl,setImageurl] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const handleAddCourse = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert({
        open: true,
        severity: "error",
        message: "No token found. Please log in again.",
      });
      return;
    }

    console.log("Retrieved token:", token); // Log the token to verify

    fetch("http://localhost:3000/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        published: published,
        price: price,
        imageUrl:imageUrl,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setAlert({
              open: true,
              severity: "success",
              message: "Course added successfully!",
            });
          });
        } else {
          res.json().then((data) => {
            setAlert({
              open: true,
              severity: "error",
              message: data.message || "Failed to add course.",
            });
          });
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setAlert({
          open: true,
          severity: "error",
          message: "Network error occurred.",
        });
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      <Card variant={"outlined"} style={{ width: 400, padding: 25 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          margin="normal"
        />
        <TextField
        fullWidth
        label="Image Link"
        value ={imageUrl}
        onChange={(e)=>setImageurl(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              color="primary"
            />
          }
          label="Published"
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
            onClick={handleAddCourse}
          >
            Add Course
          </Button>
        </div>
      </Card>
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddCourse;
