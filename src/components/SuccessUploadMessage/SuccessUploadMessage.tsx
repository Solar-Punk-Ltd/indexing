import "./SuccessUploadMessage.css";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../public/routes";
import Button from "@mui/material/Button";

interface SuccessUploadMessageProps {
  setSuccessUploadMessageOpen: (open: boolean) => void;
  setIsSearchScreenOpen: (open: boolean) => void;
}

const SuccessUploadMessage: React.FC<SuccessUploadMessageProps> = ({
  setSuccessUploadMessageOpen,
  setIsSearchScreenOpen,
}) => {
  const handleCool = () => {
    setSuccessUploadMessageOpen(false);
    setIsSearchScreenOpen(true);
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
        <Link to={ROUTES.SEARCH}>
          <ConfirmButton value="Cool" icon={DoneIcon} onClick={handleCool} />
        </Link>
      </div>
    </div>
  );
};

export default SuccessUploadMessage;
