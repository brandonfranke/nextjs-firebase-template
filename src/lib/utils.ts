import { FIREBASE_ERRORS } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirebaseErrorMessage(error: unknown): string {
  return typeof error === "string"
    ? FIREBASE_ERRORS[error]
    : FIREBASE_ERRORS["default"];
}
