import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { updateBooking } from "@/services/apiBookings";
import { BreakfastParams } from "../types";

export const useCheckIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
    mutationFn: ({
      bookingId,
      breakfast,
    }: {
      bookingId: number;
      breakfast: BreakfastParams | object;
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in successfully`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      navigate("/");
    },
    onError: () => toast.error("Error checking in booking"),
  });

  return { checkIn, isCheckingIn };
};
