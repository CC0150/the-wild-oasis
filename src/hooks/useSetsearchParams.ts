import { useSearchParams } from "react-router";

export function useSetSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearchParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };
  return { handleSearchParams, searchParams };
}
