import { StyledFormRow, Label, Error } from "./style";
import { FormRowVerticalProps } from "./types";

const FormRowVertical: React.FC<FormRowVerticalProps> = ({
  label,
  error,
  children,
  name,
}) => {
  if (!children) return null;
  return (
    <StyledFormRow>
      {label && <Label htmlFor={name}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRowVertical;
