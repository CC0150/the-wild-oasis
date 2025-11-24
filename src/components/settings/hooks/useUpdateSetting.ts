import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "@/services/apiSettings";
import toast from "react-hot-toast";

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { mutate: updateSettingMutate, isPending: isUpdating } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return {
    isUpdating,
    updateSettingMutate,
  };
};
