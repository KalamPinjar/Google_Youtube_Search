import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchBar from "./components/SearchBar";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-start items-start w-full min-h-screen overflow-hidden">
        <SearchBar />
      </div>
    </QueryClientProvider>
  );
}
