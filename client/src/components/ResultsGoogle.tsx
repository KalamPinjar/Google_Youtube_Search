import { Loader2, Search } from "lucide-react";
import { GoogleSearchResponse } from "@/types/searchType";

interface ResultsProps {
  input: string;
  fetchedData: GoogleSearchResponse | null;
  error: Error | null;
  isLoading: boolean;
}

function ResultsGoogle({ isLoading, fetchedData, error, input }: ResultsProps) {
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center opacity-50 mt-5 w-full">
        <p className="mt-4 text-3xl text-red-500">
          Error fetching data: {error.message}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (
    !input ||
    !fetchedData ||
    !fetchedData.items ||
    fetchedData.items.length === 0
  ) {
    return (
      <div className="flex flex-col justify-center items-center opacity-50 mt-5 w-full">
        <Search className="w-44 h-44" />
        <p className="mt-4 text-3xl">Start Researching...</p>
      </div>
    );
  }

  return (
    <div className="flex lg:flex-row flex-col justify-between items-start mt-4 px-4 w-full min-h-screen">
      <div className="flex-1 mb-5 max-w-3xl">
        {fetchedData.items.length > 0 && (
          <>
            <div className="flex flex-col mb-4 text-gray-500 text-sm">
              <span className="mr-2">
                About {fetchedData.searchInformation.formattedTotalResults}{" "}
                results ({fetchedData.searchInformation.formattedSearchTime}{" "}
                seconds)
              </span>
            </div>
            <ul>
              {fetchedData.items.map((item, index) => (
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
            </ul>
          </>
        )}
      </div>

      {/* Top Results section */}
      {fetchedData.items.length > 0 && (
        <div className="top-2 lg:flex flex-col border-gray-300 hidden ml-6 pl-4 border-l w-[430px]">
          <h3 className="mb-4 font-semibold text-lg">Top Results</h3>
          {fetchedData.items.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-start mb-4">
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
                {item.title.slice(0, 45).concat("...")}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultsGoogle;
