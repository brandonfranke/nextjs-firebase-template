"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthSignOut } from "@/hooks/firebase/auth";
import { auth, useUserClientSession } from "@/lib/firebase/client-app";
import { User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserAvatarMenu({
  initialUser,
}: {
  initialUser: User | null;
}) {
  const user = useUserClientSession(initialUser);

  const { mutateAsync: signOut } = useAuthSignOut(auth);

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    await fetch(`/__/auth/waitforsw/`);
    router.refresh();
  };

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Avatar>
                <AvatarImage
                  src={user.photoURL ?? undefined}
                  alt="profile image"
                />
                <AvatarFallback>
                  {user.displayName
                    ? user.displayName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                    : "User"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSignOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild>
          <Link href="/signin">Log In</Link>
        </Button>
      )}
    </>
  );
}
