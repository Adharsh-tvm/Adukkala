import React from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Recipe Details | Adukkala",
  description: "View detailed information for this recipe on Adukkala.",
};

type Params = Promise<{ id: string }>;

export default async function RecipeDetailsPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="h-16 w-16 rounded-2xl bg-orange-500/10 text-primary flex items-center justify-center mb-6">
        <BookOpen className="h-8 w-8" />
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
        Recipe Details
      </h1>

      <p className="text-gray-500 font-medium max-w-sm mb-6">
        Viewing recipe details for recipe ID:{" "}
        <strong className="text-gray-700">{id}</strong>. This feature is coming
        soon!
      </p>

      <Link
        href="/dashboard"
        className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl transition-all duration-150 shadow-md shadow-orange-500/10 cursor-pointer active:scale-95"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
