import { useState } from "react";
import "./CancelButton.css";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface CancelButtonProps {
  value: string;
  disabled?: boolean;
  icon?: React.ElementType<SvgIconProps>;
  onClick?: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({
  value,
  disabled,
  icon: Icon,
  onClick,
}) => {
  return (
    <div>
      <Button
        sx={{
          width: "212px",
          height: "48px",
          backgroundColor: "white",
          color: "#190029",
        }}
        onClick={onClick}
      >
        {Icon ? <Icon /> : null}
        {value}
      </Button>
    </div>
  );
};

export default CancelButton;
