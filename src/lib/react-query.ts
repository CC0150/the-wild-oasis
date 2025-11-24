import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //数据过期时间，单位是ms，默认是0
      // staleTime: 1000 * 60 * 5,
    },
  },
});

export default queryClient;
