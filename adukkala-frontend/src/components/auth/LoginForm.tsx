"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Mail, Lock, ChefHat, ArrowRight, Sparkles } from "lucide-react";

import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import LoadingButton from "@/components/ui/LoadingButton";
import { loginAction } from "@/actions/auth/login.action";
import { googleLoginAction } from "@/actions/auth/google-login.action";
import { GoogleLogin } from "@react-oauth/google";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google login failed");
        return;
      }

      const response = await googleLoginAction(credentialResponse.credential);

      if (response.success) {
        router.push("/user");
        router.refresh();
        toast.success("Welcome to Adukkala");
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Google login failed");
    }
  };

  const onSubmit = async (data: LoginValues) => {
    setIsSubmitting(true);

    try {
      const response = await loginAction(data);
      if (response.success) {
        toast.success("Welcome back Chef!");
        router.push("/user");
        router.refresh();
      } else {
        toast.error(response.message || "Invalid email or password");
      }
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (formErrors: any) => {
    Object.values(formErrors).forEach((err: any) => {
      if (err?.message) {
        toast.error(err.message);
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-4 relative">
      {/* Decorative background glow */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="flex flex-col items-center justify-center space-y-1 mb-1 relative z-10">
        <div className="h-10 w-10 bg-linear-to-tr from-orange-100 to-orange-50 rounded-xl flex items-center justify-center text-primary mb-1 shadow-inner border border-orange-200/50 transform rotate-3 hover:rotate-0 transition-all duration-300">
          <ChefHat size={20} strokeWidth={1.5} />
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Ready to Cook?
          </h3>
          <Sparkles className="text-yellow-500 h-4 w-4 animate-pulse" />
        </div>
        <p className="text-xs text-gray-500 font-medium text-center max-w-62.5">
          Login to access your favorite recipes and daily meal plans.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-3 relative z-10"
      >
        <InputField
          label="Email Address"
          type="email"
          placeholder="chef@adukkala.com"
          icon={<Mail size={18} />}
          {...register("email")}
        />

        <div className="flex flex-col gap-2">
          <PasswordField
            label="Password"
            placeholder="Enter your secret recipe"
            icon={<Lock size={18} />}
            {...register("password")}
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Warming up the oven..."
          className="mt-2 group py-2"
        >
          <span className="flex items-center gap-2">
            Sign in
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </LoadingButton>
      </form>
      <div className="relative">
        <div className="flex items-center my-4">
          <div className="grow border-t border-gray-200"></div>

          <span className="mx-4 text-sm text-gray-500">OR</span>

          <div className="grow border-t border-gray-200"></div>
        </div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error("Google login failed")}
          />
        </div>
      </div>

      <div className="text-center text-sm font-medium text-gray-500 mt-2">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="text-primary hover:text-primary-hover transition-colors font-bold"
        >
          Create one now
        </Link>
      </div>
    </div>
  );
}
