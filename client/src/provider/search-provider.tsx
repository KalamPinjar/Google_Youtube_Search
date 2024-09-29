import { SearchResponse } from "@/types/searchType";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchStoreState {
  input: string;
  currentPage: number;
  activeTab: "google" | "youtube" | "scholar";
  isGoogle: boolean; // Add this line
  isYoutube: boolean; // Add this line
  searchResults: {
    google: SearchResponse | null;
    youtube: SearchResponse | null;
    scholar: SearchResponse | null;
  };
  setInput: (input: string) => void;
  setCurrentPage: (page: number) => void;
  setTab: (tab: "google" | "youtube" | "scholar") => void;
  setIsGoogle: (value: boolean) => void; // Add this line
  setIsYoutube: (value: boolean) => void; // Add this line
  setSearchResults: (results: SearchResponse) => void;
}

export const useSearchStore = create<SearchStoreState>()(
  persist(
    (set) => ({
      input: "",
      currentPage: 1,
      activeTab: "google",
      isGoogle: true, // Initialize the state
      isYoutube: false, // Initialize the state
      searchResults: {
        google: null,
        youtube: null,
        scholar: null,
      },
      setInput: (input: string) => set({ input }),
      setCurrentPage: (page: number) => set({ currentPage: page }),
      setTab: (tab: "google" | "youtube" | "scholar") => {
        set({
          activeTab: tab,
          input: "",
          currentPage: 1,
          isGoogle: tab === "google", // Update isGoogle based on the tab
          isYoutube: tab === "youtube", // Update isYoutube based on the tab
        });
      },
      setIsGoogle: (value: boolean) => set({ isGoogle: value, isYoutube: false }), // Set Google state
      setIsYoutube: (value: boolean) => set({ isYoutube: value, isGoogle: false }), // Set Youtube state
      setSearchResults: (results: SearchResponse) =>
        set((state: SearchStoreState) => ({
          searchResults: {
            ...state.searchResults,
            [state.activeTab]: results,
          },
        })),
    }),
    {
      name: "search-store", // name of the storage
    }
  )
);
