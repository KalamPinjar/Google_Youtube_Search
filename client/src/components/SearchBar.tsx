import { Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ModeToggle } from "./mode-toggle";
import { useContext, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  SearchProvider,
  SearchProviderState,
} from "@/provider/search-provider";
import { useQuery } from "@tanstack/react-query";
import {
  GoogleScholarApiResponse,
  GoogleSearchResponse,
  SearchResponse,
  YoutubeSearchResponse,
} from "@/types/searchType";
import { fetchSearchResults } from "@/query/fetchPageResult";
import ResultsGoogle from "./ResultsGoogle";
import ResultsYoutube from "./ResultsYoutube";
import ResultsScholar from "./ResultsScholar";
import useDebounce from "@/hook/useDebounce";
import { CustomPagination } from "./pagination";
import { Separator } from "./ui/separator";

function SearchBar() {
  const {
    isGoogle,
    setIsGoogle,
    isYoutube,
    setIsYoutube,
    input,
    setInput,
    setCurrentPage,
    currentPage,
  } = useContext(SearchProvider) as SearchProviderState;

  const debouncedInput = useDebounce({ value: input, delay: 800 });
  const [fetchedData, setFetchedData] = useState<SearchResponse | undefined>(
    undefined
  );

  const { data, error, isLoading, refetch } = useQuery<SearchResponse, Error>({
    queryKey: ["searchResults", debouncedInput, currentPage],
    queryFn: () =>
      fetchSearchResults({
        pageNumber: currentPage,
        input: debouncedInput,
        isGoogle,
        isYoutube,
      }),
    enabled: !!debouncedInput, // Only fetch if there is input
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data) {
      setFetchedData(data);
    }

    if (error) {
      console.error("Error fetching search results:", error);
    }
  }, [data, error]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSearchClick = () => {
    if (input) {
      setCurrentPage(1);
      refetch(); // Trigger search on button click
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    refetch(); // Refetch results on page change
  };

  return (
    <>
      <div className="flex flex-col p-4 border-b w-full">
        <div className="relative flex items-center p-2 w-[400px]">
          <img
            src={
              isGoogle
                ? "https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                : isYoutube
                ? "https://www.freeiconspng.com/thumbs/youtube-logo-png/hd-youtube-logo-png-transparent-background-20.png"
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Scholar_logo.svg/2048px-Google_Scholar_logo.svg.png"
            }
            className="left-4 absolute w-10 object-contain"
          />
          <Input
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 pl-12 border rounded-full w-[400px] h-10"
            type="text"
            placeholder={
              isGoogle
                ? "Google Search"
                : isYoutube
                ? "Youtube Search"
                : "Scholar Search"
            }
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
                setFetchedData(undefined);
              }}
              className="hover:bg-gray-100 ml-2 p-1 rounded-full w-8 h-8 text-gray-500 cursor-pointer"
            />
          </Label>
        </div>

        {/* Select Type Section */}
        <div className="flex justify-start items-center gap-2 mt-2 font-mono text-sm">
          <p className="tracking-tight">Select Type:</p>
          <span
            className={cn(
              "cursor-pointer px-2 py-1 text-sm rounded text-gray-500",
              { "bg-gray-100": isGoogle }
            )}
            onClick={() => {
              setIsGoogle(true);
              setIsYoutube(false);
              refetch(); // Refetch to update the results for Google
            }}
          >
            Google
          </span>
          <span
            className={cn(
              "cursor-pointer px-2 py-1 text-sm rounded text-gray-500",
              { "bg-gray-100": isYoutube }
            )}
            onClick={() => {
              setIsGoogle(false);
              setIsYoutube(true);
              refetch(); // Refetch to update the results for YouTube
            }}
          >
            Youtube
          </span>
          <span
            className={cn(
              "cursor-pointer px-2 py-1 text-sm rounded text-gray-500",
              { "bg-gray-100": !isGoogle && !isYoutube }
            )}
            onClick={() => {
              setIsGoogle(false);
              setIsYoutube(false);
              refetch(); // Refetch to update the results for Scholar
            }}
          >
            Scholar
          </span>
        </div>

        <div className="top-[4.5rem] lg:top-4 right-4 absolute">
          <ModeToggle />
        </div>
      </div>

      {isGoogle && !isYoutube ? (
        <ResultsGoogle
          data={fetchedData as GoogleSearchResponse}
          error={error}
          isLoading={isLoading}
        />
      ) : isYoutube && !isGoogle ? (
        <ResultsYoutube
          input={input}
          fetchedData={fetchedData as YoutubeSearchResponse}
        />
      ) : (
        !isGoogle &&
        !isYoutube && (
          <ResultsScholar
            input={input}
            fetchedData={fetchedData as GoogleScholarApiResponse}
            error={error}
          />
        )
      )}
      {(fetchedData &&
        (fetchedData as GoogleScholarApiResponse).organic_results?.length >
          0) ||
      (isGoogle && fetchedData) ? (
        <CustomPagination
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : null}
    </>
  );
}

export default SearchBar;
