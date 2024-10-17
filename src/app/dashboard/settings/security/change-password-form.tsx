"use client";

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
import { useAuthUpdatePassword } from "@/hooks/firebase/auth";
import { toast } from "@/hooks/use-toast";
import { useFirebaseError } from "@/hooks/utils";
import { useUserClientSession } from "@/lib/firebase/client-app";
import { resetPasswordFormSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "firebase/auth";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ChangePasswordForm({
  initialUser,
}: {
  initialUser: User;
}) {
  const user = useUserClientSession(initialUser);
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const { mutateAsync: changePassword } = useAuthUpdatePassword();

  const getFirebaseError = useFirebaseError();

  // We do account auth actions like changing email, updating password etc, using client side SDK
  // instead of Server Actions so we can take advantage of firebase app check security features
  const handleSubmit = async (
    data: z.infer<typeof resetPasswordFormSchema>,
  ) => {
    try {
      await changePassword({
        user,
        newPassword: data.password,
      });
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });
    } catch (error: unknown) {
      console.log(error);
      toast({
        title: "Password not updated",
        description: "There was a problem changing your password",
        variant: "destructive",
      });
      form.setError("root", { message: getFirebaseError(error) });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="New Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm new Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && (
            <LoaderCircle className="animate-spin mr-2" />
          )}
          Update password
        </Button>
      </form>
    </Form>
  );
}
