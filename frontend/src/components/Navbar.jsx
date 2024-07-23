import Button from "@mui/material/Button";
import { useBeforeUnload, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

function Navbar(){
    const navigae  = useNavigate();

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
          <div style={{marginRight:10}}>
            <Button variant={"contained"} 
            onClick = {()=>{
                navigae("/signup")
            }}
            >Signup</Button>

          </div>
          <div>
            <Button variant={"contained"}
            onClick = {()=>{
                navigae("/signin")
            }}
            >Signin</Button>
          </div>
        </div>

      </div>
    );
}

export default Navbar;