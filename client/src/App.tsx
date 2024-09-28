import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchBar from "./components/SearchBar";
import { SearchProviderComponent } from "./provider/search-provider";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProviderComponent>
        <div className="flex flex-col justify-start items-start w-full min-h-screen overflow-hidden">
          <SearchBar />
        </div>
      </SearchProviderComponent>
    </QueryClientProvider>
  );
}
