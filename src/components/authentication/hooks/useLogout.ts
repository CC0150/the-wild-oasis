import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "@/services/apiAuth";

import toast from "react-hot-toast";

import { useNavigate } from "react-router";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutMutate, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries(); //退出登录后，清除用户信息
      toast.success("Logout successful");
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { logoutMutate, isLoggingOut };
};
