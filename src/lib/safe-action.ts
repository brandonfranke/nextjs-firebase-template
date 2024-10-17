import { FirebaseError } from "firebase/app";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof FirebaseError) {
      return error.code;
    } else {
      return "An unknown error occurred.";
    }
  },
});
