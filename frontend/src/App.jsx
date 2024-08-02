import "./App.css";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import Navbar from "./components/Navbar.jsx";
import AddCourse from "./components/AddCourse.jsx";
import Courses from "./components/Courses.jsx";
import EditCourse from "./components/EditCourse.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import axios from "axios";
import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "./store/atoms/user.js";
import { useEffect } from "react";
import { userEmailState } from "./store/selectors/userEmail.js";

function App() {
  
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee",
      }}
    >
      <Router>
        <RecoilRoot>
          <Navbar />
          <InitUser />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/editCourse/:courseId" element={<EditCourse />} />
            <Route path="/landing" element={<LandingPage />} />
          </Routes>
        </RecoilRoot>
      </Router>
    </div>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const userEmail = useRecoilValue(userEmailState);
  useEffect(() => {
    const init = async () => {
      try {
        const res = await axios.get("http://localhost:3000/admin/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (res.data.username) {
          setUser({
            isLoading: false,
            userEmail: res.data.username,
          });
        } else {
          setUser({
            isLoading: false,
            userEmail: null,
          });
        }
      } catch (error) {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    };

    init();
  }, [setUser]);
  console.log(userEmail);
  

  return null;
}

export default App;
