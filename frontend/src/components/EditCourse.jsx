// EditCourse.js
import {
  TextField,
  Card,
  Button,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { courseState } from "../store/atoms/course";
import { courseTitle } from "../store/selectors/courseTitle";

const EditCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state.courseId;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageurl] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "",
  });

  const [course, setCourse] = useRecoilState(courseState);

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAlert({
          open: true,
          severity: "error",
          message: "No token found. Please log in again.",
        });
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/admin/courses/${courseId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCourse({
            courseTitle: data.title,
            coursePrice: data.price,
            courseDescription: data.description,
            coursePublished: data.published,
            courseImageUrl: data.imageUrl,
          });
          setTitle(data.title);
          setDescription(data.description);
          setPublished(data.published);
          setPrice(data.price);
          setImageurl(data.imageUrl);
        } else {
          setAlert({
            open: true,
            severity: "error",
            message: "Failed to fetch course data.",
          });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setAlert({
          open: true,
          severity: "error",
          message: "Network error occurred.",
        });
      }
    };

    fetchCourse();
  }, [courseId, setCourse]);

  const handleEditCourse = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert({
        open: true,
        severity: "error",
        message: "No token found. Please log in again.",
      });
      return;
    }

    fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        published: published,
        price: price,
        imageUrl: imageUrl,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setAlert({
              open: true,
              severity: "success",
              message: "Course updated successfully!",
            });
            navigate("/courses");
          });
        } else {
          res.json().then((data) => {
            setAlert({
              open: true,
              severity: "error",
              message: data.message || "Failed to update course.",
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
    <div>
      <GreyTopper />
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
            value={imageUrl}
            onChange={(e) => setImageurl(e.target.value)}
            margin="normal"
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
              onClick={handleEditCourse}
            >
              Edit Course
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
    </div>
  );
};

function GreyTopper() {
  const title = useRecoilValue(courseTitle);
  return (
    <div>
      <div
        style={{
          width: "90%",
          marginLeft: "5%",
          height: 100,
          backgroundColor: "grey",
        }}
      >
        <Typography
          variant={"h3"}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {title}
        </Typography>
      </div>
    </div>
  );
}

export default EditCourse;
