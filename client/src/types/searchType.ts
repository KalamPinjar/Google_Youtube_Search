// Define the pagemap structure as per Google Custom Search API
type Pagemap = {
  cse_thumbnail?: { src: string; width: string; height: string }[];
  cse_image?: { src: string }[];
};

// Extend the GoogleSearchResult type to include pagemap

// Types for Google Custom Search API Response
export type GoogleSearchResult = {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap?: Pagemap; // Optional field
};

export type SearchResponse =
  | GoogleSearchResponse
  | YoutubeSearchResponse
  | GoogleScholarApiResponse;
  
export interface GoogleSearchResponse {
  kind: "customsearch#search"; // Discriminant field
  url: {
    type: string;
    template: string;
  };
  queries: {
    request: {
      title: string;
      totalResults: string;
      searchTerms: string;
      count: number;
      startIndex: number;
    }[];
  };
  context: {
    title: string;
  };
  searchInformation: {
    searchTime: number;
    formattedSearchTime: string;
    totalResults: string;
    formattedTotalResults: string;
  };
  items: GoogleSearchResult[];
}

export interface YoutubeSearchResponse {
  kind: "youtube#searchListResponse"; // Discriminant field
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: VideoItem[];
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface VideoId {
  kind: string;
  videoId: string;
}

export interface VideoItem {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: Snippet;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

// Define the type for metadata of the search
interface SearchMetadata {
  id: string;
  status: string;
  json_endpoint: string;
  created_at: string;
  processed_at: string;
  google_scholar_url: string;
  raw_html_file: string;
  total_time_taken: number;
}

// Define the type for search parameters
interface SearchParameters {
  engine: string;
  q: string;
  hl: string;
}

// Define the type for publication information
interface PublicationInfo {
  summary: string;
}

// Define the type for resources
interface Resource {
  title: string;
  file_format: string;
  link: string;
}

// Define the type for inline links
interface InlineLinks {
  serpapi_cite_link: string;
  html_version?: string;
  cited_by?: {
    total: number;
    link: string;
    cites_id: string;
    serpapi_scholar_link: string;
  };
  related_pages_link?: string;
  serpapi_related_pages_link?: string;
  versions?: {
    total: number;
    link: string;
    cluster_id: string;
    serpapi_scholar_link: string;
  };
}

// Define the type for an organic result
interface OrganicResult {
  position: number;
  title: string;
  result_id: string;
  link: string;
  snippet: string;
  publication_info: PublicationInfo;
  resources?: Resource[];
  inline_links?: InlineLinks;
}

// Define the type for search information
interface SearchInformation {
  organic_results_state: string;
  total_results: number;
  time_taken_displayed: number;
  query_displayed: string;
}

// Define the type for the Google Scholar API response
export interface GoogleScholarApiResponse {
  kind: "scholar#searchResult";
  search_metadata: SearchMetadata;
  search_parameters: SearchParameters;
  search_information: SearchInformation;
  organic_results: OrganicResult[]; // This is defined correctly here
}