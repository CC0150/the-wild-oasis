import { StyledFilter, FilterButton } from "./style";
import { FilterProps } from "./types";
import { useSetSearchParams } from "@/hooks/useSetsearchParams";

const Filter: React.FC<FilterProps> = ({ filterField, options }) => {
  const { value: defaultValue } = options[0];
  const { handleSearchParams, searchParams } = useSetSearchParams();
  const currentValue = searchParams.get(filterField) || defaultValue;

  const handleClick = (value: string) => {
    if (searchParams.get("page")) {
      searchParams.set("page", "1");
    }
    handleSearchParams(filterField, value);
  };

  return (
    <StyledFilter>
      {options.map(({ value, label }) => (
        <FilterButton
          key={value}
          $active={currentValue === value}
          onClick={() => handleClick(value)}
          disabled={value === currentValue}
        >
          {label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
