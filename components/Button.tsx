import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'white' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 border text-base font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "border-transparent text-white bg-primary hover:bg-red-700 focus:ring-red-500", // Red button
    secondary: "border-transparent text-white bg-secondary hover:bg-blue-900 focus:ring-blue-500", // Blue button
    white: "border-transparent text-secondary bg-white hover:bg-gray-50 focus:ring-white", // White button
    outline: "border-white text-white bg-transparent hover:bg-white/10 focus:ring-white", // Outline button for dark backgrounds
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};