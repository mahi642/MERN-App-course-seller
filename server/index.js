const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config();
const mongoUrl = process.env.MONGO_DB_URL;
const secret = process.env.JWT_SECRET;

const app = express();
app.use(cors())
app.use(express.json());
//schemas
const adminSchema = new mongoose.Schema({
  username: String,

  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  published: Boolean,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

// models

const Admin = mongoose.model("Admin", adminSchema);
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);

//auth using JWT

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        console.error("JWT verification failed:", err);
        return res.status(403).json({ message: "Forbidden" }); // 403 Forbidden
      }
      req.user = user;
      next();
    });
  } else {
    console.error("Authorization header missing");
    return res.status(401).json({ message: "Unauthorized" }); // 401 Unauthorized
  }
};

// connect mongoDB

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "courses",
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


// Admin Routes

// Admin signup
app.post("/admin/signup", async (req, res) => {
  const { username, password } = req.body;
  
  console.log(req.body);
  
  const admin = await Admin.findOne({ username });
  if (admin) {
    return res.status(400).send("Admin already exists");
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, secret, {
      expiresIn: "12h",
    });
    res.json({ message: "Admin created", token });
  }
});

//Admin Login
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  console.log(admin);
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, secret, {
      expiresIn: "12h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

//After Login 

app.get("/admin/me",authenticateJwt,(req,res)=>{
  
res.json({
  username:req.user.username
})
})

//Add course

app.post("/admin/courses", authenticateJwt, async (req, res) => {
  console.log(req.body);
  if (req.user.role !== "admin") {
    console.error("User role is not admin");
    return res.status(403).json({ message: "Forbidden" });
  }
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

//Edit Course

app.put("/admin/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "course updated succesfully" });
  } else {
    res.status(400).json({ message: "course not found" });
  }
});

//Delete course

app.delete("/admin/courses/:courseId",authenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const result = await Course.deleteOne({ _id: courseId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Course deleted successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


//Get Courses

app.get("/admin/courses/", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses }).status(200);
});

app.get("/admin/courses/:courseId", async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


//User Routes

// user SignUp

app.post("/users/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    res.status(401).json({ message: "Username  already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, secret, {
      expiresIn: "12h",
    });
    res.json({ message: "User created successfully", token });
  }
});

//User Login

app.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, secret, {
      expiresIn: "12h",
    });
    res.json({ message: "Login Successfull", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

// get Courses

app.get("/users/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

//Purchase Course

app.post("/users/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});
//See purchased courses

app.get("/users/purchasedCourses", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

//Listen to port 3000

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

module.exports = app;