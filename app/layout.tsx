import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

const hand = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-hand",
});

export const metadata: Metadata = {
  title: "Afolayan Iseoluwa (Tolu) | Backend Developer",
  description:
    "Tolu builds reliable backend systems (ledgers, job queues, automation) and the interfaces on top of them, with TypeScript, NestJS and PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable} ${hand.variable} font-display antialiased`}>
        {children}
      </body>
    </html>
  );
}
