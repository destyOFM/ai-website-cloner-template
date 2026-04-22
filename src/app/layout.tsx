import type { Metadata } from "next";
import { Courier_Prime, Fjalla_One } from "next/font/google";
import "./globals.css";

const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-courier",
  display: "swap",
});

const fjallaOne = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fjalla",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gallery Dept. Official Site | Disruptive Art & Classic Craftsmanship – GALLERY DEPT.",
  description: "Gallery Dept. — Official site for disruptive art and classic craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${courierPrime.variable} ${fjallaOne.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
