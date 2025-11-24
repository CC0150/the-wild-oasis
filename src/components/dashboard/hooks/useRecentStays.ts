import { useSearchParams } from "react-router";

import { subDays } from "date-fns";

import { useQuery } from "@tanstack/react-query";

import { getStaysAfterDate } from "@/services/apiBookings";

export function useGetRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = Number(searchParams.get("last")) || 7;

  // Get the date numDays ago in ISO format
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { data: stays, isPending } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { stays, confirmedStays, isPending, numDays };
}
