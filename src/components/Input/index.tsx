import React, { InputHTMLAttributes } from "react";
import { StyledInput } from './styled';

const Input = ({
  type,
  onChange,
  placeholder,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <StyledInput
      {...props}
      style={{ ...props.style, color: "rgb(0, 0, 0)" }}
      onChange={onChange}
      type={type || "text"}
      placeholder={placeholder}
    />
  );
};

export default Input;
