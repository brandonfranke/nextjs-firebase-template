"use server";

import { actionClient } from "@/lib/safe-action";
import { notificationsFormSchema, profileFormSchema } from "@/types/schemas";
import { doc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const updateProfileInfo = actionClient
  .schema(profileFormSchema)
  .action(async ({ parsedInput: { username }, ctx: { user, db } }) => {
    if (!user) throw new Error("You must be signed in to do this action.");
    try {
      await updateDoc(doc(db, "users", user.uid), { username });
      revalidatePath("dashboard/settings/profile");
    } catch (error: unknown) {
      return { error };
    }
  });

export const updateNotifications = actionClient
  .schema(notificationsFormSchema)
  .action(async ({ parsedInput: data, ctx: { user, db } }) => {
    if (!user) throw new Error("You must be signed in to do this action.");
    try {
      await updateDoc(doc(db, "users", user.uid), { notifications: data });
      revalidatePath("dashboard/settings/notifications");
    } catch (error: unknown) {
      return { error };
    }
  });
