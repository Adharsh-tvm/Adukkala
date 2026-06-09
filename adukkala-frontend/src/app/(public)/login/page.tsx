import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | Adukkala - Discover & Cook Recipes",
  description: "Login to your Adukkala account.",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Sign in to your account to continue discovering delicious recipes."
    >
      <LoginForm />
    </AuthLayout>
  );
}
