import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { isUserLoading } from "../store/selectors/isUserLoading";
import { userEmailState } from "../store/selectors/userEmail";

function Navbar() {
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  console.log(userEmail);
  
  if (userLoading) {
    return <div>Loadingggg</div>;
  }

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{
            marginLeft: 10,
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography variant={"h6"}>CourseSTORE</Typography>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/courses");
                }}
              >
                COURSES
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/addCourse");
                }}
              >
                ADD COURSE
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button
                variant={"contained"}
                onClick={() => {
                  localStorage.setItem("token", null);
                  setUser({
                    isLoading: false,
                    userEmail: null,
                  });
                }}
              >
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        zIndex: 1,
      }}
    >
      <div
        style={{
          marginLeft: 10,
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <Typography variant={"h6"}>CourseSTORE</Typography>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ marginRight: 10 }}>
          <Button
            onClick={() => {
              navigate("/signin");
            }}
          >
            SIGN IN
          </Button>
        </div>
        <div style={{ marginRight: 10 }}>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
          >
            SIGN UP
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
