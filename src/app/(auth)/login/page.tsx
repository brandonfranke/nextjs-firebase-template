import Link from "next/link";
import { Metadata } from "next";
import LoginForm from "@/app/(auth)/login/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function SignIn() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sign-in Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Or{" "}
              <Link
                href="/register"
                className="font-medium text-primary hover:text-primary/90"
              >
                register for an account
              </Link>
            </p>
          </div>
          <LoginForm />
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
            <h2 className="text-4xl font-bold text-white mb-4">Welcome Back</h2>
            <p className="text-xl text-white">
              We&apos;re so excited to see you again!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
