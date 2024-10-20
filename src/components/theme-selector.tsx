"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { THEMES } from "@/constants/index";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useResponsive } from "ahooks";
import { Circle, Paintbrush } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export default function ThemeSelector() {
  const { setTheme } = useTheme();
  const isDesktop = useResponsive()?.lg ?? true;

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button size={"icon"} className="rounded-full">
            <Paintbrush />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="space-y-2">
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-sm">Customize Theme</h1>
            </div>
            <div className="flex gap-3"></div>
            <div className="flex flex-col gap-3">
              {THEMES.map((t) => (
                <Button
                  key={t}
                  variant={"outline"}
                  size={"sm"}
                  className="capitalize justify-between"
                  onClick={() => setTheme(t)}
                >
                  {t}
                  <Circle
                    fill={cn({
                      "hsl(240 5.9% 10%)": t === "light",
                      "hsl(0 0% 98%)": t === "dark",
                      "hsl(0 72.2% 50.6%)": t === "red",
                      "hsl(217.2 91.2% 59.8%)": t === "blue",
                    })}
                  />
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={"icon"} className="rounded-full">
          <Paintbrush />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Theme</DrawerTitle>
          <DrawerDescription>Change your theme settings</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-2 p-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-sm">Customize Theme</h1>
          </div>
          <div className="flex gap-3"></div>
          <div className="flex flex-col gap-3">
            {THEMES.map((t) => (
              <Button
                key={t}
                variant={"outline"}
                size={"sm"}
                className="capitalize justify-between"
                onClick={() => setTheme(t)}
              >
                {t}
                <Circle
                  fill={cn({
                    "hsl(240 5.9% 10%)": t === "light",
                    "hsl(0 0% 98%)": t === "dark",
                    "hsl(0 72.2% 50.6%)": t === "red",
                    "hsl(217.2 91.2% 59.8%)": t === "blue",
                  })}
                />
              </Button>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
