"use client";

import { Button } from "@/components/ui/button";
import { useCreateUserData } from "@/hooks/api/users";
import {
  useAuthSignInWithPopup,
  useAuthSignInWithRedirect,
  useGetRedirectResult,
} from "@/hooks/firebase/auth";
import { auth } from "@/lib/firebase/client-app";
import { getFirebaseErrorMessage } from "@/lib/utils";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ErrorOption } from "react-hook-form";

const GOOGLE_PROVIDER = new GoogleAuthProvider();

export default function ProviderLogin({
  setFormError,
}: {
  setFormError: (
    name: "root" | "email" | "password" | `root.${string}`,
    error: ErrorOption,
    options?: {
      shouldFocus: boolean;
    },
  ) => void;
}) {
  //used to navigate to a different page after successful registration
  const router = useRouter();

  //hook to sign in using a popup
  const { mutateAsync: signInWithPopup } = useAuthSignInWithPopup(auth, {
    onSuccess: (UserCredential) => onProviderSignIn(UserCredential),
    onError: (error) => {
      setFormError("root", { message: getFirebaseErrorMessage(error) });
    },
  });

  //hook to create a new user in the firestore database
  const { mutateAsync: createFirestoreUser } = useCreateUserData();

  //used to navigate to a different page after successful provider registration
  const onProviderSignIn = useCallback(
    async (userCredential: UserCredential | null | undefined) => {
      if (userCredential) {
        const additionalUserInfo = getAdditionalUserInfo(userCredential);
        if (additionalUserInfo?.isNewUser) {
          try {
            await createFirestoreUser(userCredential.user.uid, {
              registrationComplete: false,
              notifications: {
                communication_emails: false,
                marketing_emails: false,
                security_emails: false,
                social_emails: false,
                type: "all",
              },
            });
            await fetch(`/__/auth/waitforsw/${userCredential.user.uid}`);
            router.replace("additionalregistrationinfo");
          } catch (error: unknown) {
            setFormError("root", { message: getFirebaseErrorMessage(error) });
          }
        } else {
          await fetch(`/__/auth/waitforsw/${userCredential.user.uid}`);
          router.replace("/");
        }
      }
    },
    [createFirestoreUser, router, setFormError],
  );

  //hook to sign in with a provider and redirect
  const { mutateAsync: signInWithRedirect } = useAuthSignInWithRedirect(auth);

  //hook to get the redirect result from the firebase auth (if one exists)
  const { data: redirectResultGoogle } = useGetRedirectResult(auth);

  //if there was a successfull redirect result and the user is a new user navigate to the additional info page
  onProviderSignIn(redirectResultGoogle);

  return (
    <div className="flex flex-col items-center">
      <Button
        variant="outline"
        className="w-full"
        onClick={() =>
          process.env.NEXT_PUBLIC_FIREBASE_AUTH_GOOGLE_USE_POPUP
            ? signInWithPopup({ provider: GOOGLE_PROVIDER })
            : signInWithRedirect({ provider: GOOGLE_PROVIDER })
        }
      >
        Login with Google
      </Button>
    </div>
  );
}
