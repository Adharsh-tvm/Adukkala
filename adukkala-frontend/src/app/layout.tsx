import "./globals.css";

import { ReactNode } from "react";

import AuthProvider from "@/providers/AuthProvider";

import { isAuthenticated } from "@/lib/session";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const authenticated = await isAuthenticated();

  return (
    <html lang="en">
      <body>
        <AuthProvider isAuthenticated={authenticated}>{children}</AuthProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
