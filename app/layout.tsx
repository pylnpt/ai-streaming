import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "StreamWithAI",
  description: "A project for my thesis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster theme="light" position="bottom-right" />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
