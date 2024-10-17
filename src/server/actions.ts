"use server";

import { getUserServerSession } from "@/lib/firebase/server-app";
import { actionClient } from "@/lib/safe-action";
import { notificationsFormSchema, profileFormSchema } from "@/types/schemas";
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const revalidate = (path: string) => {
  revalidatePath(path);
};

export const updateProfileInfo = actionClient
  .schema(profileFormSchema)
  .action(async ({ parsedInput: { username } }) => {
    const { user, db } = await getUserServerSession();
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), { username });
        revalidatePath("dashboard/settings/profile");
      } catch (error: unknown) {
        return { error };
      }
    }
  });

export const updateNotifications = actionClient
  .schema(notificationsFormSchema)
  .action(async ({ parsedInput: data }) => {
    const { user, db } = await getUserServerSession();
    if (user) {
      try {
        await updateDoc(doc(db, "users", user.uid), { notifications: data });
        revalidatePath("dashboard/settings/notifications");
      } catch (error: unknown) {
        return { error };
      }
    }
  });
