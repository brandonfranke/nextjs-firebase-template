"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircle, Terminal } from "lucide-react";
import { useUserClientSession } from "@/lib/firebase/client-app";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { additionalRegistrationInfoSchema } from "@/types/schemas";
import { useUpdateUserData } from "@/hooks/api/users";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { getFirebaseErrorMessage } from "@/lib/utils";
import { User } from "firebase/auth";

export default function AdditionalRegistrationInfoForm({
  initialUser,
}: {
  initialUser: User;
}) {
  //used to navigate to a different page after successful registration
  const router = useRouter();

  const user = useUserClientSession(initialUser);

  //hook to create a new user in the firestore database
  const { mutateAsync: updateFirestoreUser } = useUpdateUserData();

  //register the form and pass in the zod schema
  const form = useForm<z.infer<typeof additionalRegistrationInfoSchema>>({
    resolver: zodResolver(additionalRegistrationInfoSchema),
    defaultValues: { username: "" },
  });

  //create a submit handler for the form using the aysnc function from the firebase auth hook
  const onSubmit = useCallback(
    async (data: z.infer<typeof additionalRegistrationInfoSchema>) => {
      if (!user) return;
      try {
        await updateFirestoreUser(user.uid, {
          username: data.username,
          registrationComplete: true,
        });
        router.replace("/");
      } catch (error: unknown) {
        form.setError("root", { message: getFirebaseErrorMessage(error) });
      }
    },
    [form, router, updateFirestoreUser, user],
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
            <div>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" type="text" {...field} />
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
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <LoaderCircle className="animate-spin mr-2" />
              )}
              Complete Registration
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
