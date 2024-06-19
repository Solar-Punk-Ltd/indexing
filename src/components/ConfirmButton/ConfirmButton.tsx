import { useState } from "react";
import "./ConfirmButton.css";
import Button from "@mui/material/Button";
import { SvgIconProps } from "@mui/material/SvgIcon";

interface ConfirmButtonProps {
  value: string;
  disabled?: boolean;
  icon?: React.ElementType<SvgIconProps>;
  onClick?: () => void;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
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
          marginLeft: "20px",
          backgroundColor: disabled ? "#FF8E0033" : "#FF8E00",
          color: "#190029",
          clipPath: "polygon(92% 0%,100% 50%,100% 100%,0% 100%,0% 0%)",
        }}
        onClick={onClick}
      >
        {Icon ? <Icon /> : null}
        {value}
      </Button>
    </div>
  );
};

export default ConfirmButton;
