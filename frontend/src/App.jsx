import "./App.css";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Navbar from "./components/Navbar.jsx";
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
