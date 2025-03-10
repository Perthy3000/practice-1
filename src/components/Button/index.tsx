import clsx from "clsx";
import React from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "cursor-pointer border border-gray-200 shadow px-4 py-2 bg-white transition-all duration-200 hover:bg-gray-50 active:bg-gray-100",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
