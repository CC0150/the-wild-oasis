import { StyledSelect } from "./style";
import { SelectProps } from "./types";
const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  ...rest
}) => {
  return (
    <StyledSelect value={value} {...rest} onChange={onChange}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
