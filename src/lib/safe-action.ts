import { getUserServerSession } from "@/lib/firebase/server-app";
import { getFirebaseErrorMessage } from "@/lib/utils";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
  handleServerError: getFirebaseErrorMessage,
}).use(async ({ next }) => {
  const { user, db } = await getUserServerSession();
  return next({ ctx: { user, db } });
});
