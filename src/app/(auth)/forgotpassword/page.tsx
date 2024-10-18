import { Metadata } from "next";
import ForgotPasswordForm from "@/app/(auth)/forgotpassword/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPassword() {
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
          <ForgotPasswordForm />
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
