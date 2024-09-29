import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ModeToggle } from "./mode-toggle";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSearchStore } from "@/provider/search-provider";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchResults } from "@/query/fetchPageResult";
import ResultsGoogle from "./ResultsGoogle";
import ResultsYoutube from "./ResultsYoutube";
import ResultsScholar from "./ResultsScholar";
import useDebounce from "@/hook/useDebounce";
import { CustomPagination } from "./pagination";
import { Separator } from "./ui/separator";
import {
  GoogleScholarApiResponse,
  GoogleSearchResponse,
  SearchResponse,
} from "@/types/searchType";

function SearchBar() {
  const {
    input,
    setInput,
    activeTab,
    setTab,
    currentPage,
    setCurrentPage,
    searchResults,
    setSearchResults,
  } = useSearchStore();

  // Debouncing the input for delayed API calls
  const debouncedInput = useDebounce({ value: input, delay: 1000 });

  // Adjust query options to prevent unnecessary requests
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["searchResults", debouncedInput, activeTab, currentPage],
    queryFn: () =>
      fetchSearchResults({
        pageNumber: currentPage,
        input: debouncedInput,
        isGoogle: activeTab === "google",
        isYoutube: activeTab === "youtube",
      }),
    enabled: !!debouncedInput && activeTab !== "youtube" && activeTab !== "scholar" , 
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      setSearchResults(data as SearchResponse);
    }

    if (error) {
      console.error("Error fetching search results:", error);
    }
  }, [data, error, activeTab, setSearchResults]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearchClick = () => {
    if (!input) return;
    if (input) {
      setCurrentPage(1);
      refetch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    refetch();
  };

  const handleTabChange = (tab: "google" | "youtube" | "scholar") => {
    setInput("");
    setTab(tab);
  };

  return (
    <>
      <div className="flex flex-col p-4 border-b w-full">
        <div className="relative flex items-center p-2 w-[400px] lg:w-[600px]">
          <img
            src={
              activeTab === "google"
                ? "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                : activeTab === "youtube"
                ? "https://www.freeiconspng.com/thumbs/youtube-logo-png/hd-youtube-logo-png-transparent-background-20.png"
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Scholar_logo.svg/2048px-Google_Scholar_logo.svg.png"
            }
            className="left-4 absolute w-10 object-contain"
          />
          <Input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 pl-12 border rounded-full w-full h-10"
            type="text"
            placeholder={`${
              activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
            } Search`}
          />
          <Label
            htmlFor="search"
            className="right-4 absolute flex items-center"
          >
            <Search
              onClick={handleSearchClick}
              className="hover:bg-gray-100 p-1 rounded-full w-8 h-8 text-blue-500 cursor-pointer"
            />
            <Separator
              orientation="vertical"
              className="bg-gray-300 ml-2 w-px h-6"
            />
            <X
              onClick={() => {
                setInput("");
                if (activeTab === "google") searchResults.google = null;
                else if (activeTab === "youtube") searchResults.youtube = null;
                else if (activeTab === "scholar") searchResults.scholar = null;
              }}
              className="hover:bg-gray-100 ml-2 p-1 rounded-full w-8 h-8 text-gray-500 cursor-pointer"
            />
          </Label>
        </div>

        <div className="flex justify-start items-center gap-2 mt-2 font-mono text-sm">
          <p className="tracking-tight">Select Type:</p>
          <span
            className={cn(
              "cursor-pointer px-2 py-1 text-sm rounded text-gray-500",
              { "bg-gray-100": activeTab === "google" }
            )}
            onClick={() => handleTabChange("google")}
          >
            Google
          </span>
          <span
            className={cn(
              "cursor-pointer px-2 py-1 text-sm rounded text-gray-500",
              { "bg-gray-100": activeTab === "youtube" }
            )}
            onClick={() => handleTabChange("youtube")}
          >
            Youtube
          </span>
          <span
            className={cn(
              "cursor-pointer px-2 py-1 text-sm rounded text-gray-500",
              { "bg-gray-100": activeTab === "scholar" }
            )}
            onClick={() => handleTabChange("scholar")}
          >
            Scholar
          </span>
        </div>

        <div className="top-[4.5rem] lg:top-4 right-4 absolute">
          <ModeToggle />
        </div>
      </div>

      {activeTab === "google" && searchResults.google && (
        <ResultsGoogle
          input={debouncedInput}
          fetchedData={searchResults.google as GoogleSearchResponse | null}
          error={error}
          isLoading={isLoading}
        />
      )}
      {activeTab === "youtube" && searchResults.youtube && (
        <ResultsYoutube
          input={debouncedInput}
          fetchedData={searchResults.youtube}
        />
      )}
      {activeTab === "scholar" && searchResults.scholar && (
        <ResultsScholar
          input={debouncedInput}
          fetchedData={searchResults.scholar as GoogleScholarApiResponse | null}
          error={error}
          isLoading={isLoading}
        />
      )}

      {searchResults[activeTab] && data && (
        <CustomPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default SearchBar;
