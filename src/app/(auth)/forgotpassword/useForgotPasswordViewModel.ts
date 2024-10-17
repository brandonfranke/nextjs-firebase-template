import { auth } from "@/lib/firebase/client-app";
import { useAuthSendPasswordResetEmail } from "@/hooks/firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFirebaseError } from "@/hooks/utils";
import { forgotPasswordFormSchema } from "@/types/schemas";
import { useCallback } from "react";

export const useForgotPasswordViewModel = () => {
  //get a function that will map firebase error messages to a more user friendly message
  const getFirebaseErrorMessage = useFirebaseError();

  //hook to send a password reset email
  const { mutateAsync: sendPasswordResetEmail } =
    useAuthSendPasswordResetEmail(auth);

  //register the forgot password form
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
  });

  //create a submit handler for the form using the aysnc function from the firebase auth hook
  const onSubmitForgotPassword: SubmitHandler<
    z.infer<typeof forgotPasswordFormSchema>
  > = useCallback(
    async (data) => {
      try {
        await sendPasswordResetEmail({
          email: data.email,
        });
      } catch (error: unknown) {
        form.setError("root", {
          message: getFirebaseErrorMessage(error),
        });
      }
    },
    [form, getFirebaseErrorMessage, sendPasswordResetEmail],
  );

  return {
    form,
    handleSubmit: form.handleSubmit(onSubmitForgotPassword),
  };
};
