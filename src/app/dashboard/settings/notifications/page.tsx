import NotificationsForm from "@/app/dashboard/settings/notifications/notifications-form";
import { Separator } from "@/components/ui/separator";
import { getUserServerSession } from "@/lib/firebase/server-app";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications",
  description: "Change your notification settings",
};

export default async function NotificationSettings() {
  const { user, userRecord } = await getUserServerSession(true);

  if (!user || !userRecord) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Update your notification settings
        </p>
      </div>
      <Separator />
      <NotificationsForm defaultValues={userRecord.notifications} />
    </div>
  );
}
