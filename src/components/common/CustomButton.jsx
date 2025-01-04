import { Button } from "antd";
import React from "react";

const CustomButton = ({ type, title, style, onClick, className, disabled }) => {
  return (
    <Button type={type} style={style} onClick={onClick} className={className} disabled={disabled}>
      {title}
    </Button>
  );
};

export default CustomButton;
