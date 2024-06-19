import { useState } from "react";
import "./Tag.css";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material/SvgIcon";
import RemoveIcon from "@mui/icons-material/Remove";

interface TagProps {
  value: string;
  onClick?: () => void;
}

const Tag: React.FC<TagProps> = ({ value, onClick }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "48px",
        display: "flex",
        alignItems: "center",
        marginLeft: "20px",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
        }}
      >
        {value}
      </div>
      <div
        style={{ width: "2px", height: "28px", backgroundColor: "#19002933" }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
        }}
      >
        <RemoveIcon />
      </div>
    </div>
  );
};

export default Tag;
