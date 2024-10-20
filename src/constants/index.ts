export const FIREBASE_ERRORS: { [key: string]: string } & { default: string } =
  {
    default: "There was an error with the request",
    //auth errors
    "auth/email-already-in-use": "Email is already in use",
    "auth/invalid-credential":
      "That email and password combo in incorrect. Please try again.",
    "auth/wrong-password":
      "That email and password combo in incorrect. Please try again.",
  };

export const THEMES = ["dark", "light", "red", "blue"];
