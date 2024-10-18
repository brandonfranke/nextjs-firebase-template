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
import { useResponsive } from "ahooks";
import { User } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Command,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { User2 } from "lucide-react";

export default function UserAvatarMenu({
  initialUser,
}: {
  initialUser: User | null;
}) {
  const user = useUserClientSession(initialUser);

  const { mutateAsync: signOut } = useAuthSignOut(auth);

  const router = useRouter();

  const isDesktop = useResponsive()?.lg ?? true;

  const handleSignOut = async () => {
    await signOut();
    await fetch(`/__/auth/waitforsw/`);
    router.refresh();
  };

  if (user) {
    return (
      <>
        {isDesktop ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user.photoURL ?? undefined}
                  alt="profile image"
                />
                <AvatarFallback>
                  {user.displayName ? (
                    user.displayName
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                  ) : (
                    <User2 />
                  )}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings/profile">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleSignOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Drawer>
            <DrawerTrigger asChild>
              <Button size={"icon"} variant={"ghost"}>
                <Avatar>
                  <AvatarImage
                    src={user.photoURL ?? undefined}
                    alt="profile image"
                  />
                  <AvatarFallback>
                    {user.displayName ? (
                      user.displayName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                    ) : (
                      <User2 />
                    )}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Account</DrawerTitle>
                <DrawerDescription>
                  Take action on your account
                </DrawerDescription>
              </DrawerHeader>
              <Command>
                <CommandList className="py-6">
                  <CommandItem asChild>
                    <Link href="/dashboard/settings/profile">Settings</Link>
                  </CommandItem>

                  <CommandItem>Support</CommandItem>
                  <CommandSeparator />
                  <CommandItem onClick={() => handleSignOut()}>
                    Logout
                  </CommandItem>
                </CommandList>
              </Command>
            </DrawerContent>
          </Drawer>
        )}
      </>
    );
  }

  return (
    <Button asChild>
      <Link href="/login">Log In</Link>
    </Button>
  );
}
