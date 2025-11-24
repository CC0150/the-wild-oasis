import { signUp } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useSignUp = () => {
  // const queryClient = useQueryClient();
  const { mutate: signUpMutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Account successfully created!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    signUpMutate,
    isPending,
  };
};
