import { useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import StoreTest from "./StoreTest";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileResult = event.target.files ? event.target.files[0] : null;
    console.log(fileResult);
    if (fileResult) {
      setFile(fileResult);
      setFileName(fileResult.name); // Itt tároljuk el a fájl nevét
    }
  };

  return (
    <>
      <div className="main">
        <div className="leftPanel">
          <div className="contentSelectText">Select content</div>
          <div className="subText">Add a file to upload on SWARM!</div>
          <div className="fileUploader">
            <input
              accept="image/*"
              type="file"
              id="contained-button-file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div className="tooltip">i</div>
            <label
              htmlFor="contained-button-file"
              style={{
                marginLeft: "10px",
                width: "100%",
                position: "relative",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                component="div"
                style={{
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
                }}
              >
                {fileName ? fileName : "Path and filename"}
              </Button>
            </label>
          </div>
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

      <StoreTest />
    </>
  );
}

export default App;
