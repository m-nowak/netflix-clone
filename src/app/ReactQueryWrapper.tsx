"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

const ReactQueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    {children}
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>
);

export default ReactQueryWrapper;
