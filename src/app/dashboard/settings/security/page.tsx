import { ChangeEmailForm } from "@/app/dashboard/settings/security/change-email-form";
import ChangePasswordForm from "@/app/dashboard/settings/security/change-password-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { getUserServerSession } from "@/lib/firebase/server-app";
import { User } from "firebase/auth";

export default async function SecuritySettings() {
  const { user } = await getUserServerSession();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security</h3>
        <p className="text-sm text-muted-foreground">
          Update your security settings
        </p>
      </div>
      <Separator />
      <div className="space-y-10">
        {!user.providerData.some((p) => p.providerId === "password") && (
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You are using a third-party provider to sign in. You can add a
              password to your account below to sign in with an email and
              password in addition to your third-party provider.
            </AlertDescription>
          </Alert>
        )}
        {user.providerData.length > 1 && (
          <Alert>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You have multiple ways of signing in. You can sign in with your
              email and password or with your third-party provider.
            </AlertDescription>
          </Alert>
        )}
        {/* Need to pass the user as JSON as the User type is not serializable */}
        <ChangeEmailForm initialUser={user.toJSON() as User} />
        <ChangePasswordForm initialUser={user.toJSON() as User} />
      </div>
    </div>
  );
}
