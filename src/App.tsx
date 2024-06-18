import { useEffect, useState } from "react";
import "./App.css";
import { Store } from "./utils/tagStore";
import { IndexStore } from "./utils/indexStore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFile(file);
      setFileName(file.name); // Itt tároljuk el a fájl nevét
    }
  };

  return (
    <>
      <div className="main">
        <div className="leftPanel">
          <div className="contentSelectText">Select content</div>
          <div className="subText">Add a file to upload on SWARM!</div>
          <input
            accept="image/*"
            type="file"
            id="contained-button-file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="div"
              style={{
                backgroundColor: "white",
                color: "#19002933",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: "32px",
                justifyContent: "left",
                width: "569px",
                height: "48px",
                marginTop: "40px",
                marginLeft: "20px",
                boxShadow: "none",
              }}
            >
              Path and filename
            </Button>
          </label>
        </div>
        <div className="divider"></div>
        <div>
          <div className="indexingText">Indexing</div>
          <div className="subText" style={{ color: "#19002933" }}>
            Add keywords for indexing!
          </div>
          <Button
            style={{
              backgroundColor: "white",
              color: "#19002933",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "32px",
              justifyContent: "center",
              width: "72px",
              height: "48px",
              marginTop: "40px",
              marginLeft: "20px",
            }}
          >
            <AddIcon />
          </Button>
        </div>
      </div>
    </>
  );
}

export default App;
