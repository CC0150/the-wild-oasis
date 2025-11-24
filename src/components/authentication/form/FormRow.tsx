import { StyledFormRow, Label, Error } from "@/components/cabins/style";
import { FieldErrors } from "react-hook-form";

interface FormRowProps {
  name?: string;
  label?: string;
  children: React.ReactNode;
  errors?: FieldErrors;
}

const FormRow: React.FC<FormRowProps> = ({ name, label, children, errors }) => {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={name}>{label}</Label>}
      {children}
      {errors?.[name as string] && (
        <Error>{errors[name as string]?.message as React.ReactNode}</Error>
      )}
    </StyledFormRow>
  );
};

export default FormRow;
