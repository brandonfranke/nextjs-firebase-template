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

export const THEME_COLORS = [
  { value: "default", text: "Default" },
  { value: "red", text: "Red" },
  { value: "blue", text: "Blue" },
];

export const THEME_MODES = [
  { value: "light", text: "Light" },
  { value: "dark", text: "Dark" },
];

export const PROFILE_SECTIONS = [
  { value: "account", text: "Account" },
  { value: "security", text: "Security" },
  { value: "notifications", text: "Notifications" },
] as const;
