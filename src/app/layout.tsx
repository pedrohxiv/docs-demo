import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { cn } from "@/lib/utils";
import "@/styles/global.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Docs",
  icons: { icon: "/logo.svg" },
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html>
      <body className={cn(font.className, "antialiased")}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
};

export default RootLayout;
