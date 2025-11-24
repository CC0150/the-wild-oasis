import Filter from "../filter/Filter";
import Sort from "../sort/Sort";
import TableOperations from "@/ui/TableOperations";

const CabinTableOperations: React.FC = () => {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <Sort
        options={[
          { value: "name-asc", label: "Sort by Name (A-Z)" },
          { value: "name-desc", label: "Sort by Name (Z-A)" },
          { value: "price-asc", label: "Sort by Price (Low-High)" },
          { value: "price-desc", label: "Sort by Price (High-Low)" },
          {
            value: "maxCapacity-asc",
            label: "Sort by Max Capacity (Low-High)",
          },
          {
            value: "maxCapacity-desc",
            label: "Sort by Max Capacity (High-Low)",
          },
          { value: "discount-asc", label: "Sort by Discount (Low-High)" },
          { value: "discount-desc", label: "Sort by Discount (High-Low)" },
        ]}
      />
    </TableOperations>
  );
};

export default CabinTableOperations;
