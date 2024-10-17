import { getFirebaseErrorMessage } from "@/lib/utils";
import { ThemeSettings } from "@/types/types";
import { useCookieState } from "ahooks";

export const useFirebaseError = () => {
  return getFirebaseErrorMessage;
};

export const useTheme = () => {
  const [themeMode, setThemeMode] = useCookieState("theme-mode");
  const [themeColor, setThemeColor] = useCookieState("theme-color");

  return {
    theme: {
      mode: themeMode,
      color: themeColor,
    } as ThemeSettings,
    setTheme: (value: ThemeSettings) => {
      document.documentElement.setAttribute(
        "data-theme-mode",
        value.mode ?? (themeMode as string),
      );
      document.documentElement.setAttribute(
        "data-theme-color",
        (value.color as string) ?? (themeColor as string),
      );
      setThemeMode(value.mode ?? themeMode);
      setThemeColor(value.color ?? themeColor);
    },
  };
};
