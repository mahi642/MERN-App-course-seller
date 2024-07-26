import "./App.css";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Navbar from "./components/Navbar.jsx";
import AddCourse from "./components/AddCourse.jsx";
import Courses from "./components/Courses.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div style = {{
      width: "100vw",
            height: "100vh",
            backgroundColor: "#eeeeee"
    }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route path = "/courses" element ={<Courses/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
