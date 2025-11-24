import GlobalStyles from "./styles/GlobalStyles";
import router from "./router";
import { RouterProvider } from "react-router";
import queryClient from "./lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "10px",
        }}
        toastOptions={{
          style: {
            fontSize: "16px",
            padding: "12px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
          success: {
            duration: 3000,
            style: {
              border: "1px solid #4f46e5",
              borderRadius: "12px",
            },
            iconTheme: {
              primary: "#4f46e5",
              secondary: "#fff",
            },
          },
          error: {
            duration: 5000,
            style: {
              border: "1px solid #f43f5e",
              borderRadius: "12px",
              color: "#f43f5e",
            },
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#fff",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
