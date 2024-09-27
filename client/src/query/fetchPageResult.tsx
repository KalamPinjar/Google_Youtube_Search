import { GoogleSearchResponse } from "@/types/searchType";
import axios, { AxiosResponse } from "axios";

export const fetchSearchResults = async ({
  pageNumber,
  input,
}: {
  pageNumber: number;
  input: string;
}): Promise<GoogleSearchResponse> => {
  const start = (pageNumber - 1) * 10; // Calculate starting index for pagination
  try {
    const response: AxiosResponse<GoogleSearchResponse> = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/googleSearch`,
      {
        q: input,
        start: start,
      }
    );
    console.log("Fetch Results Response:", response.data); // Log the response data
    return response.data; // This will now return the typed response
  } catch (error) {
    console.error("Error fetching results:", error); // Log any error
    throw error; // Re-throw the error for useMutation to handle
  }
};
