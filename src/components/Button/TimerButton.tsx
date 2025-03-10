import React, { useEffect } from "react";
import Button from ".";

type ButtonProps = {
  handleRemove: () => void;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const SpecialButton = ({ handleRemove, ...rest }: ButtonProps) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleRemove();
    }, 5 * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Button {...rest} />;
};

export default SpecialButton;
