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
        <Toaster richColors />
      </body>
    </html>
  );
}
