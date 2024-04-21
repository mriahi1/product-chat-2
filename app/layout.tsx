import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { googleTagManagerConfig } from "@/config";

const inter = Inter({ subsets: ["latin"] });

let GTM_ID: string;
if (process.env.NODE_ENV === "production") {
  GTM_ID = googleTagManagerConfig.gtmId;
} else if (process.env.NODE_ENV === "development") {
  GTM_ID = googleTagManagerConfig.stagingGtmId;
} else {
  GTM_ID = googleTagManagerConfig.gtmId;
}

export const metadata: Metadata = {
  title: "Fetchizy - Smart Shopping Companion",
  description: "Find better products faster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <div id="modal-root"></div>
      </body>
      <GoogleTagManager gtmId={GTM_ID} />
    </html>
  );
}
