import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createAndEditCabin } from "@/services/apiCabins";

import toast from "react-hot-toast";

interface FormValues {
  name: string;
  maxCapacity: number;
  price: number;
  discount: number;
  description: string;
  image?: FileList | string;
}

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabinMutate, isPending: isCreating } = useMutation({
    mutationFn: ({ newCabinData }: { newCabinData: FormValues }) =>
      createAndEditCabin(newCabinData),
    onSuccess: () => {
      toast.success("Cabin created successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    isCreating,
    createCabinMutate,
  };
};
