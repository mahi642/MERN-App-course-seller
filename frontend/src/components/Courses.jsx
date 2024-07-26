
import { Typography, Card, CardContent, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const fallbackImageUrl = "https://via.placeholder.com/150"; // Placeholder image URL

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    function callback2(data) {
      console.log(data);
      setCourses(data.courses); // Assuming `data` is the full response and `data.courses` is the array
    }

    function callback1(res) {
      if (!res.ok) {
        if (res.status === 401) {
          // Unauthorized, redirect to login
          navigate("/signin");
        } else {
          console.error("HTTP error, status = " + res.status);
        }
        return;
      }
      res
        .json()
        .then(callback2)
        .catch((error) => {
          console.error("Error parsing JSON:", error);
        });
    }

    fetch("http://localhost:3000/admin/courses/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then(callback1)
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [navigate]);

  const handleDeleteClick = (courseId) => {
    fetch(`http://localhost:3000/admin/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // Remove the deleted course from the state
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseId)
        );
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  // Filter out courses with missing essential details
  const validCourses = courses.filter(
    (course) => course.title && course.description && course.imageUrl
  );

  return (
    <div style={{ padding: "1rem" }}>
      <Grid container spacing={2}>
        {validCourses.length > 0 ? (
          validCourses.map((course, index) => (
            <Grid item xs={6} sm={6} md={3} lg={3} xl={2} key={index}>
              <Card
                style={{
                  height: 300,
                  backgroundColor: "grey",
                }}
              >
                <CardContent>
                  <img
                    src={course.imageUrl || fallbackImageUrl}
                    alt={course.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "150px", // Adjust as needed
                      objectFit: "cover",
                    }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2">{course.description}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(course._id)}
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteClick(course._id)}
                  >
                    DELETE
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6">No courses available</Typography>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Courses;
