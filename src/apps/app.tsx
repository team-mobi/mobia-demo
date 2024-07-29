import { Global, ThemeProvider } from "@emotion/react";
import global from "./style/global";
import MultiProvider from "./providers/multi-provider";
import theme from "./style/theme";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import DialogProvider from "./providers/dialog-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
      },
    },
  });

  return (
    <>
      <Global styles={global} />
      <MultiProvider
        providers={[
          <QueryClientProvider client={queryClient} />,
          <ThemeProvider
            theme={theme}
            children={undefined}
            key="theme-provider"
          />,
          <DialogProvider />,
          <RouterProvider router={router} />,
        ]}
      />
    </>
  );
}

export default App;
