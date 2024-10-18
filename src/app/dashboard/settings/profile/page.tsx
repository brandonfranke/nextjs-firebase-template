import { Separator } from "@/components/ui/separator";
import AccountForm from "@/app/dashboard/settings/profile/profile-form";
import { getUserServerSession } from "@/lib/firebase/server-app";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Change your notification settings",
};

export default async function ProfileSettings() {
  const { user, userRecord } = await getUserServerSession(true);

  if (!user || !userRecord) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update your profile settings
        </p>
      </div>
      <Separator />
      <AccountForm defaultValues={{ username: userRecord.username ?? "" }} />
    </div>
  );
}
