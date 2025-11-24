import { SortProps } from "../sort/types";

export interface SelectProps {
  options: SortProps["options"];
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
