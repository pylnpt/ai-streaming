import type { Metadata } from "next";
import "./globals.css";
import { dark } from '@clerk/themes';
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

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
    <ClerkProvider appearance={{baseTheme:dark}}>
      <html lang="en">
        <body>
          
          <ThemeProvider
              attribute="class"
              forcedTheme="dark"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster theme="light"
                position="bottom-right"/>
              {children}
            </ThemeProvider>
          </body>
      </html>     
    </ClerkProvider>
  );
}
