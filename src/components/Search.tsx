import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  handleSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  return (
    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 w-full max-w-md bg-white shadow">
      <FiSearch className="text-gray-500 text-xl" />
      <input
        type="text"
        placeholder="Cari Surah..."
        onChange={(e) => handleSearch(e.target.value)}
        className="flex-1 outline-none text-gray-700"
      />
    </div>
  );
};

export default SearchBar;