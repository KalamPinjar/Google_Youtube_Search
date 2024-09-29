import { GoogleScholarApiResponse } from "@/types/searchType";
import { Book, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ResultsProps {
  input: string;
  fetchedData: GoogleScholarApiResponse | null;
  error: Error | null;
  isLoading: boolean;
}

export default function ResultsScholar({
  input,
  fetchedData,
  error,
  isLoading,
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

  if (
    !input ||
    !fetchedData ||
    !fetchedData.organic_results ||
    fetchedData.organic_results.length === 0
  ) {
    return (
      <div className="flex flex-col justify-center items-center opacity-50 mt-5 w-full">
        <Book className="w-44 h-44" />
        <p className="mt-4 text-3xl">Start Researching...</p>
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

  return (
    <div className="space-y-4 mt-5">
      {fetchedData.organic_results.map((result, index) => (
        <Card key={index} className="p-4">
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
