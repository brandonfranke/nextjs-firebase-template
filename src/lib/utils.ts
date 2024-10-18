import { FIREBASE_ERRORS } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { FirebaseError } from "firebase/app";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirebaseErrorMessage(error: unknown): string {
  return error instanceof FirebaseError
    ? FIREBASE_ERRORS[error.code]
    : FIREBASE_ERRORS["default"];
}
