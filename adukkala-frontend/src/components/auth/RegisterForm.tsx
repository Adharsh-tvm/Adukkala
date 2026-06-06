"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { z } from "zod";

import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import LoadingButton from "@/components/ui/LoadingButton";

// Schema for client-side form validation
const registerFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms & Conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
  });

  // Calculate password strength score (0 to 4)
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "", colorClass: "bg-gray-200" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 0:
      case 1:
        return { score, label: "Weak", colorClass: "bg-red-500 w-1/4" };
      case 2:
      case 3:
        return { score, label: "Medium", colorClass: "bg-yellow-500 w-2/4" };
      case 4:
        return { score, label: "Strong", colorClass: "bg-green-500 w-full" };
      default:
        return { score: 0, label: "", colorClass: "bg-gray-200" };
    }
  };

  const strength = getPasswordStrength(passwordValue);



  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Join Adukkala to discover, cook, and save recipes.
        </p>
      </div>

      <form  className="flex flex-col gap-4">
        {/* Full Name */}
        <InputField
          label="Full Name"
          type="text"
          placeholder="John Doe"
          error={errors.name?.message}
          disabled={isLoading}
          {...register("name")}
        />

        {/* Username */}
        <InputField
          label="Username"
          type="text"
          placeholder="johndoe"
          error={errors.username?.message}
          disabled={isLoading}
          {...register("username")}
        />

        {/* Email Address */}
        <InputField
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          disabled={isLoading}
          {...register("email")}
        />

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <PasswordField
            label="Password"
            placeholder="••••••••"
            error={errors.password?.message}
            disabled={isLoading}
            {...register("password", {
              onChange: (e) => setPasswordValue(e.target.value),
            })}
          />
          {/* Password strength indicator */}
          {passwordValue && (
            <div className="flex flex-col gap-1 mt-0.5">
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500">
                <span>Password Strength:</span>
                <span
                  className={
                    strength.score <= 1
                      ? "text-red-500"
                      : strength.score <= 3
                      ? "text-yellow-600"
                      : "text-green-600"
                  }
                >
                  {strength.label}
                </span>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${strength.colorClass}`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <PasswordField
          label="Confirm Password"
          placeholder="••••••••"
          error={errors.confirmPassword?.message}
          disabled={isLoading}
          {...register("confirmPassword")}
        />

        {/* Terms and Conditions Checkbox */}
        <div className="flex flex-col gap-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium select-none">
            <input
              type="checkbox"
              disabled={isLoading}
              className="mt-0.5 h-4 w-4 rounded-sm border-gray-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer transition-colors"
              {...register("agreeTerms")}
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-primary hover:text-primary-hover font-semibold transition-colors">
                Terms & Conditions
              </a>
            </span>
          </label>
          {errors.agreeTerms && (
            <p role="alert" className="text-xs font-medium text-red-500 mt-0.5">
              {errors.agreeTerms.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <div className="mt-2">
          <LoadingButton isLoading={isLoading} loadingText="Creating Account...">
            Create Account
          </LoadingButton>
        </div>
      </form>

      {/* Footer link */}
      <div className="text-center text-sm font-medium text-gray-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-primary hover:text-primary-hover transition-colors focus:outline-hidden focus:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
