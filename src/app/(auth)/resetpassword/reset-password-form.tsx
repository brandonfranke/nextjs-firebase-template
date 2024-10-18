"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, LoaderCircle, Terminal } from "lucide-react";
import { useState } from "react";
import { auth } from "@/lib/firebase/client-app";
import { resetPasswordFormSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthConfirmPasswordReset } from "@/hooks/firebase/auth";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { getFirebaseErrorMessage } from "@/lib/utils";

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  //used to get the reset password code from search params
  const params = useParams();

  //used to navigate to a different page after successful password change
  const router = useRouter();

  //hook to confirm password reset
  const { mutateAsync: confirmPasswordReset } =
    useAuthConfirmPasswordReset(auth);

  //register the change password form
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
    disabled: params.code === null,
  });

  //create a submit handler for the change password form using the aysnc function from the firebase auth hook
  const onSubmit: SubmitHandler<z.infer<typeof resetPasswordFormSchema>> =
    useCallback(
      async (data) => {
        try {
          await confirmPasswordReset({
            oobCode: params.code as string,
            newPassword: data.password,
          });
          router.replace("/");
        } catch (error: unknown) {
          form.setError("root", {
            message: getFirebaseErrorMessage(error),
          });
        }
      },
      [form, confirmPasswordReset, router, params.code],
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
      <Form {...form}>
        <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                className="absolute top-8 bottom-0 right-0 flex items-center pr-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOffIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
            <div className="relative">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm new password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Confirm new password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button
                type="button"
                className="absolute top-8 bottom-0 right-0 flex items-center pr-3"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOffIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <EyeIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || form.formState.disabled}
            >
              {form.formState.isSubmitting && (
                <LoaderCircle className="animate-spin mr-2" />
              )}
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
