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


export type GoogleSearchResponse = {
  kind: string;
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
};
