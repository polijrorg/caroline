"use client";

import { Search } from "lucide-react";

interface UserSearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  totalResults?: number;
}

export function UserSearchBar({ searchTerm, onSearchChange, totalResults }: UserSearchBarProps) {
  return (
    <div className="mb-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar por nome ou email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        />
      </div>
      {searchTerm && totalResults !== undefined && (
        <p className="text-sm text-gray-600 mt-2">
          {totalResults} resultado{totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
