import React from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | Adukkala - Discover & Cook Recipes",
  description:
    "Sign in to your Adukkala account to explore recipes, cook delicious meals, and manage your personal collections.",
};

export default function LoginPage() {
  return <LoginForm />;
}
