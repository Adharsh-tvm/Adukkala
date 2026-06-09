import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Register | Adukkala - Discover & Cook Recipes",
  description:
    "Create your Adukkala account today. Discover new recipes, save your favorites, and manage your kitchen collections.",
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join our community of food lovers and start saving your favorite recipes today."
    >
      <RegisterForm />
    </AuthLayout>
  );
}
