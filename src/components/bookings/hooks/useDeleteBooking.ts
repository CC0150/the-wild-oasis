import { useQueryClient, useMutation } from "@tanstack/react-query";

import { deleteBooking } from "@/services/apiBookings";

import toast from "react-hot-toast";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingMutate, isPending: isDeleting } = useMutation({
    mutationFn: (bookingId: number) => deleteBooking(bookingId),
    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => toast.error("Error deleting booking"),
  });

  return { deleteBookingMutate, isDeleting };
};
