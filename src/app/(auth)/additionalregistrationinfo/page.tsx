import AdditionalRegistrationInfoForm from "@/app/(auth)/additionalregistrationinfo/addition-info-form";
import { getUserServerSession } from "@/lib/firebase/server-app";
import { User } from "firebase/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Additional Info",
};

export default async function AdditionalRegistrationInfo() {
  const { user } = await getUserServerSession();

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sign-in Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Additional Information
            </h2>
          </div>
          <AdditionalRegistrationInfoForm
            initialUser={user?.toJSON() as User}
          />
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
            <h2 className="text-4xl font-bold text-white mb-4">Welcome</h2>
            <p className="text-xl text-white">
              We&apos;re so excited to have you join us!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
