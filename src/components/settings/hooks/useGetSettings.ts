import { useQuery } from "@tanstack/react-query";

import { getSettings } from "@/services/apiSettings";

export const useGetSettings = () => {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });
  return { settings, isLoading, error };
};
