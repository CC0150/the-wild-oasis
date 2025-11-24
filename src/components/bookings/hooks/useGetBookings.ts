import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/services/apiBookings";
import { useSearchParams } from "react-router";
import { BookingQueryParams } from "@/components/bookings/types";
import { useQueryClient } from "@tanstack/react-query";
import { PAGE_SIZE } from "@/utils/constants";

export const useGetBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");

  //Filter
  const filter: BookingQueryParams["filter"] =
    filterValue === "all" || !filterValue
      ? null
      : {
          field: "status",
          value: filterValue,
        };

  //Sort
  const sortRaw = searchParams.get("sort") || "startDate-desc";
  const [sortField, sortOrder] = sortRaw.split("-");

  const sort: BookingQueryParams["sort"] | null = {
    sortField,
    sortOrder,
  };

  //Pagination
  const page = Number(searchParams.get("page")) || 1;

  //Query
  const {
    data: { data: bookings = [], count = 0 } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort, page], //当filter, sort, page变化时，会触发重新请求
    queryFn: () => getBookings({ filter, sort, page }),
  });

  //Pre-fetching
  const totalPages = Math.ceil((count as number) / PAGE_SIZE);
  if (page < totalPages) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });
  }

  return {
    bookings,
    isLoading,
    error,
    count,
  };
};
