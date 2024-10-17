"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { THEME_COLORS, THEME_MODES } from "@/constants/index";
import { useTheme } from "@/hooks/utils";
import { cn } from "@/lib/utils";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          title="Change theme"
          className="rounded-full h-10 w-10 border-2 border-border"
        />
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-sm">Customize Theme</h1>
            <h1 className="font-semibold text-sm">Color</h1>
          </div>
          <div className="flex gap-3">
            {THEME_COLORS.map((color) => (
              <Button
                key={color.value}
                variant={"outline"}
                size={"sm"}
                className={cn({
                  "bg-accent":
                    color.value == theme?.color ||
                    (theme?.color === undefined && color.value === "default"),
                })}
                onClick={() => setTheme({ color: color.value })}
              >
                {color.text}
              </Button>
            ))}
          </div>
          <h1 className="font-semibold text-sm">Mode</h1>
          <div className="flex gap-3">
            {THEME_MODES.map((mode) => (
              <Button
                key={mode.value}
                variant={"outline"}
                size={"sm"}
                className={cn({
                  "bg-accent":
                    mode.value == theme?.mode ||
                    (theme?.color === undefined && mode.value === "light"),
                })}
                onClick={() => setTheme({ mode: mode.value })}
              >
                {mode.text}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
