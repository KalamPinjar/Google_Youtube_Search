import Results from "./components/Results";
import SearchBar from "./components/SearchBar";

export default function App() {
  return (
    <div className="flex flex-col justify-center items-start w-full h-screen">
      <SearchBar />
      <Results/>
    </div>
  );
}
