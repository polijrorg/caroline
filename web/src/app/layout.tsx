import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/common/ToastProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "RiMA",
  description: "Plataforma para saúde mental",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${poppins.variable} antialiased`}
      >
        {children}

        <ToastProvider />
      </body>
    </html>
  );
}
