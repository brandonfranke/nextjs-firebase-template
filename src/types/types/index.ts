export type ThemeSettings = {
  mode?: string;
  color?: string;
};

export type UserData = {
  username: string;
  registrationComplete: boolean;
  notifications: {
    type: "all" | "mentions" | "none";
    communication_emails: boolean;
    marketing_emails: boolean;
    social_emails: boolean;
    security_emails: boolean;
  };
};
