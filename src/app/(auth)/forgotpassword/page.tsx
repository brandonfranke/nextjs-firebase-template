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
import { useForgotPasswordViewModel } from "@/app/(auth)/forgotpassword/useForgotPasswordViewModel";

export default function ForgotPassword() {
  const { form, handleSubmit } = useForgotPasswordViewModel();

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sign-in Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Forgot password
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email address to receive a link to reset your password
            </p>
          </div>

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
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
        </div>
      </div>

      {/* Photo Side */}
      <div
        className="hidden md:block w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1200')",
        }}
      >
        <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Security is important!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
