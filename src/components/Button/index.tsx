import { StyledButton } from "./styled";

const Button = ({ children, ...rest }: any) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
