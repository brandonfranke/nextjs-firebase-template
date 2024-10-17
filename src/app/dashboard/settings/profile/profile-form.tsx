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
import { updateProfileInfo } from "@/server/actions";
import { profileFormSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/hooks/use-toast";

export default function AccountForm({
  defaultValues,
}: {
  defaultValues: z.infer<typeof profileFormSchema>;
}) {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
  });

  const { execute } = useAction(updateProfileInfo, {
    onSuccess: ({ input }) => {
      toast({
        title: "Account updated",
        description: "Your account has been updated successfully",
      });
      form.reset(input, { keepValues: true });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error updating your account",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(execute)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
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
          Update account
        </Button>
      </form>
    </Form>
  );
}
