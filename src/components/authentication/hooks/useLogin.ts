import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "@/services/apiAuth";
import { LoginProps } from "@/components/authentication/types";

import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: loginMutate, isPending: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }: LoginProps) => login({ email, password }),
    onSuccess: (data) => {
      // 1. 登录成功后，将用户信息存储在react-query的缓存中
      queryClient.setQueryData(["user"], data.user);
      toast.success("Login successful");
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Please check your email and password");
    },
  });

  return { loginMutate, isLoggingIn };
};
