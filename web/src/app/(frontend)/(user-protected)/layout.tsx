'use client'
import NavBar from "@/components/nav/NavBar";
import LogoHeader from "@/components/common/LogoHeader";
import SearchBar from "@/components/common/SearchBar";
import { SearchProvider, useSearch } from "@/contexts/SearchContext";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="flex min-h-screen bg-[#F2F2F2]">
      <NavBar />
      <div className="ml-20 flex-1 flex flex-col">
        {/* Header with Logo and Search */}
        <div className="flex items-center h-[82px] pt-3 pr-6 pb-3 gap-2.5">
          <LogoHeader />
          <div className="flex-grow flex justify-center items-center">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function UserProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SearchProvider>
      <LayoutContent>{children}</LayoutContent>
    </SearchProvider>
  );
}
