import { useEffect, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ConfirmButton from "./components/ConfirmButton/ConfirmButton";
import NewKeywordsModal from "./components/NewKeywordsModal/NewKeywordsModal";
import Tag from "./components/Tag/Tag";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { loadStore } from "./utils/loader";
import { Store } from "./utils/tagStore";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [fileName, setFileName] = useState("");
  const [newKeywordsModalOpen, setNewKeywordsModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const s = await loadStore();
    setStore(s);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileResult = event.target.files ? event.target.files[0] : null;
    console.log(fileResult);
    if (fileResult) {
      setFile(fileResult);
      setFileName(fileResult.name); // Itt tároljuk el a fájl nevét
    }
  };

  const handleConfirmButton = () => {
    setNewKeywordsModalOpen(true);
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
                position: "relative",
                width: "70%",
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
        <div style={{ width: "100%" }}>
          <div className="indexingText">Indexing</div>
          <div className="subText" style={{ color: "#19002933" }}>
            Add keywords for indexing!
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              {tags.map((tag) => (
                <Tag key={tag} value={tag} />
              ))}
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
          <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
            <ConfirmButton
              value="Upload Contents"
              disabled={false}
              icon={FileUploadIcon}
              onClick={handleConfirmButton}
            ></ConfirmButton>
          </div>
        </div>
      </div>
      {newKeywordsModalOpen ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "#0000002e",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NewKeywordsModal
            setTags={setTags}
            setNewKeywordsModalOpen={setNewKeywordsModalOpen}
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
