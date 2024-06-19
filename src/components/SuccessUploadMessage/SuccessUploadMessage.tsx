import { useState } from "react";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material/SvgIcon";
import "./SuccessUploadMessage.css";
import TextField from "@mui/material/TextField";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import CancelButton from "../CancelButton/CancelButton";
import DoneIcon from "@mui/icons-material/Done";

interface SuccessUploadMessageProps {
  setSuccessUploadMessageOpen: (open: boolean) => void;
}

const SuccessUploadMessage: React.FC<SuccessUploadMessageProps> = ({
  setSuccessUploadMessageOpen,
}) => {
  const handleCool = () => {
    setSuccessUploadMessageOpen(false);
  };
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{
        width: "720px",
        height: "480px",
        backgroundColor: "#F8F8F8",
        paddingTop: "20px",
        paddingLeft: "20px",
        position: "relative",
      }}
    >
      <div className="keywordsSelectText">Message</div>
      <div className="keywordsSubText">
        Congratulation, your content has been landed on the <b>SWARM Planet!</b>
      </div>
      <div style={{ marginTop: "40px" }}>
        Since now, You can find it easily by us ;)
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: "20px",
          bottom: "20px",
        }}
      >
        <ConfirmButton value="Cool" icon={DoneIcon} onClick={handleCool} />
      </div>
    </div>
  );
};

export default SuccessUploadMessage;
