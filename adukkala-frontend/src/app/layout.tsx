import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";

import { ReactNode } from "react";

import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          {children}
          <Toaster richColors />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
