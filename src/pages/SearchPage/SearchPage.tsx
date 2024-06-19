import "./SearchPage.css";
import ConfirmButton from "../../components/ConfirmButton/ConfirmButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function SearchPage() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <div>
        <div className="contentSelectText">Find content</div>
        <div className="subText">Enter your keywords and enjoy the result!</div>
        <div
          style={{
            display: "flex",
            paddingLeft: "20px",
            marginTop: "40px",
            position: "relative",
          }}
          className="searchBar"
        >
          <div className="tooltip2">i</div>
          <TextField
            color="primary"
            component="div"
            sx={{
              marginLeft: "10px",
              textTransform: "none",
              backgroundColor: "white",
              color: "#19002933",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "32px",
              justifyContent: "left",
              width: "100%",
              height: "48px",
              boxShadow: "none",
              clipPath: "polygon(96% 0%,100% 50%,100% 100%,0% 100%,0% 0%)",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  border: "0px",
                },
              },
              "& .MuiInputBase-root": {
                "& fieldset": {
                  border: "0px",
                },
              },
            }}
          ></TextField>
          <div style={{ width: "100%", marginLeft: "20px" }}>
            <ConfirmButton
              value="Search"
              disabled={false}
              icon={SearchIcon}
              onClick={() => setIsClicked(true)}
            ></ConfirmButton>
          </div>
        </div>
        <div
          className="contentSelectText"
          style={{
            marginTop: "40px",
            color: isClicked ? "#190029" : "#19002933",
          }}
        >
          Results
        </div>
      </div>
    </>
  );
}

export default SearchPage;
