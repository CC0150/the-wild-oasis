import { SortProps } from "@/components/sort/types";
import Select from "../select/Select";
import { useSetSearchParams } from "@/hooks/useSetsearchParams";

const Sort: React.FC<SortProps> = ({ options }) => {
  const { handleSearchParams, searchParams } = useSetSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSearchParams("sort", e.target.value);
  };

  const sortBy = searchParams.get("sort") || options[0].value;

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
};

export default Sort;
