import { useContext } from "react";
import {
  SearchProvider,
  SearchProviderState,
} from "@/provider/search-provider";

import { CustomPagination } from "./pagination";
import { Loader2 } from "lucide-react";
import { GoogleSearchResponse } from "@/types/searchType";

interface ResultsProps {
  isLoading: boolean;
  data: GoogleSearchResponse | undefined;
  error: Error | null;
}
function Results({ isLoading, data, error }: ResultsProps) {
  const { currentPage, setCurrentPage } = useContext(
    SearchProvider
  ) as SearchProviderState;

  // Use useQuery for fetching search results with caching

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1) return;
    setCurrentPage(pageNumber); // Update current page
  };

  return (
    <div className="flex justify-between items-start mt-4 px-4 w-full min-h-screen">
      {isLoading && (
        <div className="flex justify-center items-center w-full h-screen">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}
      {error && <p>Error fetching search results: {error.message}</p>}

      {data && data.items ? (
        <ul className="mb-5 w-full max-w-3xl">
          <div className="flex flex-col mb-4 text-gray-500 text-sm">
            <span className="mr-2">
              About {data.searchInformation.formattedTotalResults} results (
              {data.searchInformation.formattedSearchTime} seconds)
            </span>
          </div>
          {data.items.map((item, index) => (
            <li
              key={index}
              className="border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 mb-8 p-4 border-b transition-colors duration-200"
            >
              <div className="text-gray-500 text-sm">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all"
                >
                  {item.displayLink}
                </a>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 text-xl hover:underline leading-tight"
              >
                {item.title}
              </a>
              <p className="mt-2 text-gray-700 text-sm">{item.snippet}</p>

              {item.pagemap?.cse_thumbnail && (
                <img
                  src={item.pagemap.cse_thumbnail[0].src}
                  alt={item.title}
                  className="mt-2 rounded-lg max-h-20"
                />
              )}
            </li>
          ))}
          <CustomPagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </ul>
      ) : null}

      {data && data.items.length > 0 && (
        <div className="top-2 sticky lg:flex flex-col border-gray-300 hidden ml-6 pl-4 border-l w-[430px]">
          <h3 className="mb-4 font-semibold text-lg">Top Results</h3>
          {data.items.slice(0, 5).map((item, index) => (
            <div key={index} className="mb-4">
              {item.pagemap?.cse_image && (
                <img
                  src={item.pagemap.cse_image[0].src}
                  alt="Icon"
                  className="inline-block mr-2 w-10 h-10"
                />
              )}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item.title.slice(0, 35).concat("...")}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Results;
