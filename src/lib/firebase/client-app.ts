"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { getApps, initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";
import { getPerformance } from "firebase/performance";
import { getFunctions } from "firebase/functions";
import { firebaseConfig } from "@/lib/firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
// export const messaging = getMessaging(app);
// export const perf = getPerformance(app);
// export const analytics = getAnalytics(app);
export const functions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}

export function useUserClientSession(initialUser: User): User;
export function useUserClientSession(initialUser?: User | null): User | null;
export function useUserClientSession(initialUser?: User | undefined | null) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState<User | null | undefined>(initialUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return user;
}
