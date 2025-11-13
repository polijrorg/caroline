"use client";

import { useState, useMemo } from "react";
import { useAdminUsers } from "@/hooks/use-admins";
import { AdminsPageHeader } from "./components/AdminsPageHeader";
import { SuperAdminsSection } from "./components/SuperAdminsSection";
import { AdminsSection } from "./components/AdminsSection";
import { LoadingState } from "../usuarios/components/LoadingState";
import { ErrorState } from "../usuarios/components/ErrorState";

function AdminsPage() {
  const { users, loading, error, updateUserRole } = useAdminUsers();
  const [updating, setUpdating] = useState<string | null>(null);

  const groupedUsers = useMemo(() => ({
    superAdmins: users.filter((u) => u.role === "SUPER_ADMIN"),
    admins: users.filter((u) => u.role === "ADMIN"),
  }), [users]);

  const handleRemoveAdmin = async (userId: string) => {
    try {
      setUpdating(userId);
      await updateUserRole(userId, { role: "USER" });
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao atualizar role");
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <LoadingState />
      </div>
    );
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div className="p-8">
      <AdminsPageHeader />
      <SuperAdminsSection superAdmins={groupedUsers.superAdmins} />
      <AdminsSection
        admins={groupedUsers.admins}
        updating={updating}
        onRemoveAdmin={handleRemoveAdmin}
      />
    </div>
  );
}

export default AdminsPage;
