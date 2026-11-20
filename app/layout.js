import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "sonner";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });

export const metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  description: site.tagline,
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  themeColor: "#9a2e23",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-dvh">
        {children}
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
