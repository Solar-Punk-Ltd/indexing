import { useState } from "react";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material/SvgIcon";
import "./SuccessUploadMessage.css";
import TextField from "@mui/material/TextField";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import CancelButton from "../CancelButton/CancelButton";
import DoneIcon from "@mui/icons-material/Done";

interface SuccessUploadMessageProps {
  setTags: (tags: string[]) => void;
  setNewKeywordsModalOpen: (open: boolean) => void;
}

const SuccessUploadMessage: React.FC<SuccessUploadMessageProps> = ({
  setTags,
  setNewKeywordsModalOpen,
}) => {
  const [textFieldValue, setTextFieldValue] = useState<string>("");

  const handleTagSubmit = () => {
    const tagsFromTextField = textFieldValue.split(",");

    setTags([...tagsFromTextField]);
    setNewKeywordsModalOpen(false);
  };
  return (
    <div
      style={{
        width: "720px",
        height: "480px",
        backgroundColor: "#F8F8F8",
        paddingTop: "20px",
        paddingLeft: "20px",
        position: "relative",
      }}
    >
      <div className="keywordsSelectText">Keywords</div>
      <div className="keywordsSubText">
        You can add keywords separated by “,” character for indexing!
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{ marginTop: "40px", display: "flex" }}
          className="sp-textfield"
        >
          <div className="tooltip">i</div>
          <TextField
            placeholder="Added keywords"
            multiline
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
            sx={{
              marginLeft: "10px",
              textTransform: "none",
              backgroundColor: "white",
              color: "#19002933",
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "32px",
              justifyContent: "left",
              width: "650px",
              height: "148px",
              boxShadow: "none",
              clipPath: "polygon(96% 0%,100% 18%,100% 100%,0% 100%,0% 0%)",
              border: "0px",
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "20px",
          bottom: "20px",
        }}
      >
        <CancelButton value="Cancel" />
        <ConfirmButton value="Done" icon={DoneIcon} onClick={handleTagSubmit} />
      </div>
    </div>
  );
};

export default SuccessUploadMessage;
