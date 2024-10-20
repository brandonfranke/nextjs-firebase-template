import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center flex-auto h-screen">
      <Loader2 className="h-16 w-16 animate-spin text-primary" />
      <h2 className="text-2xl font-semibold mt-4">Loading...</h2>
    </div>
  );
}
