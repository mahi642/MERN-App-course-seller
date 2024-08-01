import "./App.css";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Navbar from "./components/Navbar.jsx";
import AddCourse from "./components/AddCourse.jsx";
import Courses from "./components/Courses.jsx"
import EditCourse from "./components/EditCourse.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";

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
          <Route path = "/editCourse/:courseId" element = {<EditCourse/>}/>
          <Route path = "/landing" element= {<LandingPage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
