import React from "react";

interface ButtonProps {
  id?: string;
  title: string | React.ReactNode;
  leftIcon?: React.ReactNode;
  containerClass?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  id, 
  title, 
  leftIcon, 
  containerClass = "", 
  onClick 
}) => {
  return (
    <button
      id={id}
      className={`px-4 py-2 rounded-md ${containerClass}`}
      onClick={onClick}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {title}
    </button>
  );
};

export default Button;
