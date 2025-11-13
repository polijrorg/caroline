"use client";

import { useState } from "react";
import { useAdminUsers } from "@/hooks/use-admins";
import { UsersPageHeader } from "./components/UsersPageHeader";
import { UserSearchBar } from "./components/UserSearchBar";
import { UsersTable } from "./components/UsersTable";
import { Pagination } from "./components/Pagination";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";

function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [updating, setUpdating] = useState<string | null>(null);
  const itemsPerPage = 10;

  const { users, total, loading, error, updateUserRole } = useAdminUsers({
    search: searchTerm,
    page: currentPage,
    limit: itemsPerPage,
  });

  const totalPages = Math.ceil(total / itemsPerPage);

  const handleRoleChange = async (userId: string, newRole: "USER" | "ADMIN") => {
    try {
      setUpdating(userId);
      await updateUserRole(userId, { role: newRole });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar role");
    } finally {
      setUpdating(null);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="p-8">
      <UsersPageHeader />
      
      <UserSearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        totalResults={searchTerm ? total : undefined}
      />

      {loading ? (
        <LoadingState />
      ) : (
        <>
          <UsersTable
            users={users}
            searchTerm={searchTerm}
            updating={updating}
            onRoleChange={handleRoleChange}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            total={total}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}

export default UsersPage;

