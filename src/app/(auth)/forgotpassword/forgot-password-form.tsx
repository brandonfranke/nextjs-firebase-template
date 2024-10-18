"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, Terminal } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/lib/firebase/client-app";
import { useAuthSendPasswordResetEmail } from "@/hooks/firebase/auth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordFormSchema } from "@/types/schemas";
import { useCallback } from "react";
import { getFirebaseErrorMessage } from "@/lib/utils";

export default function ForgotPasswordForm() {
  //hook to send a password reset email
  const { mutateAsync: sendPasswordResetEmail } =
    useAuthSendPasswordResetEmail(auth);

  //register the forgot password form
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: "" },
  });

  //create a submit handler for the form using the aysnc function from the firebase auth hook
  const onSubmit = useCallback(
    async (data: z.infer<typeof forgotPasswordFormSchema>) => {
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
    [form, sendPasswordResetEmail],
  );
  return (
    <>
      {form.formState.errors.root && (
        <Alert variant={"destructive"}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Something</AlertTitle>
          <AlertDescription>
            {form.formState.errors.root.message}
          </AlertDescription>
        </Alert>
      )}
      {form.formState.isSubmitSuccessful && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Something</AlertTitle>
          <AlertDescription>
            A password reset email has been sent
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="relative">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email address"
                        type="email"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitted}
            >
              {form.formState.isSubmitting && (
                <LoaderCircle className="animate-spin mr-2" />
              )}
              Send Password Reset Email
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
