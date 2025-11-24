import { subDays } from "date-fns";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "@/services/apiBookings";

export function useGetRecentBookings() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get("last")) || 7;

  // Get the date numDays ago in ISO format
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: bookings, isPending } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { bookings, isPending };
}
