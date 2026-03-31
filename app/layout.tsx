import type { Metadata, Viewport } from "next";
import "@rainbow-me/rainbowkit/styles.css";
import "./globals.css";

import { BottomTab } from "@/components/bottom-tab";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://splitbase.example.com"),
  title: "SplitBase",
  description: "Payment Split Mini App for Base mainnet.",
  other: {
    "base:app_id": "69c359875262875b1be38c6a",
    "talentapp:project_verification":
      "9bb99fcedc68f8b36392557d45ab9ba0dc080ca7b4001cbd086d0dee9f9e0b462fbb6e5638497c18122f595df55afea34a4986d479ce4f7a655d3ff57034d26d",
  },
};

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-text-primary">
        <Providers>
          <div className="mx-auto flex min-h-screen w-full max-w-md flex-col">
            <main className="flex-1 px-4 pb-28 pt-4">{children}</main>
            <BottomTab />
          </div>
        </Providers>
      </body>
    </html>
  );
}
