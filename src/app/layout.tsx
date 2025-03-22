import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import SolanaWalletProvider from "@/components/WalletProvider";
import { Toaster } from "react-hot-toast";

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Akshat Meena | Web3 Developer",
  description:
    "Portfolio of Akshat Meena - Web3 Developer and Blockchain Enthusiast",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.className} min-h-screen transition-colors duration-300 
          bg-gray-50 dark:bg-[#0D0D0F] 
          text-gray-900 dark:text-white`}
      >
        <ThemeProvider>
          <SolanaWalletProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#0D0D0F",
                  color: "#fff",
                  borderRadius: "8px",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  maxWidth: "350px",
                  wordBreak: "break-word",
                  fontFamily: "var(--font-sora)",
                },
                success: {
                  duration: 4000,
                  iconTheme: {
                    primary: "#8B5CF6",
                    secondary: "#0D0D0F",
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: "#EF4444",
                    secondary: "#0D0D0F",
                  },
                },
                loading: {
                  iconTheme: {
                    primary: "#8B5CF6",
                    secondary: "#0D0D0F",
                  },
                },
              }}
            />
          </SolanaWalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
