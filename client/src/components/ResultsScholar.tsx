import { GoogleScholarApiResponse } from "@/types/searchType";
import { Book } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ResultsProps {
  input: string;
  fetchedData: GoogleScholarApiResponse | undefined;
  error: Error | null;
}

export default function ResultsScholar({
  input,
  fetchedData,
  error,
}: ResultsProps) {
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center opacity-50 mt-5 w-full">
        <p className="mt-4 text-3xl text-red-500">
          Error fetching data: {error.message}
        </p>
      </div>
    );
  }

  if (!input) {
    return (
      <div className="flex flex-col justify-center items-center opacity-50 mt-5 w-full">
        <Book className="w-44 h-44" />
        <p className="mt-4 text-3xl">Start Researching...</p>
      </div>
    );
  }

  if (input && !fetchedData) {
    return (
      <div className="flex flex-col justify-center items-center opacity-50 mt-5 w-full">
        <Book className="w-44 h-44" />
        <p className="mt-4 text-3xl">No results found...</p>
      </div>
    );
  }

  if (fetchedData && fetchedData.organic_results) {
    return (
      <div className="space-y-4 mt-5 results-scholar">
        {fetchedData.organic_results.map((result, index) => (
          <Card key={index} className="p-4 scholar-result">
            <CardHeader>
              <CardTitle>
                <a href={result.link} className="text-blue-600">
                  {result.title || "No Title Available"}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{result.snippet || "No Snippet Available"}</p>
              <p className="text-muted text-sm">
                {result.publication_info?.summary || "No Summary Available"}
              </p>
              {result.inline_links?.cited_by && (
                <div className="mt-2">
                  <a
                    href={result.inline_links.cited_by.serpapi_scholar_link}
                    className="text-blue-600"
                  >
                    Cited by {result.inline_links.cited_by.total}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}
