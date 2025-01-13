import { Button } from "antd";
import { FC } from "react";
import type { ButtonProps } from "antd/es/button";

interface CustomButtonProps extends Omit<ButtonProps, 'children'> {
  title: string;
  className?: string;
}

const CustomButton: FC<CustomButtonProps> = ({ type, title, style, onClick, className, disabled = false }) => {
  return (
    <Button 
      type={type} 
      style={style} 
      onClick={onClick} 
      className={className} 
      disabled={disabled}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
