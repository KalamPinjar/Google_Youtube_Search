import { createContext, useState } from "react";

export type SearchProviderState = {
  isGoogle: boolean;
  setIsGoogle: (prevState: boolean) => void;
  isYoutube: boolean;
  setIsYoutube: (prevState: boolean) => void;
  input: string;
  setInput: (prevState: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export const SearchProvider = createContext<SearchProviderState | null>(null);

export const SearchProviderComponent: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isGoogle, setIsGoogle] = useState<boolean>(true);
  const [isYoutube, setIsYoutube] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <SearchProvider.Provider
      value={{
        isGoogle,
        setIsGoogle,
        isYoutube,
        setIsYoutube,
        input,
        setInput,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </SearchProvider.Provider>
  );
};
