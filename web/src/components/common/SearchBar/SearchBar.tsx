'use client'
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchBar({ value, onChange, placeholder = "Pesquise módulos, aulas, ..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-2xl">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
      />
      <Search
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
}

export default SearchBar;
