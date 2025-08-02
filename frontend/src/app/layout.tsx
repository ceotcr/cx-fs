import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navigation from "@/components/Navigation";
import { ToastContainer } from "react-toastify";
export const metadata: Metadata = {
  title: "CyberXplore | File Scanner",
  description: "A scalable file scanning tool",
};
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <main className="flex min-h-screen flex-col bg-gray-50">
          <Providers>
            <Navigation />
            {children}
            <ToastContainer />
          </Providers>
        </main>
      </body>
    </html>
  );
}
