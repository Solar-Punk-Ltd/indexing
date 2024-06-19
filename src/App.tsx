import { useEffect, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ConfirmButton from "./components/ConfirmButton/ConfirmButton";
import NewKeywordsModal from "./components/NewKeywordsModal/NewKeywordsModal";
import Tag from "./components/Tag/Tag";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { loadStore } from "./utils/loader";
import { Trie } from "./utils/index-trie"
import { Bee } from "@ethersphere/bee-js";
import { STAMP } from "./config";
import { IndexStore } from "./utils/indexStore";
import SuccessUploadMessage from "./components/SuccessUploadMessage/SuccessUploadMessage";


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [store, setStore] = useState<IndexStore | null>(null);
  const [bee, setBee] = useState<Bee | null>(null);
  const [fileName, setFileName] = useState("");
  const [newKeywordsModalOpen, setNewKeywordsModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isFileChoosed, setIsFileChoosed] = useState(false);
  const [successUploadMessageOpen, setSuccessUploadMessageOpen] =
    useState(false);
  const [isSearchScreenOpen, setIsSearchScreenOpen] = useState(false);

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const s = await loadStore();
    const tData = await s.get();
    const t = new Trie();
    Object.assign(t, tData);
    Object.setPrototypeOf(t, Trie.prototype);

    s.set(t);
    const b = new Bee("http://localhost:1633");
    setStore(s);
    setBee(b);
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileResult = event.target.files ? event.target.files[0] : null;
    console.log(fileResult);
    if (fileResult) {
      setIsFileChoosed(true);
      setFile(fileResult);
      setFileName(fileResult.name); // Itt tároljuk el a fájl nevét
    }
  };

  const handleConfirmButton = async () => {
    if (!store || !bee || !file || tags.length === 0) {
      console.log("Store, bee, file or tags are missing");
      return;
    }

    try {
      // Load trie from store
      const trieData = await store.get();
      const trie = new Trie();
      Object.assign(trie, trieData);
      Object.setPrototypeOf(trie, Trie.prototype);
  
      const uploadRes = await bee.uploadFile(STAMP, file, file.name);
  
      tags.forEach((tag) => {
        trie.insert(tag, uploadRes.reference);
      });

      const saveResult = await store.set(trie as object);
      console.log("Save result: ", saveResult);
      setSuccessUploadMessageOpen(true);
      
    } catch (error) {
      console.error(error);
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
          <div
            className="indexingText"
            style={{ color: isFileChoosed ? "#190029" : "#19002933" }}
          >
            Indexing
          </div>
          <div
            className="subText"
            style={{ color: isFileChoosed ? "#190029" : "#19002933" }}
          >
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
                color: isFileChoosed ? "#190029" : "#19002933",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: "32px",
                justifyContent: "center",
                width: "72px",
                height: "48px",
                marginTop: "40px",
                marginLeft: "20px",
              }}
              onClick={() => setNewKeywordsModalOpen(true)}
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
          onClick={() => setNewKeywordsModalOpen(false)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "#00000057",
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
      {successUploadMessageOpen ? (
        <div
          onClick={() => setSuccessUploadMessageOpen(false)}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundColor: "#00000057",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SuccessUploadMessage
            setSuccessUploadMessageOpen={setSuccessUploadMessageOpen}
            setIsSearchScreenOpen={setIsSearchScreenOpen}
          />
        </div>
      ) : null}
    </>
  );
}

export default App;
