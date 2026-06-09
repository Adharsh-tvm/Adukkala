"use client";

import Link from "next/link";
import InputField from "@/components/ui/InputField";
import PasswordField from "@/components/ui/PasswordField";
import LoadingButton from "@/components/ui/LoadingButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "@/actions/auth/login.action";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await loginAction({
        email,
        password,
      });

      if (response.success) {
        router.replace("/user");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Sign In
        </h1>
        <p className="text-sm text-gray-500 font-medium">
          Find thousands of delicious recipes and save your favorites.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email Address */}
        <InputField
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <PasswordField
          type="password"
          label="Password"
          value={password}
          placeholder="••••••••"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between text-sm select-none">
          <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors font-medium">
            <input
              type="checkbox"
              className="h-4 w-4 rounded-sm border-gray-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer transition-colors"
            />
            <span>Remember me</span>
          </label>

          <Link
            href="/forgot-password"
            className="font-semibold text-primary hover:text-primary-hover transition-colors focus:outline-hidden focus:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-2">
          <LoadingButton
            type="submit"
            disabled={loading}
            loadingText="Signing In..."
          >
            Login
          </LoadingButton>

          <button
            type="button"
            className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 bg-white font-semibold hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 focus:outline-hidden focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
          >
            Continue as Guest
          </button>
        </div>
      </form>

      {/* Footer link */}
      <div className="text-center text-sm font-medium text-gray-500">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-bold text-primary hover:text-primary-hover transition-colors focus:outline-hidden focus:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
