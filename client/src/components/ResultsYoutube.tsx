import { useState, useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Video } from "lucide-react";
import axios from "axios";
import { SearchResponse, VideoItem } from "@/types/searchType";

interface ResultsProps {
  input: string;
  fetchedData: SearchResponse | undefined;
}

export default function ResultsYoutube({ input, fetchedData }: ResultsProps) {
  const { ref, inView } = useInView({
    threshold: 0.5, 
  });

  const [order, setOrder] = useState("relevance");
  const [videoDuration, setVideoDuration] = useState("any");

  
  const fetchYoutubeData = async ({ pageParam = "" }) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_URL_YOUTUBE_SEARCH}?key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }&part=id,snippet&maxResults=20&q=${input}&type=video&pageToken=${pageParam}&order=${order}&videoDuration=${videoDuration}&relevanceLanguage=en`
    );
    return data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["youtubeResults", input, order, videoDuration],
    queryFn: fetchYoutubeData,
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? false,
    initialPageParam: "", 
    enabled: !!fetchedData,
    staleTime: 1000 * 60 * 5, 
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div className="p-4">

      <div className="flex justify-start items-start gap-4 mb-6">

        <ToggleGroup
          size={"sm"}
          type="single"
          value={order}
          onValueChange={setOrder}
        >
          <ToggleGroupItem value="viewCount" aria-label="Sort by view count">
            View Count
          </ToggleGroupItem>
          <ToggleGroupItem value="relevance" aria-label="Sort by relevance">
            Relevance
          </ToggleGroupItem>
          <ToggleGroupItem value="date" aria-label="Sort by date">
            Date
          </ToggleGroupItem>
          <ToggleGroupItem value="rating" aria-label="Sort by rating">
            Rating
          </ToggleGroupItem>
          <ToggleGroupItem value="date" aria-label="Sort by date">
            Date
          </ToggleGroupItem>
        </ToggleGroup>

        <ToggleGroup
          className="mr-6 ml-auto"
          size={"sm"}
          type="single"
          value={videoDuration}
          onValueChange={setVideoDuration}
        >
          <ToggleGroupItem value="any" aria-label="Any duration">
            Any
          </ToggleGroupItem>
          <ToggleGroupItem value="short" aria-label="Short videos">
            Short
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" aria-label="Medium videos">
            Medium
          </ToggleGroupItem>
          <ToggleGroupItem value="long" aria-label="Long videos">
            Long
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {data && data.pages && data.pages.length > 0 ? (
        <>
          <h2 className="mb-6 font-semibold text-2xl">YouTube Results: </h2>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.pages.map((page) =>
              page.items.map((video: VideoItem) => (
                <Card
                  key={video.id.videoId}
                  className="border-0 hover:shadow-xl transition-shadow duration-200"
                >
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardHeader className="p-0">
                      <img
                        src={video.snippet.thumbnails.high.url}
                        alt={video.snippet.title}
                        className="rounded-t-lg w-full h-48 object-cover"
                      />
                    </CardHeader>
                    <CardContent className="px-4 py-2">
                      <CardTitle className="mb-1 line-clamp-2 text-lg dark:text-white">
                        {video.snippet.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-sm dark:text-gray-400">
                        {video.snippet.channelTitle}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="px-4 py-2">
                      <p className="text-gray-500 text-sm">
                        {format(
                          new Date(video.snippet.publishedAt),
                          "yyyy-MM-dd"
                        )}
                      </p>
                    </CardFooter>
                  </a>
                </Card>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center opacity-50 w-screen">
          <Video className="w-44 h-44" />
          <p className="text-3xl">Start searching...</p>
        </div>
      )}
      {data &&
        data.pages.length > 0 && ( 
          <div ref={ref} className="flex justify-center items-center py-6">
            {isFetchingNextPage && (
              <Loader2 className="w-10 h-10 animate-spin" />
            )}
          </div>
        )}
    </div>
  );
}
