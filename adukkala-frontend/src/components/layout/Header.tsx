"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, X, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/auth/logout.action";
import { getUserAction } from "@/actions/auth/get-user.action";
import { toast } from "sonner";

export default function Header() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    getUserAction().then((user) => {
      if (user?.name) {
        setUserName(user.name);
      }
    });
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await logoutAction();
      if (response.success) {
        toast.success("Logged out successfully");
        router.push("/login");
        router.refresh();
      } else {
        toast.error("Failed to log out");
        setShowLogoutModal(false);
      }
    } catch {
      toast.error("An unexpected error occurred during logout");
      setShowLogoutModal(false);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold animate-pulse">
              {userName ? userName.charAt(0).toUpperCase() : "A"}
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Adukkala
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/search"
              className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-orange-50"
              title="Search Recipes"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link 
              href="/"
              className="p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-orange-50"
              title="Search Recipes"
            >
              {/* <Home className="h-5 w-5" /> */}
              HOME
            </Link>
            <Link 
              href="/favorites"
              className="p-2 text-gray-500 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
              title="My Favorites"
            >
              {/* <Heart className="h-5 w-5" /> */}
            FAVORITES
            </Link>
            {userName && (
              <span className="text-sm font-medium text-gray-700 hidden sm:block mr-2">
                Hello, {userName.split(' ')[0]}
              </span>
            )}
            <button
              onClick={() => setShowLogoutModal(true)}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-150 cursor-pointer disabled:opacity-50"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative">
            <button 
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center mt-2">
              <div className="h-16 w-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-5">
                <LogOut className="h-8 w-8 ml-1" />
              </div>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Ready to leave?</h3>
              <p className="text-gray-500 text-sm mb-8 font-medium">
                Are you sure you want to log out of your Adukkala kitchen? You will need to sign in again to access your recipes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  disabled={isLoggingOut}
                  className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-100 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex-1 py-3 px-4 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 flex justify-center items-center gap-2 transition-colors"
                >
                  {isLoggingOut ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Log Out"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
