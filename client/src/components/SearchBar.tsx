import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ModeToggle } from "./mode-toggle";
import { useContext } from "react";
import { cn } from "@/lib/utils";
import {
  SearchProvider,
  SearchProviderState,
} from "@/provider/search-provider";
import { useQuery } from "@tanstack/react-query";
import { GoogleSearchResponse } from "@/types/searchType";
import { fetchSearchResults } from "@/query/fetchPageResult";
import Results from "./Results";

function SearchBar() {
  const {
    isGoogle,
    setIsGoogle,
    input,
    setInput,
    setCurrentPage,
    currentPage,
  } = useContext(SearchProvider) as SearchProviderState;

  const icon = isGoogle
    ? "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
    : "https://www.freeiconspng.com/thumbs/youtube-logo-png/hd-youtube-logo-png-transparent-background-20.png";

  const { data, error, isLoading, refetch } = useQuery<
    GoogleSearchResponse,
    Error
  >({
    queryKey: ["searchResults", input, currentPage],
    queryFn: () => fetchSearchResults({ pageNumber: currentPage, input }),
    enabled: false, // Only fetch if input is available
    staleTime: 1000 * 60 * 5, // Cached data is considered fresh for 5 minutes
  });
  // Handle keypress for "Enter"
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input) {
      setCurrentPage(1); // Reset to page 1 before search
      // Clear previous results
      // This will automatically trigger the search in Results component
    }
  };

  return (
    <>
      <div className="flex justify-center items-center border-gray-400 p-4 border-b w-full h-[150px]">
        <div className="relative flex justify-start items-center mt-4 w-full">
          <div>
            <img src={icon} className="left-14 absolute w-10 object-contain" />
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress} // Add keydown handler
              className="ml-[100px] rounded-full w-[500px]"
              type="text"
              placeholder={isGoogle ? "Google Search" : "Youtube Search"}
            />
            <Label htmlFor="search" className="top-0 left-[38%] absolute flex">
              <Search
                onClick={() => {
                  if (input) {
                    setCurrentPage(1); // Reset to page 1 before search
                    // Clear previous results
                    // This will automatically trigger the search in Results component
                    refetch();
                  }
                }}
                className="hover:bg-gray-100 p-3 border-r w-10 h-10 text-blue-500 cursor-pointer"
              />
              <X
                onClick={() => {
                  setInput("");
                  // Clear results when input is cleared
                }}
                className="hover:bg-gray-100 p-3 rounded-r w-10 h-10 text-gray-500 cursor-pointer"
              />
            </Label>
            <div className="flex justify-start items-center gap-2 mt-4 p-2 font-mono text-sm">
              <p className="tracking-tight">Select Type:</p>
              <span
                className={cn(
                  "cursor-pointer px-2 py-1 text-sm rounded text-gray-500",
                  {
                    "bg-gray-100": isGoogle,
                  }
                )}
                onClick={() => setIsGoogle(true)}
              >
                Google
              </span>
              <span
                className={cn(
                  "cursor-pointer px-2 py-1 text-sm rounded text-gray-500",
                  {
                    "bg-gray-100": !isGoogle,
                  }
                )}
                onClick={() => setIsGoogle(false)}
              >
                Youtube
              </span>
            </div>
          </div>
          <div className="right-10 absolute">
            <ModeToggle />
          </div>
        </div>
      </div>
      <Results data={data} error={error} isLoading={isLoading} />
    </>
  );
}

export default SearchBar;
