"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useAuthSendEmailVerification,
  useAuthUpdateEmail,
} from "@/hooks/firebase/auth";
import { toast } from "@/hooks/use-toast";
import { useFirebaseError } from "@/hooks/utils";
import { useUserClientSession } from "@/lib/firebase/client-app";
import { changeEmailFormSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "firebase/auth";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function ChangeEmailForm({ initialUser }: { initialUser: User }) {
  const user = useUserClientSession(initialUser);
  const form = useForm<z.infer<typeof changeEmailFormSchema>>({
    resolver: zodResolver(changeEmailFormSchema),
    defaultValues: {
      email: user.email ?? "",
    },
  });

  const { mutateAsync: changeEmail } = useAuthUpdateEmail();
  const { mutate: sendEmailVerification } = useAuthSendEmailVerification();

  const getFirebaseError = useFirebaseError();

  const router = useRouter();

  // We do account auth actions like changing email, updating password etc, using client side SDK
  // instead of Server Actions so we can take advantage of firebase app check security features
  const handleSubmit = async (data: z.infer<typeof changeEmailFormSchema>) => {
    try {
      await changeEmail({
        user,
        newEmail: data.email,
      });
      sendEmailVerification({ user });
      toast({
        title: "Email updated",
        description: "Your Email has been updated successfully",
      });
      router.refresh();
    } catch (error: unknown) {
      toast({
        title: "Email not updated",
        description: "There was a problem changing your email",
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="New Email" {...field} />
              </FormControl>
              {!user.emailVerified && (
                <FormDescription className="flex items-center text-destructive">
                  <AlertCircle className="mr-2" />
                  Your email is not verified
                </FormDescription>
              )}

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
          Update email
        </Button>
      </form>
    </Form>
  );
}
