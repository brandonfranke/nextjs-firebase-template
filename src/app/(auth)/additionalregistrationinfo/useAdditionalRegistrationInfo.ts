import { auth } from "@/lib/firebase/client-app";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFirebaseError } from "@/hooks/utils";
import { additionalRegistrationInfoSchema } from "@/types/schemas";
import { useAuthUser } from "@/hooks/firebase/auth";
import { useUpdateUserData } from "@/hooks/api/users";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export const useAdditionalRegistrationInfoViewModel = () => {
  //since third party sign ons use a different flow, we need to explicitly redirect and get additional information

  //used to navigate to a different page after successful registration
  const router = useRouter();

  const user = useAuthUser(auth);

  //hook to create a new user in the firestore database
  const { mutateAsync: updateFirestoreUser } = useUpdateUserData();

  //get a function that will map firebase error messages to a more user friendly message
  const getFirebaseErrorMessage = useFirebaseError();

  //register the form and pass in the zod schema
  const form = useForm<z.infer<typeof additionalRegistrationInfoSchema>>({
    resolver: zodResolver(additionalRegistrationInfoSchema),
    defaultValues: { username: "" },
  });

  //create a submit handler for the form using the aysnc function from the firebase auth hook
  const onSubmit: SubmitHandler<
    z.infer<typeof additionalRegistrationInfoSchema>
  > = useCallback(
    async (data) => {
      if (!user.data) return;
      try {
        await updateFirestoreUser(user.data.uid, {
          username: data.username,
          registrationComplete: true,
        });
        router.replace("/");
      } catch (error: unknown) {
        form.setError("root", { message: getFirebaseErrorMessage(error) });
      }
    },
    [form, getFirebaseErrorMessage, router, updateFirestoreUser, user.data],
  );

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmit),
  };
};
