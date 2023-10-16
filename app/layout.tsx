import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AnyApe",
  description: "Ape from any chain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "flex flex-col items-center black")}>
        <main
          vaul-drawer-wrapper=""
          className={cn(
            "flex w-full",
            "bg-gradient-radial from-blue/10 via-red/10 to-green/10",
            "aria-hidden:bg-blue"
          )}
        >
          <div className="flex flex-col justify-between min-h-screen relative w-full max-w-7xl px-4 mx-auto">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
