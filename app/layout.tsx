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

const title = "Afolayan Iseoluwa (Tolu) | Backend Developer";
const description =
  "Tolu builds reliable backend systems (ledgers, job queues, automation) and the interfaces on top of them, with TypeScript, NestJS and PostgreSQL.";

export const metadata: Metadata = {
  // Link previews need absolute image URLs; the preview image itself is
  // app/opengraph-image.png (regenerate with scripts/make-og-image.sh).
  metadataBase: new URL("https://tolukusan-code-najin.vercel.app"),
  title,
  description,
  openGraph: { type: "website", title, description, siteName: "Afolayan Iseoluwa (Tolu)" },
  twitter: { card: "summary_large_image", title, description },
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
