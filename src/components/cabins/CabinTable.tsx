import Spinner from "@/ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "@/components/table/Table";

import { useGetCabins } from "./hooks/useGetCabins";
import Menus from "@/components/menus/Menus";
import { useSearchParams } from "react-router";
import Empty from "@/ui/Empty";

const CabinTable: React.FC = () => {
  const { cabins, isLoading, error } = useGetCabins();
  const [searchParams] = useSearchParams();

  if (!cabins?.length) {
    return <Empty resourceName="cabins"></Empty>;
  }

  // 筛选 cabins
  const filterValue = searchParams.get("discount") || "all";
  const filteredCabins =
    cabins?.filter((cabin) => {
      if (filterValue === "all") return true;
      else if (filterValue === "no-discount") return !cabin.discount;
      else if (filterValue === "with-discount") return cabin.discount;
    }) || [];

  // 排序 cabins
  const sortBy = searchParams.get("sort") || "name-asc";
  const [sortField, sortOrder] = sortBy.split("-");
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (sortOrder === "asc") return a[sortField] > b[sortField] ? 1 : -1;
    else return a[sortField] < b[sortField] ? 1 : -1;
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Menus>
      <Table columns="0.8fr 1.5fr 1.8fr 1.2fr 1.2fr 1fr">
        <Table.Header>
          <div>#</div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Action</div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
