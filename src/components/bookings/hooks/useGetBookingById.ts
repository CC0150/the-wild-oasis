import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "@/services/apiBookings";
import { useParams } from "react-router";

export const useGetBookingById = () => {
  const { bookingId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => {
      if (!bookingId) {
        throw new Error("Booking id is required");
      }
      return getBookingById(Number(bookingId));
    },
    enabled: !!bookingId, // 只有当bookingId存在时才执行查询
    retry: false,
  });

  return {
    data,
    isLoading,
    error,
  };
};
