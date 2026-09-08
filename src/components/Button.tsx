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
      className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-md px-4 py-2 transition-all duration-300 ${containerClass}`}
      onClick={onClick}
    >
      {leftIcon && <span className="relative inline-flex items-center">{leftIcon}</span>}
      <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
        {title}
      </span>
    </button>
  );
};

export default Button;
