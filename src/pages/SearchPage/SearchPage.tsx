import "./SearchPage.css";
import ConfirmButton from "../../components/ConfirmButton/ConfirmButton";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TextField from "@mui/material/TextField";

function SearchPage() {
  return (
    <>
      <div className="main">
        <div className="leftPanel">
          <div className="contentSelectText">Find content</div>
          <div className="subText">
            Enter your keywords and enjoy the result!
          </div>
          <div className="fileUploader">
            <div className="tooltip">i</div>
            <TextField
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
            ></TextField>
          </div>
        </div>
        <div className="divider"></div>
        <div style={{ width: "100%" }}>
          <ConfirmButton
            value="Upload Contents"
            disabled={false}
            icon={FileUploadIcon}
          ></ConfirmButton>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
