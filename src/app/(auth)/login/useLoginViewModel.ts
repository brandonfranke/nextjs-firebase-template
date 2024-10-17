import {
  useAuthSignInWithEmailAndPassword,
  useAuthSignInWithPopup,
  useAuthSignInWithRedirect,
  useGetRedirectResult,
} from "@/hooks/firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFirebaseError } from "@/hooks/utils";
import { signInFormSchema } from "@/types/schemas";
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import { useCallback } from "react";
import { useCreateUserData } from "@/hooks/api/users";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase/client-app";

const googleProvider = new GoogleAuthProvider();

export const useLoginViewModel = () => {
  //used to navigate to a different page after successful registration
  const router = useRouter();

  //get a function that will map firebase error messages to a more user friendly message
  const getFirebaseErrorMessage = useFirebaseError();

  //hook to create a new user in the firestore database
  const { mutateAsync: createFirestoreUser } = useCreateUserData();

  //hook to sign in using a popup
  const { mutateAsync: SignInWithPopup } = useAuthSignInWithPopup(auth, {
    onSuccess: (UserCredential) => onProviderSignIn(UserCredential),
    onError: (error) => {
      form.setError("root", { message: getFirebaseErrorMessage(error) });
    },
  });

  //register the form and pass in the zod schema
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: { email: "", password: "" },
  });

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
            router.replace("/register/additional");
          } catch (error: unknown) {
            form.setError("root", { message: getFirebaseErrorMessage(error) });
          }
        } else {
          await fetch(`/__/auth/waitforsw/${userCredential.user.uid}`);
          router.replace("/");
        }
      }
    },
    [createFirestoreUser, router, form, getFirebaseErrorMessage],
  );

  //hook to sign in with a provider and redirect
  const { mutateAsync: SignInWithRedirect } = useAuthSignInWithRedirect(auth);

  //hook to get the redirect result from the firebase auth (if one exists)
  const { data: redirectResultGoogle } = useGetRedirectResult(auth);

  //if there was a successfull redirect result and the user is a new user navigate to the additional info page
  onProviderSignIn(redirectResultGoogle);

  //hook to create a new user with email and password with firebase auth
  const { mutateAsync: signInUserWithEmailAndPassword } =
    useAuthSignInWithEmailAndPassword(auth);

  //create a submit handler for the form using the aysnc function from the firebase auth hook
  const onSubmit: SubmitHandler<z.infer<typeof signInFormSchema>> = useCallback(
    async (data) => {
      try {
        const userCredential = await signInUserWithEmailAndPassword({
          email: data.email,
          password: data.password,
        });
        await fetch(`/__/auth/waitforsw/${userCredential.user.uid}`);
        router.replace("/");
      } catch (error: unknown) {
        form.setError("root", { message: getFirebaseErrorMessage(error) });
      }
    },
    [form, getFirebaseErrorMessage, router, signInUserWithEmailAndPassword],
  );

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
    googleSignIn: () =>
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_GOOGLE_USE_POPUP === "true"
        ? SignInWithPopup({ provider: googleProvider })
        : SignInWithRedirect({ provider: googleProvider }),
  };
};
