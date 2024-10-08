import { SearchResponse } from "@/types/searchType";
import axios, { AxiosResponse } from "axios";

export const fetchSearchResults = async ({
  pageNumber,
  input,
  isGoogle,
  isYoutube
}: {
  pageNumber: number;
  input: string;
  isGoogle: boolean;
  isYoutube?: boolean;
}): Promise<SearchResponse | null> => {
  const start = (pageNumber - 1) * 10; // For pagination
  let endpoint = isGoogle ? "googleSearch" : "youtubeSearch";

  if (!isGoogle && isYoutube) {
    endpoint = "youtubeSearch";
  } else if (!isGoogle && !isYoutube) {
    endpoint = "scholarSearch";
  }

  if (!input) {
    return null; // Do not fetch if there is no input
  }

  try {
    const response: AxiosResponse<SearchResponse> = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/${endpoint}`,
      {
        q: input,
        start: start,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching results:", error);
    throw error;
  }
};
