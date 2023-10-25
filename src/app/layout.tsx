import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TABLE",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <main>{children}</main>
        </body>
      </html>
    </ReduxProvider>
  );
}
