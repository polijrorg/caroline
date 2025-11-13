'use client'
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { Lock } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AdminLink({ item, pathname }: { item: any, pathname: string }) {
  const [mounted, setMounted] = useState(false)
  const { isSuperAdmin } = useUserRole();

  useEffect(() => {
    setMounted(true)
  }, [])

  const selected = mounted ? pathname === item.url : false
  const isDisabled = item.requireSuperAdmin && !isSuperAdmin;

  if (isDisabled) {
    return (
      <SidebarMenuItem className={cn("pr-7", item.marginTop && 'mt-2')}>
        <SidebarMenuButton 
          className={cn("pl-7 rounded-l-none cursor-not-allowed opacity-60")}
          disabled
        >
          <div className="flex gap-3 items-center">
            <item.icon />
            <span>{item.title}</span>
            <Lock size={14} className="ml-auto" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return ( 
    <SidebarMenuItem className={cn("pr-7", item.marginTop && 'mt-2', selected && "hover:text-pink-50")}>
      <SidebarMenuButton asChild className={cn("pl-7 rounded-l-none transition-colors hover:bg-pink-300", selected && "hover:text-pink-50")}>
        <Link 
          href={item.url} 
          className={("flex gap-3 " + (selected ? 'bg-pink-700 hover:bg-pink-700' : ''))}
        >
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
   );
}

export default AdminLink;