import "server-only";

import { headers } from "next/headers";
import { initializeServerApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { firebaseConfig } from "@/lib/firebase/config";
import {
  connectFirestoreEmulator,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { UserData } from "@/types/types";

/**
 Retuns the Firebase server app and the user session. 
 
 Ther server app can be used to retreive other Firebase services like Firestore, Realtime Database, etc on the server.
 */
export async function getUserServerSession(retreiveUserRecord?: boolean) {
  const idToken = headers().get("Authorization")?.split("Bearer ")[1];

  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken ? { authIdToken: idToken } : {},
  );

  const auth = getAuth(firebaseServerApp);
  const db = getFirestore(firebaseServerApp);

  if (process.env.NODE_ENV === "development" && !auth.emulatorConfig) {
    connectAuthEmulator(auth, "http://127.0.0.1:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  }

  await auth.authStateReady();

  const userRecord =
    retreiveUserRecord && auth.currentUser
      ? ((
          await getDoc(doc(db, `users/${auth.currentUser.uid}`))
        ).data() as UserData)
      : undefined;

  return { firebaseServerApp, db, user: auth.currentUser, userRecord };
}
