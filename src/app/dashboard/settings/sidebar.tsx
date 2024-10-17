"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = useCallback((href: string) => pathname === href, [pathname]);

  return (
    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
      <Button
        asChild
        variant={"ghost"}
        className={cn("justify-start", {
          "bg-accent": isActive("/dashboard/settings/profile"),
        })}
      >
        <Link href="profile">Profile</Link>
      </Button>
      <Button
        asChild
        variant={"ghost"}
        className={cn("justify-start", {
          "bg-accent": isActive("/dashboard/settings/security"),
        })}
      >
        <Link href="security">Security</Link>
      </Button>
      <Button
        asChild
        variant={"ghost"}
        className={cn("justify-start", {
          "bg-accent": isActive("/dashboard/settings/notifications"),
        })}
      >
        <Link href="notifications">Notifications</Link>
      </Button>
    </nav>
  );
}
