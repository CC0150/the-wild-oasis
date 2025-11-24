import { useQueryClient, useMutation } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { createAndEditCabin } from "@/services/apiCabins";

interface FormValues {
  name: string;
  maxCapacity: number;
  price: number;
  discount: number;
  description: string;
  image?: FileList | string;
}

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabinMutate, isPending: isEditing } = useMutation({
    mutationFn: ({
      newCabinData,
      id,
    }: {
      newCabinData: FormValues;
      id: number;
    }) => createAndEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    isEditing,
    editCabinMutate,
  };
};
