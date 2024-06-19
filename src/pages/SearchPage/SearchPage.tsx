import "./SearchPage.css";
import ConfirmButton from "../../components/ConfirmButton/ConfirmButton";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { IndexStore } from "../../utils/indexStore";
import { Bee } from "@ethersphere/bee-js";
import { useEffect, useState } from "react";
import { loadStore } from "../../utils/loader";
import { Trie } from "../../utils/index-trie";

function SearchPage() {
  const [isClicked, setIsClicked] = useState(false);
  const [text, setText] = useState<string>("");
  const [store, setStore] = useState<IndexStore | null>(null);
  const [bee, setBee] = useState<Bee | null>(null);

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

  const handleSearchButton = async () => {
    if (!store || !bee) {
      console.log("Store or bee is missing");
      return;
    }

    // Load trie from store
    const trieData = await store.get();
    const trie = new Trie();
    Object.assign(trie, trieData);
    Object.setPrototypeOf(trie, Trie.prototype);

    const tags = text
      .split(",")
      .map((tag) => tag.trim());

    const result = trie.query(tags);

    setIsClicked(true);
  }

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
            onChange={(e) => setText(e.target.value)}
            value={text}
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
              onClick={handleSearchButton}
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
          {}
        </div>
      </div>
    </>
  );
}

export default SearchPage;
