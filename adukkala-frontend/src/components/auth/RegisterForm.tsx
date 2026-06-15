"use client";

import { useState } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  BookOpen,
  ArrowRight,
  UtensilsCrossed,
} from "lucide-react";

import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import LoadingButton from "@/components/ui/LoadingButton";
import { registerAction } from "@/actions/auth/register.action";
import { googleLoginAction } from "@/actions/auth/google-login.action";
import { GoogleLogin } from "@react-oauth/google";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleGoogleLogin = async (credentialResponse: { credential?: string }) => {
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

  const onSubmit = async (data: RegisterValues) => {
    setIsSubmitting(true);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword: _, ...submitData } = data;
      const response = await registerAction(submitData);
      if (response.success) {
        toast.success("Account created! Let's start cooking!");
        router.push("/login");
      } else {
        toast.error(response.message || "Failed to create account");
      }
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (formErrors: FieldErrors<RegisterValues>) => {
    Object.values(formErrors).forEach((err) => {
      if (err?.message) {
        toast.error(err.message);
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 relative">
      {/* Decorative background glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000 pointer-events-none"></div>

      <div className="flex flex-col items-center justify-center space-y-1 mb-1 relative z-10">
        <div className="h-10 w-10 bg-linear-to-tr from-green-100 to-green-50 rounded-xl flex items-center justify-center text-green-600 mb-1 shadow-inner border border-green-200/50 transform -rotate-3 hover:rotate-0 transition-all duration-300">
          <BookOpen size={20} strokeWidth={1.5} />
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Join Adukkala
          </h3>
          <UtensilsCrossed className="text-orange-500 h-4 w-4" />
        </div>
        <p className="text-xs text-gray-500 font-medium text-center max-w-60">
          Create your recipe book and discover a world of flavors.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col gap-4 relative z-10"
      >
        <InputField
          label="Full Name"
          type="text"
          placeholder="e.g. Gordon Ramsay"
          icon={<User size={18} />}
          {...register("name")}
        />

        <InputField
          label="Email Address"
          type="email"
          placeholder="chef@adukkala.com"
          icon={<Mail size={18} />}
          {...register("email")}
        />

        <PasswordField
          label="Password"
          placeholder="Create a strong password"
          icon={<Lock size={18} />}
          {...register("password")}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Repeat your password"
          icon={<Lock size={18} />}
          {...register("confirmPassword")}
        />

        <LoadingButton
          type="submit"
          isLoading={isSubmitting}
          loadingText="Preparing your kitchen..."
          className="mt-1 group py-2"
        >
          <span className="flex items-center gap-">
            Create Account
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </span>
        </LoadingButton>
      </form>

      <div className="relative">
        <div className="flex items-center my-2">
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

      <div className="text-center text-sm font-medium text-gray-500 mt-1">
        Already have a kitchen?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary-hover transition-colors font-bold"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
}
